import { Router } from "express";
import {
    postAddNewUser,
    putEditUser,
    deleteRemoveUser,
    getViewAllUsers,
    deleteRemoveUsers,
} from "@api/controllers/users.controller";
import { checkIsAdmin } from "@api/middlewares/authMiddleware";
import { validateSchema } from "@api/middlewares/validateSchema";

const router = Router();

export const route = {
    users: "/",
    usersId: "/:id",
    usersIds: "/ids",
};

/**
 * @openapi
 * /api/users:
 *  get:
 *     tags:
 *     - Users
 *     summary: Get users
 *     description: View list of all users in the system
 *     responses:
 *       200:
 *         description: Get all users
 *       401:
 *         description: Unauthorized. Token is needed in the request
 */
router.get(route.users, checkIsAdmin, getViewAllUsers);

/**
 * @openapi
 * /api/users:
 *  post:
 *     tags:
 *     - Users
 *     summary: Add a new user
 *     description: Add a new user
 *     consumes:
 *      - application/json
 *     requestBody:
 *        description: The user to be created.
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - address
 *               - postcode
 *               - contact_phone_number
 *               - role
 *               - email
 *               - username
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               address:
 *                 type: string
 *               postcode:
 *                 type: string
 *               contact_phone_number:
 *                 type: string
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             first_name: "test"
 *             last_name: "test"
 *             address: "quezon"
 *             postcode: "1106"
 *             contact_phone_number: "639567912384"
 *             role: "user"
 *             email: "test@webapi.com"
 *             username: "test"
 *             password: "password"
 *     responses:
 *       200:
 *         description: Creates a new user
 *       401:
 *         description: Unauthorized. Token is needed in the request
 */
router.post(route.users, checkIsAdmin, validateSchema, postAddNewUser);

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *     tags:
 *     - Users
 *     summary: Edit a user
 *     description: Edit an existing user
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     consumes:
 *      - application/json
 *     requestBody:
 *        description: The user to be edited.
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               address:
 *                 type: string
 *               postcode:
 *                 type: string
 *               contact_phone_number:
 *                 type: string
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             first_name: "test"
 *             last_name: "test"
 *             address: "quezon"
 *             postcode: "1106"
 *             contact_phone_number: "639567912384"
 *             role: "user"
 *             email: "test@webapi.com"
 *             username: "test"
 *             password: "password"
 *     responses:
 *       200:
 *         description: Edits a user detail
 *       401:
 *         description: Unauthorized. Token is needed in the request
 */
router.put(route.usersId, checkIsAdmin, validateSchema, putEditUser);

/**
 * @openapi
 * /api/users/ids?id={id}&id={id}:
 *  delete:
 *     tags:
 *     - Users
 *     summary: Deletes multiple user
 *     description: Deletes multiple user
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The ids of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Deletes multiple user
 *       401:
 *         description: Unauthorized. Token is needed in the request
 */
router.delete(route.usersIds, checkIsAdmin, deleteRemoveUsers);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *     tags:
 *     - Users
 *     summary: Deletes a user
 *     description: Deletes a user
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       204:
 *         description: Deletes a user
 *       401:
 *         description: Unauthorized. Token is needed in the request
 */
router.delete(route.usersId, checkIsAdmin, deleteRemoveUser);

export default router;
