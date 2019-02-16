import apiCall from './api-call';

/**
 * Get paginated list of users
 * @param params
 * @param params.page
 * @param params.perPage
 * @param params.sort
 * @param params.direction
 * @param params.search
 * @param options API options
 */
export async function userList({
  page = 1,
  perPage = 10,
  sort = null,
  direction = null,
  search = null
}, options) {
  return apiCall(
    'GET',
    '/users',
    { page, perPage, sort, direction, search },
    null,
    options,
  )
}

/**
 * Fetcha a single user
 * @param uid
 * @param options API options
 */
export async function getUser(uid) {
  return apiCall('GET', `/users/${uid}`);
}

/**
 * Create a new user, with profile data
 * @param data
 * @param options
 */
export async function createUser(data, options) {
  return apiCall('POST', '/users', null, data, options);
}

/**
 * Update a user
 * @param uid
 * @param data
 * @param options API options
 */
export async function updateUser(uid, data, options) {
  return apiCall('PUT', `/users/${uid}`, null, data, options);
}


/**
 * Remove a user
 * @param options API options
 */
export async function removeUser(uid) {
  return apiCall('DELETE', `/users/${uid}`);
}
