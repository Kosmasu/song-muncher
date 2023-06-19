export class DeveloperNotFound extends Error {
    status_code;
    constructor() {
      super();
      this.message = "Developer Account Not Found"
      this.status_code = 404;
      this.name = "DeveloperNotFound";
    }
    toString() {
      return `${this.status_code}`;
    }
}
export class Unauthorized extends Error {
    status_code;
    constructor( ) {
      super();
      this.message = "Unauthorized"
      this.status_code = 401;
      this.name = "Unauthorized";
    }
    toString() {
      return `${this.status_code}: ${this.message}`;
    }
}
export class RateRevComNotFOund extends Error {
    status_code;
    constructor( message: string) {
      super(message);
      this.status_code = 404;
      this.name = "PrimaryNot";
      
    }
    toString() {
      return `${this.status_code}: ${this.message}`;
    }
}
export class BadRequestMessage extends Error {
    status_code;
    constructor( message: string) {
      super(message);
      this.status_code = 400;
      this.name = "BadRequest";
    }
    toString() {
      return `${this.status_code}: ${this.message}`;
    }
}