import { RequestHandler } from "express";
import UsersService from "@services/users.service";
import { StatusCodes } from "http-status-codes";
import { isProduction } from "@config/index";
import { SERVICE_ERROR_CATCHER } from "@utils/responseError";

const { BAD_REQUEST, CREATED, OK, NO_CONTENT } = StatusCodes;

export const postAddNewUser: RequestHandler = async (req, res) => {
    try {
        const data = req.body;
        const createdUser = await UsersService.getInstance().create(data);
        return res.status(CREATED).json(createdUser);
    } catch (error) {
        const e = SERVICE_ERROR_CATCHER(error, "CREATE_USER");
        res.status(BAD_REQUEST).json({
            ...e,
            message: "Something went wrong",
            meta: "Please make sure values are passed in the request and username should not exist within our records",
            status: "error",
            stack: isProduction ? "Something went wrong" : error,
        });
    }
};
export const putEditUser: RequestHandler = async ({ params, body }, res) => {
    try {
        if (!params.id) {
            throw new Error("Invalid request. Specify an id param");
        }
        const editedUser = await UsersService.getInstance().edit(
            params.id,
            body
        );
        return res.status(OK).json(editedUser);
    } catch (error) {
        const e = SERVICE_ERROR_CATCHER(error, "EDIT_USER");
        res.status(BAD_REQUEST).json({
            ...e,
            message: "Something went wrong",
            meta: "Please make sure values are passed in the request and data to be edited is not the original",
            status: "error",
            stack: isProduction ? "Something went wrong" : error,
        });
    }
};
export const deleteRemoveUser: RequestHandler = async ({ params }, res) => {
    try {
        if (!params.id) {
            throw new Error("Invalid request. Specify an id param");
        }
        const deletedUser = await UsersService.getInstance().delete(params.id);
        return res
            .status(OK)
            .json({ message: "User successfully deleted", user: deletedUser });
    } catch (error) {
        const e = SERVICE_ERROR_CATCHER(error, "DELETE_USER");
        res.status(BAD_REQUEST).json({
            ...e,
            message: "Something went wrong",
            meta: "Please make sure id is included in the request and id for the user exist",
            status: "error",
            stack: isProduction ? "Something went wrong" : error,
        });
    }
};

export const getViewAllUsers: RequestHandler = async (req, res) => {
    try {
        const users = await UsersService.getInstance().listAll();
        return res.status(OK).json(users);
    } catch (error) {
        const e = SERVICE_ERROR_CATCHER(error, "VIEW_USERS");
        res.status(BAD_REQUEST).json({
            ...e,
            message: "Something went wrong",
            status: "error",
            stack: isProduction ? "Something went wrong" : error,
        });
    }
};
export const deleteRemoveUsers: RequestHandler = async (req, res) => {
    try {
        const { id } = req.query;
        const ids = Array.isArray(id)
            ? id.map((m) => Number(m)).filter((f) => +f)
            : Number(id);
        if (typeof ids === "number" && isNaN(ids)) {
            throw new Error("Invalid request. Specify an id param.");
        }
        const deletedUsers = await UsersService.getInstance().deleteMultiple(
            ids
        );
        return res
            .status(NO_CONTENT)
            .json({ message: "Users successfully deleted", ...deletedUsers });
    } catch (error) {
        const e = SERVICE_ERROR_CATCHER(error, "DELETE_USERS");
        res.status(BAD_REQUEST).json({
            ...e,
            message: "Something went wrong",
            meta: "Please make sure id is included in the request and id for the user exist",
            status: "error",
            stack: isProduction ? "Something went wrong" : error,
        });
    }
};
