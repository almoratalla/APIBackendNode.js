import { Router } from "express";
import { postAuthLogin } from "@api/controllers/auth.controller";
import { validateSchema } from "@api/middlewares/validateSchema";

const router = Router();

export const route = {
    login: "/login",
};

/**
 * @openapi
 * /auth/login:
 *  post:
 *     tags:
 *     - Login
 *     summary: Post login
 *     description: Login a user
 *     consumes:
 *      - application/json
 *     requestBody:
 *        description: The user to login.
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             username: "admin"
 *             password: "password"
 *     responses:
 *       200:
 *         description: Receives a bearer token to be used for authorization
 *       401:
 *         description: Unauthorized. Authentication failed.
 */
router.post(route.login, validateSchema, postAuthLogin);

export default router;
