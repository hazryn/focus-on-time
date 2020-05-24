export interface AccountState {
  id: string | null;
  username: string | null;
  avatar: string | null;
  token: Token | null;
  refreshToken: string | null;
  resource: CloudResource | null;
  resources: CloudResource[];
  config: {
    clientId: string;
    clientSecret: string;
    authorizationUrl: string;
    tokenUrl: string;
    useBasicAuthorizationHeader: boolean;
    redirectUri: string;
    scope: string;
  };
}

export interface CloudResource {
  id: string;
  avatarUrl: string;
  name: string;
  scopes: string[];
  url: string;
}

export interface Token {
  access_token: string;
  refresh_token: string | null;
  scope: string;
  expires_in: number;
  token_type: 'Bearer';
}

export interface UserResponse {
  accountId: string;
  active: boolean;
  avatarUrls: {
    '16x16': string;
    '24x24': string;
    '32x32': string;
    '48x48': string;
  };
  displayName: string;
  emailAddress: string;
  expand: string;
  locale: string;
  self: string;
  timeZone: string;
}

export default {
  id: null,
  username: null,
  avatar: null,
  token: null,
  refreshToken: null,
  resource: null,
  resources: [],
  config: {
    clientId: '1uzhZEZYF5HD5JzEk28rpBMML47MWX4i',
    clientSecret: 'U5Qeh2SwKGJIfzgfqCepscP_EUaw3I97Bp4hL95v8f_k0yLfA7t86tCMBdBygNWR',
    authorizationUrl: 'https://auth.atlassian.com/authorize',
    tokenUrl: 'https://auth.atlassian.com/oauth/token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost',
    scope: 'read:jira-user read:jira-work write:jira-work',
  },
} as AccountState;
