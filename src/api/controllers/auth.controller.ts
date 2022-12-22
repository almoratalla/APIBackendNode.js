import { isProduction } from "@config/index";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "@services/auth.service";
import UsersService from "@services/users.service";
import { SERVICE_ERROR_CATCHER } from "@utils/responseError";

const { UNAUTHORIZED } = StatusCodes;

export const postAuthLogin: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UsersService.getInstance().getByUsername(username);
        let email, role, hashedPassword;
        if ("role" in user && "email" in user) {
            email = user.email;
            role = user.role;
            hashedPassword = user.password;
        }
        const login = await AuthService.getInstance().login({
            username,
            password,
            hashedPassword: hashedPassword || "",
            email: email || "",
            role: role || "user",
        });
        if (login.error) throw login;

        return res.status(200).json({
            ...login,
            username,
        });
    } catch (error) {
        const e = SERVICE_ERROR_CATCHER(error, "AUTH_LOGIN");
        return res.status(UNAUTHORIZED).json({
            ...e,
            message: "Authentication failed",
            status: "error",
            stack: isProduction ? "Something went wrong" : error,
        });
    }
};
