export class DeveloperNotFound extends Error {
    constructor() {
        super();
        this.message = "Developer Account Not Found";
        this.status_code = 404;
        this.name = "DeveloperNotFound";
    }
    toString() {
        return `${this.status_code}`;
    }
}
export class Unauthorized extends Error {
    constructor() {
        super();
        this.message = "Unauthorized";
        this.status_code = 401;
        this.name = "Unauthorized";
    }
    toString() {
        return `${this.status_code}: ${this.message}`;
    }
}
export class RateRevComNotFOund extends Error {
    constructor(message) {
        super(message);
        this.status_code = 404;
        this.name = "PrimaryNot";
    }
    toString() {
        return `${this.status_code}: ${this.message}`;
    }
}
export class BadRequestMessage extends Error {
    constructor(message) {
        super(message);
        this.status_code = 400;
        this.name = "BadRequest";
    }
    toString() {
        return `${this.status_code}: ${this.message}`;
    }
}
