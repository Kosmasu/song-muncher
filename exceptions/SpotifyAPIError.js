export class SpotifyAPIError extends Error {
    constructor(status_code, message) {
        super(message);
        this.status_code = status_code;
        this.name = "SpotifyAPIError";
    }
    toString() {
        return `${this.status_code}: ${this.message}`;
    }
}
