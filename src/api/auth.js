import apiCall from './api-call';

/**
 * Login a user
 * @param data
 * @param data.email
 * @param data.password
 * @param options API options
 */
export async function login({ email, password }, options) {
  return apiCall(
    'POST',
    '/auth/login',
    null,
    { email, password },
    {
      ...options,
      full_path: true,
    }
  );
}

/**
 * Log out
 * @param options API options
 */
export async function logout(options) {
  return apiCall('GET', '/auth/logout', null, null, {
    ...options,
    full_path: true,
  });
}

/**
 * Set a new password
 * @param data
 * @param data.token
 * @param data.password
 * @param data.password_confirmation
 * @param options API options
 */
export async function resetPassword(
  { token, password, password_confirmation },
  options
) {
  return apiCall(
    'POST',
    '/auth/password-reset',
    null,
    {
      token,
      password,
      password_confirmation,
    },
    {
      ...options,
      full_path: true,
    }
  );
}

/**
 *
 * @param data
 * @param data.email
 * @param options
 */
export async function forgotPassword({ email }, options) {
  return apiCall(
    'POST',
    '/auth/forgot-password',
    null,
    { email },
    {
      ...options,
      full_path: true,
    }
  );
}

/**
 *
 * @param data
 * @param data.email
 * @param options
 */
export async function verifyEmail({ token }, options) {
  return apiCall(
    'POST',
    '/auth/verify-email',
    null,
    { token },
    {
      ...options,
      full_path: true,
    }
  );
}
