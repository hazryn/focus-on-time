import path from 'path';

export interface Settings {
  workLogDescriptionRequired: boolean;
}

export interface AccountState {
  id: string | null;
  username: string | null;
  avatar: string | null;
  token: Token | null;
  refreshToken: string | null;
  resource: CloudResource | null;
  resources: CloudResource[];
  settings: Settings;
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

declare const __static: string;

export const userIconPlaceholder = path.join(__static, 'user.png');
export const attlassianIcon = path.join(__static, 'atlassian.png');
