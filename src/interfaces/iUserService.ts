import createUserDto, { createUser } from "data/dto/createUserDto";
import editUserDto from "@data/dto/editUserDto";
import userDto from "@data/dto/userDto";

export interface IUserService {
    listAll: () => any;
    create: (user: createUser) => Promise<userDto | any>;
    edit: (id: number | string, user: editUserDto) => Promise<userDto | any>;
    delete: (id: number | string) => Promise<userDto | any>;
    deleteMultiple: (ids: number[] | number) => Promise<userDto | any>;
}
