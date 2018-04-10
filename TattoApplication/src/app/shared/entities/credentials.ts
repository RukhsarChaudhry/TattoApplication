export class Credentials {
    grant_type: string;
    email: string;
    password: string;
    constructor() {
        this.grant_type = "password";
    }
    toString() {
        return `grant_type=${this.grant_type}&userName=${this.email}&password=${this.password}`;
    }
}