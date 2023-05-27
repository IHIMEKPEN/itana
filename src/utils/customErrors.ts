/** AppError Class */
export class AppError extends Error {
  /** @public */
  public type: string;

  /**
   * @description Custom AppError Response
   * @param message - Error Message
   * @param statusCode - Error Status Code
   */
  constructor(public message: string, public statusCode = 400) {
    super(message);

    //  Default Error type
    this.type = this.constructor.name;
  }
}

/** Duplicate Key Error class */
export class DuplicateKeyError extends AppError {
  public possibleSolution: string;

  /**
   * @description DuplicateKey Custom Error
   * @param message - Error Message
   * @param field field on validation
   * @param value current field value
   */
  constructor(public message: string, public field: string, public value: any) {
    super(message);

    /** NOTE: default message is used, if an empty string is passed for the message */
    this.message = message || `a value: '${value}' for '${field}' already exist, '${field}' must be a unique value.`;
    this.possibleSolution = `try using another valid value for '${field}'`;
  }
}

/** AuthError Error Class */
export class AuthError extends AppError {
  constructor(
    public readonly message: string,
    public readonly field: string,
    public readonly possibleSolution: string,
    public readonly statusCode = 401
  ) {
    super(message);
  }
}

/** ValidationError Error Class */
export class ValidationError extends AppError {
  /**
   * @description ValidationError Custom Error
   * @param message - error message
   * @param field field on validation
   * @param possibleSolution possible solution to fix error
   */
  constructor(public message: string, public field: string, public possibleSolution: string = '', public code = '') {
    super(message);

    this.possibleSolution = possibleSolution || `try providing a valid value for the '${field}' field`;
  }
}

/** NotFoundError Error Class */
export class NotFoundError extends AppError {
  public possibleSolution: string;

  /**
   * @description NotFound Custom Error
   * @param message - Error Message
   */
  constructor(public message: string) {
    super(message);

    this.statusCode = 404;
    this.possibleSolution = `check the endpoint and confirm that you're using the right HTTP method`;
  }
}
