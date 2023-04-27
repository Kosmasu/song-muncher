export class SpotifyAPIError extends Error {
  status_code;
  constructor(status_code: number, message: string) {
    super(message);
    this.status_code = status_code;
    this.name = "SpotifyAPIError";
  }
  toString() {
    return `${this.status_code}: ${this.message}`;
  }
}