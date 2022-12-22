import userDao from "@data/dao/userDao";
import { createUser } from "@data/dto/createUserDto";
import { editUser } from "@data/dto/editUserDto";
import { IUserService } from "@interfaces/iUserService";

export class UsersService implements IUserService {
    private static instance: UsersService;
    public constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new UsersService();
        }
        return this.instance;
    }

    public async getByUsername(username: string) {
        return await userDao.getInstance().viewUserByUsername(username);
    }

    public async listAll() {
        return await userDao.getInstance().listAllUsers();
    }

    public async create(user: createUser) {
        return await userDao.getInstance().createUser(user);
    }

    public async edit(id: number | string, user: editUser) {
        return await userDao.getInstance().editUser(id, user);
    }

    public async delete(id: number | string) {
        return await userDao.getInstance().deleteUser(id);
    }

    public async deleteMultiple(ids: number[] | number) {
        return await userDao.getInstance().deleteUsers(ids);
    }
}

export default UsersService;
