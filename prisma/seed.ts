import { users } from "./seedData/users";
import { PrismaClient } from "@prisma/client";
import createUserDto from "../src/data/dto/createUserDto";

const prisma = new PrismaClient();

async function main() {
    for (const user of users) {
        await prisma.users.create({
            data: new createUserDto(user),
        });
    }
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
