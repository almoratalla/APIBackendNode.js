import Joi from "joi";

export const postAddNewUserSchema = Joi.object().keys({
    first_name: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .required(),
    last_name: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .required(),
    address: Joi.string().max(25).required(),
    postcode: Joi.string().required(),
    contact_phone_number: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    role: Joi.string().required(),
    username: Joi.string().alphanum().min(4).max(18).required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(7)
        .max(12)
        .required(),
});

export const putEditUserSchema = Joi.object().keys({
    first_name: Joi.string().regex(/^[a-zA-Z]+$/),
    last_name: Joi.string().regex(/^[a-zA-Z]+$/),
    address: Joi.string().max(25),
    postcode: Joi.string(),
    contact_phone_number: Joi.string(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    role: Joi.string(),
    username: Joi.string().alphanum().min(4).max(18),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(7)
        .max(12),
});

export const postAuthLoginSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
