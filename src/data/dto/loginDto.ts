export default class loginDto implements iLogin {
    public username: string;
    public password: string;
    public hashedPassword: string;
    public email: string;
    public role: string;

    constructor(userLogin: iLogin) {
        this.username = userLogin.username;
        this.password = userLogin.password;
        this.hashedPassword = userLogin.hashedPassword;
        this.email = userLogin.email;
        this.role = userLogin.role;
    }
}

export class tokenMeta implements iTokenMeta {
    public username: string;
    public email: string;
    public role: string;

    constructor(token: iLogin) {
        this.username = token.username;
        this.email = token.email;
        this.role = token.role;
    }
}

export interface iLogin {
    username: string;
    password: string;
    hashedPassword: string;
    email: string;
    role: string;
}

export interface iTokenMeta {
    username: string;
    email: string;
    role: string;
}
