import { RequestHandler } from "express";
import { AuthService } from "@services/auth.service";
import { StatusCodes } from "http-status-codes";
const { UNAUTHORIZED } = StatusCodes;

export const checkAuth: RequestHandler = async (req, res, next) => {
    try {
        let token;
        if (
            !req.headers.authorization ||
            req.headers.authorization === undefined
        ) {
            token = req.body.token;
        } else {
            const headerToken =
                req.headers.authorization.split(" ")[1] ||
                req.headers.authorization;
            token = headerToken || req.body.token;
        }

        const verify = await AuthService.getInstance().verifyToken(token);

        if (typeof verify === "object" && "error" in verify) {
            throw verify;
        }
        next();
    } catch (err) {
        return res.status(UNAUTHORIZED).json(err);
    }
};

export const checkIsAdmin: RequestHandler = async (req, res, next) => {
    try {
        let token;
        if (
            !req.headers.authorization ||
            req.headers.authorization === undefined
        ) {
            token = req.body.token;
        } else {
            const headerToken =
                req.headers.authorization.split(" ")[1] ||
                req.headers.authorization;
            token = headerToken || req.body.token;
        }

        const verify = await AuthService.getInstance().verifyToken(token);

        if (typeof verify === "object" && "error" in verify) {
            throw verify;
        }

        if (
            typeof verify === "object" &&
            "role" in verify &&
            verify.role !== "admin"
        )
            throw {
                message:
                    "Invalid token. Only users with admin privileges can access this endpoint.",
                error: "INVALID_REQUEST",
                status: "INVALID_REQUEST",
            };
        next();
    } catch (err) {
        return res.status(UNAUTHORIZED).json(err);
    }
};
