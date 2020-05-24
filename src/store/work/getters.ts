import { AccountState } from '@/store/account/state';
import path from 'path';

declare const __static: string;

export default {
  GET_AVATAR(state: AccountState) {
    return state.avatar || path.join(__static, 'atlassian.png');
  },
  GET_DISPLAY_NAME(state: AccountState) {
    return state.username || '';
  },
  IS_LOGGED(state: AccountState) {
    return state.id !== null;
  },
  GET_TOKEN(state: AccountState) {
    return state.token;
  },
  GET_REFRESH_TOKEN(state: AccountState) {
    return state.refreshToken;
  },
  GET_RESOURCE(state: AccountState) {
    return state.resource;
  },
  GET_RESOURCES(state: AccountState) {
    return state.resources;
  },
};
