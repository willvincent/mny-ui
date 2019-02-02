import { Exception, exceptions } from '@/exceptions';
import { forgotPassword, login, logout } from '@/api/auth';
import * as mutation from './mutation-types';

const get_user = () => {};
const impersonate_user = () => {};

const auth_store = {
  namespaced: true,
  state: {
    auth_busy: false,
    impersonating: false,
    logged_in: false,
    password_reset_request: false,
    refresh_token: null,
    token: null,
    user: {},
  },

  actions: {
    async login({ commit }, { email, password }) {
      commit(mutation.AUTH_BUSY);

      try {
        commit(mutation.LOGIN, await login({ email, password }));
      } catch (e) {
        commit(mutation.AUTH_BUSY, false);
        let exception;

        switch (e.message) {
          case 'Invalid password':
          case 'Unable to locate user':
          case 'required validation failed on uid':
            exception = new Exception(exceptions.auth.InvalidLogin);
            break;
          default:
            exception = new Exception(exceptions.UnknownException, e);
            break;
        }

        throw exception;
      }
    },

    get_details({ commit }, { resolve, reject }) {
      const promise = get_user()
        .then(details => {
          if (details) commit('login', details);
          resolve();
        })
        .catch(err => reject(err));

      commit('store_promise', promise);

      return promise;
    },

    async impersonate_user({ commit }, userId) {
      await impersonate_user({ userId });

      const userDetails = await get_user();
      commit('login', {
        ...userDetails,
        impersonating: true,
      });
      commit('set_impersonating', true);
    },

    async password_reset_request({ commit }, { email }) {
      commit(mutation.AUTH_BUSY);
      try {
        commit('password_reset_request', await forgotPassword({ email }));
      } catch (e) {
        commit(mutation.AUTH_BUSY, false);
        let exception;

        switch (e.message) {
          case 'Unauthorized':
            exception = new Exception(exceptions.auth.NotAllowed);
            break;
          default:
            exception = new Exception(exceptions.UnknownException, e);
            break;
        }

        throw exception;
      }
    },

    async logout({ commit }, { invalid_session } = {}) {
      commit(mutation.AUTH_BUSY);
      if (!invalid_session) await logout();
      commit(mutation.LOGOUT);
    },

    update_tokens({ commit }, { token, refresh_token }) {
      commit(mutation.SET_TOKENS, { token, refresh_token });
    },
  },

  mutations: {
    [mutation.AUTH_BUSY](state, busy) {
      if (typeof busy === 'undefined') {
        state.auth_busy = true;
      } else {
        state.auth_busy = busy;
      }
    },

    [mutation.LOGIN](state, { credentials, user }) {
      state.token = credentials.token;
      state.refresh_token = credentials.refresh_token;
      state.user = user;
      state.myUserId = user.id;
      state.auth_busy = false;
      state.logged_in = true;
    },

    [mutation.LOGOUT](state) {
      state.token = state.refresh_token = null;
      state.logged_in = false;
      state.user = {};
      state.auth_busy = false;
    },

    [mutation.SET_TOKENS](state, { token, refresh_token }) {
      state.token = token;
      state.refresh_token = refresh_token;
    },

    // @FIXME: the below should be mutation constants like above
    password_reset_request(state, value) {
      state.password_reset_request = value;
      state.auth_busy = false;
    },

    set_impersonating(state, value) {
      state.impersonating = value;
    },

    store_promise(state, promise) {
      state.promise = promise;
    },
  },

  getters: {
    impersonating(state) {
      return state.impersonating;
    },

    logged_in(state) {
      return state.logged_in;
    },

    password_reset_request(state) {
      return state.password_reset_request;
    },

    full_name(state) {
      return state.logged_in
        ? state.user.first_name + ' ' + state.user.last_name
        : '';
    },

    initials(state) {
      return state.logged_in
        ? (state.user.first_name.slice(0, 1) + (state.user.middle_name ? state.user.middle_name.slice(0, 1) : '')  + state.user.last_name.slice(0, 1)).toUpperCase()
        : '';
    },

    email(state) {
      return state.logged_in ? state.user.email : '';
    },

    user_id(state) {
      return state.logged_in ? state.user.id : '';
    },
  },
};

// Accounts.onResetPasswordLink((token, done) => {
//   global.passReset = {
//     callback: done,
//     token,
//   };
//   auth_store.mutations.password_reset_request(auth_store.state, true);
// });

export default auth_store;
