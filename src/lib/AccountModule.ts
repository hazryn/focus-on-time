import electronOauth2 from '@/lib/EletronOauth2Atlassian';
import { ElectronOauth2Interface } from '@/lib/interfaces/ElectronOauth2Interface';
import axios from 'axios';
import { CloudResource, UserResponse } from '../store/account/interfaces';

export class AccountModule {
  protected readonly atlassianOAuth2: ElectronOauth2Interface;

  protected refreshTokenInterval: any;

  protected refreshTokenIntervalTime = 1000 * 60 * 15; // 15 minutes

  constructor(
    private readonly store: any,
    private readonly electronStore: any,
    private readonly router: any,
  ) {
    this.restoreSettings();

    this.atlassianOAuth2 = electronOauth2(store.state.Account.config, {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
      },
    });

    if (this.store.state.Account.refreshToken) {
      this.refreshToken()
        .then(this.fetchUserData.bind(this))
        .then(this.storeSettings.bind(this))
        .then(this.startRefreshTokenInterval.bind(this));
    }
  }

  protected startRefreshTokenInterval() {
    if (!this.refreshTokenInterval) {
      this.refreshTokenInterval = setInterval(this.refreshToken.bind(this), this.refreshTokenIntervalTime);
    }
  }

  public storeSettings() {
    const store = this.store.state.Account;
    this.electronStore.set('settings', JSON.stringify(store.settings));
    if (store.settings.keepSignedIn) {
      this.electronStore.set('account-store', JSON.stringify(store));
    } else {
      this.electronStore.delete('account-store');
    }
  }

  protected restoreSettings() {
    try {
      const store = this.store.state.Account;
      const newSettings = Object.assign(store.settings, JSON.parse(this.electronStore.get('settings')));
      this.store.state.Account.settings = newSettings;
      if (this.store.state.Account.settings.keepSignedIn) {
        const newStore = Object.assign(store, JSON.parse(this.electronStore.get('account-store')));
        this.store.state.Account = newStore;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async login() {
    const options = {
      scope: 'offline_access read:jira-user read:jira-work write:jira-work',
      prompt: 'consent',
      audience: 'api.atlassian.com',
    };

    const token = await this.atlassianOAuth2.getAccessToken(options);
    await this.store.commit('Account/SET_TOKEN', token);

    await this.fetchUserData();
    this.storeSettings();
    this.startRefreshTokenInterval();
  }

  async logout() {
    if (this.refreshTokenInterval) {
      clearInterval(this.refreshTokenInterval);
      this.refreshTokenInterval = null;
    }
    await this.store.commit('Account/SET_TOKEN', null);
    await this.store.commit('Account/SET_CURRENT_RESOURCE', null);
    await this.store.commit('Account/SET_RESOURCES', []);
    await this.store.commit('Account/SET_USER', null);
    this.storeSettings();
  }

  async fetchUserData() {
    const accessibleResources = await this.fetchAccessibleResources();

    if (accessibleResources.length > 1) {
      await this.router.push({ name: 'Resources' });
    } else {
      await this.store.commit('Account/SET_CURRENT_RESOURCE', accessibleResources[0]);
      await this.fetchUser();
    }
  }

  async refreshToken(): Promise<string> {
    const token = await this.atlassianOAuth2.refreshToken(this.store.state.Account.refreshToken);
    await this.store.commit('Account/SET_TOKEN', token);
    this.storeSettings();
    return token as string;
  }

  protected async fetchAccessibleResources(): Promise<CloudResource[]> {
    const { data } = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: { Authorization: `Bearer ${this.store.state.Account.token.access_token}` },
    });

    await this.store.commit('Account/SET_RESOURCES', data);
    return data;
  }

  protected async fetchUser(): Promise<UserResponse> {
    const { data } = await axios.get(`https://api.atlassian.com/ex/jira/${this.store.state.Account.resource.id}/rest/api/2/myself`, {
      headers: { Authorization: `Bearer ${this.store.state.Account.token.access_token}` },
    });

    await this.store.commit('Account/SET_USER', data);
    return data;
  }
}
