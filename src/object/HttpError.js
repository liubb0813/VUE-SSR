export default class HttpError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  toString() {
    return `HTTP Error code: ${this.status}, message: ${this.message}, stack: ${
      this.stack
    }`;
  }
}
