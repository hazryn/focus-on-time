import { AccountState } from './interfaces';

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
  settings: {
    workLogDescriptionRequired: true,
    keepSignedIn: true,
  },
} as AccountState;
