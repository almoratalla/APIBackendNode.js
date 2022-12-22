import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isProduction } from "@config/index";
import {
    postAddNewUserSchema,
    postAuthLoginSchema,
    putEditUserSchema,
} from "@schema/validation/users.schema";

const { UNPROCESSABLE_ENTITY } = StatusCodes;

interface schemas {
    [key: string]: any;
}

const schemas: schemas = {
    postAddNewUser: postAddNewUserSchema,
    putEditUser: putEditUserSchema,
    postAuthLogin: postAuthLoginSchema,
};

export const validateSchema: RequestHandler = async (req, res, next) => {
    try {
        const stack = req.route.stack;
        const lastLayer: string = req.route.stack[stack.length - 1].name;
        const body = req.body;

        await schemas[lastLayer].validateAsync(body);
        next();
    } catch (err) {
        res.status(UNPROCESSABLE_ENTITY).json({
            status: "failed",
            error: "Invalid request data. Please review request and try again.",
            stack: isProduction ? undefined : err,
        });
    }
};
