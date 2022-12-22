export default class userDto {
    public id: string;
    public first_name: string;
    public last_name: string;
    public address: string;
    public postcode: string;
    public contact_phone_number: string;
    public email: string;
    public role: string;
    public username: string;
    public created_at: Date;
    public updated_at: Date;

    constructor(user: any) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.address = user.address;
        this.postcode = user.postcode;
        this.contact_phone_number = user.contact_phone_number;
        this.email = user.email;
        this.role = user.role;
        this.username = user.username;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
}

export interface iUser {
    id: string;
    first_name: string;
    last_name: string;
    address: string;
    postcode: string;
    contact_phone_number: string;
    email: string;
    role: string;
    username: string;
    created_at: Date;
    updated_at: Date;
}
