import { hashSync } from "bcryptjs";

export default class createUserDto implements createUser {
    public first_name: string;
    public last_name: string;
    public address: string;
    public postcode: string;
    public contact_phone_number: string;
    public email: string;
    public role: string;
    public username: string;
    public password?: string;

    constructor(user: createUser) {
        this.first_name = user.first_name?.toLowerCase();
        this.last_name = user.last_name?.toLowerCase();
        this.address = user.address;
        this.postcode = user.postcode;
        this.contact_phone_number = user.contact_phone_number;
        this.email = user.email;
        this.role = user.role || "user";
        this.username = user.username;
        this.hashedPassword = user.password;
    }

    private hashPassword(pw: string) {
        try {
            this.password = hashSync(pw, 10);
            return this.password;
        } catch (err) {
            this.password = pw;
            return this.password;
        }
    }

    private set hashedPassword(p: string | undefined) {
        if (!p || p.length === 0) {
            this.password = undefined;
        } else {
            this.hashPassword(p);
        }
    }
}

export interface createUser {
    first_name: string;
    last_name: string;
    address: string;
    postcode: string;
    contact_phone_number: string;
    email: string;
    role: string;
    username: string;
    password?: string;
}
