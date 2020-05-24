/* eslint-disable */
import queryString from 'querystring';
import axios from 'axios';
import nodeUrl from 'url';
import electron from 'electron';

const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export default (config: any, windowParams: any) => {
  function getAuthorizationCode(opts: any) {
    const state = generateRandomString(16);

    opts = opts || {};

    if (!config.redirectUri) {
      config.redirectUri = 'urn:ietf:wg:oauth:2.0:oob';
    }

    let urlParams: any = {
      response_type: 'code',
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      state: state
    };

    if (opts.scope) {
      urlParams.scope = opts.scope;
    }

    if (opts.accessType) {
      urlParams.access_type = opts.accessType;
    }

    if (opts.prompt) {
      urlParams.prompt = opts.prompt;
    }

    if (opts.audience) {
      urlParams.audience = opts.audience;
    }

    // @ts-ignore
    const url = config.authorizationUrl + '?' + queryString.stringify(urlParams);

    return new Promise(function (resolve, reject) {
      const authWindow = new BrowserWindow(windowParams || {'use-content-size': true});

      authWindow.loadURL(url);
      authWindow.show();

      authWindow.on('closed', () => {
        reject(new Error('window was closed by user'));
      });

      const filter = {
        urls: ['http://localhost/?code=*']
      };

      authWindow.webContents.session.webRequest.onBeforeRequest(filter, (details: any, callback: Function) => {
        const url = details.url;
        const url_parts = nodeUrl.parse(url, true);
        const query = url_parts.query;
        const code = query.code;

        resolve(code);

        authWindow.removeAllListeners('closed');
        authWindow.close();
        callback({  cancel: true });
      })
    });
  }

  function tokenRequest(data: any) {
    const token = Buffer.from(config.clientId + ':' + config.clientSecret).toString('base64');

    return axios.post(config.tokenUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`
      },
    }).then(({ data }) => data);
  }

  function getAccessToken(opts: any) {
    return getAuthorizationCode(opts)
      .then(authorizationCode => tokenRequest(Object.assign({
        code: authorizationCode,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri
      }, opts.additionalTokenRequestData)));
  }

  function refreshToken(refreshToken: string) {
    return tokenRequest({
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
      redirect_uri: config.redirectUri
    });
  }

  return {
    getAuthorizationCode: getAuthorizationCode,
    getAccessToken: getAccessToken,
    refreshToken: refreshToken
  };
};
