export interface ElectronOauth2Interface {
  getAuthorizationCode(opts: any): Promise<unknown>;

  getAccessToken(opts: any): Promise<unknown>;

  refreshToken(refreshToken: string): Promise<unknown>;
}
