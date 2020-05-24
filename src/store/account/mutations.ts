import Vue from 'vue';
import { AccountState, CloudResource, Token, UserResponse } from './interfaces';

const SET_TOKEN = (state: AccountState, token?: Token) => {
  console.log('SET_TOKEN', token);
  if (!token) {
    state.token = null;
    state.refreshToken = null;
  } else {
    state.token = token;
    if (token.refresh_token) {
      state.refreshToken = token.refresh_token;
    }
  }
};

const SET_USER = (state: AccountState, user?: UserResponse) => {
  console.log('SET_USER', user);

  if (!user) {
    state.id = null;
    state.username = null;
    state.avatar = null;
  } else {
    state.id = user.accountId;
    state.username = user.displayName;
    state.avatar = user.avatarUrls['32x32'];
  }
};

const SET_CURRENT_RESOURCE = (state: AccountState, resource: CloudResource) => {
  console.log('SET_CURRENT_RESOURCE', resource);
  state.resource = resource;
};

const SET_RESOURCES = (state: AccountState, resources: CloudResource[]) => {
  console.log('SET_RESOURCES', resources);
  state.resources = resources;
};

const UPDATE_SETTING = (state: AccountState, { name, value }: { name: string; value: boolean }) => {
  Vue.set(state.settings, name, value);
};

export default {
  SET_TOKEN,
  SET_USER,
  SET_RESOURCES,
  SET_CURRENT_RESOURCE,
  UPDATE_SETTING,
};
