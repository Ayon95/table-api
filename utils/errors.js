export class ResourceNotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'ResourceNotFoundError';
    this.status = 404;
    this.message = message;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super();
    this.name = 'BadRequestError';
    this.status = 400;
    this.message = message;
  }
}

export class AuthError extends Error {
  constructor(status, message) {
    super();
    this.name = 'AuthError';
    this.status = status;
    this.message = message;
  }
}
