import { isProduction } from "@config/index";
import { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import responseError from "@utils/responseError";
const { INTERNAL_SERVER_ERROR } = StatusCodes;

export const notFoundHandler: RequestHandler = (req, res, next) => {
    const error = new responseError(
        `Not Found: ${req.method} ${req.originalUrl}`,
        "NOT_FOUND"
    );
    error.status = 404;
    res.status(404);
    next(error);
};

export const errorHandler: ErrorRequestHandler = (
    err: any,
    _req,
    res,
    _next
) => {
    return res
        .status(res.statusCode || err?.status || INTERNAL_SERVER_ERROR)
        .json({
            error: "Something went wrong",
            message: err.message,
            stack: isProduction ? undefined : err.stack,
            type: err?.type || "GENERAL_ERROR",
            isError: true,
        });
};
