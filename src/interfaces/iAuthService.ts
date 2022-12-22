import { iLogin } from "@data/dto/loginDto";

export interface IAuthService {
    login: (user: iLogin) => any;
}
