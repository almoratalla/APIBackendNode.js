export default class responseError extends Error implements iResponseError {
    constructor(
        message?: string,
        public type?: string,
        public status?: number
    ) {
        super(message);
    }
}

export interface iResponseError {
    message?: string;
    type?: string;
    status?: number;
}

export const SERVICE_ERROR_CATCHER = (
    err: unknown,
    type: string,
    err_message?: string
) => {
    let ERR_MESSAGE = err_message || "Something went wrong";

    if (typeof err === "string") {
        ERR_MESSAGE = err;
    } else if (err instanceof Error) {
        ERR_MESSAGE = err.message;
    } else {
        ERR_MESSAGE = "Something went wrong";
    }
    const e = new responseError(ERR_MESSAGE, type);
    return e;
};
