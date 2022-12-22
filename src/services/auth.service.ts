import { compare } from "bcryptjs";
import { iLogin, iTokenMeta, tokenMeta } from "@data/dto/loginDto";
import { IAuthService } from "@interfaces/iAuthService";
import { sign, verify } from "jsonwebtoken";

export class AuthService implements IAuthService {
    private static instance: AuthService;
    public constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
    public async login(user: iLogin) {
        const verify = await this.verifyPassword(
            user.password,
            user.hashedPassword
        );
        if (!verify) {
            return {
                message: "Auth failed",
                meta: "Please check your credentials",
                status: "INVALID",
                error: "INVALID_AUTH",
            };
        }
        const token = await this.generateToken(new tokenMeta(user));
        return {
            message: "Auth successful",
            token: token,
        };
    }

    private async generateToken(user: iTokenMeta) {
        const token = sign(
            JSON.parse(JSON.stringify(user)),
            process.env.JWT_KEY || "",
            {
                expiresIn: "1h",
            }
        );
        return token;
    }

    private async verifyPassword(password: string, hashedPassword: string) {
        try {
            const match = await compare(password, hashedPassword);
            if (!match) throw "Passwords do not match";
            return true;
        } catch (error) {
            return false;
        }
    }

    public async verifyToken(token: string) {
        try {
            const verifiedToken = verify(token, process.env.JWT_KEY!);
            return verifiedToken;
        } catch (err) {
            return {
                message: "Invalid token",
                meta: "Please check valid authorization token in request header",
                error: "INVALID_REQUEST",
                status: "INVALID_REQUEST",
                stack: err,
            };
        }
    }
}
