/**
 * Adonis helpers. All API calls should be abstracted to this module.
 */

import axios from 'axios';
import _get from 'lodash/get';
import store from '../store';

/**
 * @param method - HTTP request method
 * @param endpoint - Path for request
 * @param params - Query params
 * @param data - JSON data for request body
 * @param options - API options
 */
export default async function apiCall(
  method,
  endpoint,
  params,
  data,
  options = {}
) {
  const requestUrl =
    process.env.API_ENDPOINT +
    (options.full_path ? endpoint : `/api${endpoint}`);

  try {
    const axiosOptions = {};
    let axiosCall;
    let response;

    switch (method) {
      case 'GET':
      case 'DELETE':
        break;
      case 'PATCH':
      case 'PUT':
        axiosCall = axios.put;
        break;
      case 'POST':
        axiosCall = axios.post;
        break;
      default:
        console.error('Invalid HTTP method:', method);
        return;
    }

    // Add authorization header if applicable
    if (store.state.auth.token) {
      axiosOptions.headers = {
        Authorization: `Bearer ${store.state.auth.token}`,
      };
    }

    if (method === 'GET') {
      if (params && typeof params === 'object') {
        axiosOptions.params = params;
      }
      response = await axios.get(requestUrl, axiosOptions);
    } else if (method === 'DELETE') {
      response = await axios.delete(requestUrl, axiosOptions);
    } else {
      response = await axiosCall(requestUrl, data, axiosOptions);
    }

    return response.data;
  } catch (e) {
    if (!options.full_path) {
      const errorMsg = _get(e.response, 'data.error.message');

      if (/^E_JWT_TOKEN_EXPIRED/.test(errorMsg)) {
        try {
          const response = await axios.post(
            `${process.env.API_ENDPOINT}/auth/refresh-token`,
            {
              refresh_token: store.state.auth.refresh_token,
            }
          );

          await store.dispatch('auth/update_tokens', {
            token: response.data.token,
            refresh_token: response.data.refresh_token,
          });

          return apiCall(method, endpoint, params, data, options);
        } catch (e) {
          if (
            /^E_INVALID_JWT_REFRESH_TOKEN/.test(e.response.data.error.message)
          ) {
            await store.dispatch('auth/logout', { invalid_sessions: true });
          }
        }
      }

      throw new Error(errorMsg || e);
    } else {
      throw new Error(_get(e.response, 'data[0].message') || e);
    }
  }
}
