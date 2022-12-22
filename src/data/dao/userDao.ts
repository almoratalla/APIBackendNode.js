import { PrismaClient } from "@prisma/client";
import createUserDto, { createUser } from "@data/dto/createUserDto";
import editUserDto, { editUser } from "@data/dto/editUserDto";
import userDto from "@data/dto/userDto";

const prisma = new PrismaClient();

export default class userDao {
    private static instance: userDao;
    public constructor() {}
    public static getInstance() {
        if (!this.instance) {
            this.instance = new userDao();
        }
        return this.instance;
    }
    public async listAllUsers() {
        try {
            const response = await prisma.users.findMany();
            return response.map((u) => new userDto(u));
        } catch (err) {
            return {
                error: err,
            };
        } finally {
            async () => {
                await prisma.$disconnect();
            };
        }
    }

    public async viewUserByUsername(username: string) {
        try {
            const response = await prisma.users.findFirstOrThrow({
                where: {
                    username: username,
                },
            });
            return response;
        } catch (err) {
            return {
                error: err,
            };
        } finally {
            async () => {
                await prisma.$disconnect();
            };
        }
    }

    public async createUser(user: createUser) {
        try {
            const createUserData = new createUserDto(user);
            const response = await prisma.users.create({
                data: createUserData,
            });
            return new userDto(response);
        } catch (err) {
            throw err;
        } finally {
            async () => {
                await prisma.$disconnect();
            };
        }
    }

    public async editUser(id: number | string, user: editUser) {
        try {
            const response = await prisma.users.update({
                where: {
                    id: Number(id),
                },
                data: new editUserDto(user),
            });
            return new userDto(response);
        } catch (err) {
            throw err;
        } finally {
            async () => {
                await prisma.$disconnect();
            };
        }
    }

    public async deleteUser(id: number | string) {
        try {
            const response = await prisma.users.delete({
                where: {
                    id: Number(id),
                },
            });
            return new userDto(response);
        } catch (err) {
            throw err;
        } finally {
            async () => {
                await prisma.$disconnect();
            };
        }
    }

    public async deleteUsers(ids: number[] | number) {
        try {
            const response = await prisma.users.deleteMany({
                where: {
                    id: { in: ids },
                },
            });
            return response;
        } catch (err) {
            throw err;
        } finally {
            async () => {
                await prisma.$disconnect();
            };
        }
    }
}
