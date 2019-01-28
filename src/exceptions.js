export class Exception extends Error {
  constructor(code, data) {
    super(code);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }

    this.code = code;
    this.data = data;
  }
}

export const exceptions = {
  auth: {
    InvalidLogin: 'InvalidLogin',
    LoginDisabled: 'LoginDisabled',
  },
  UnknownException: 'UnknownException',
};
