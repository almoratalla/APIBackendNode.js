import request from "supertest";
import app from "../app";

describe("auth", () => {
    describe("user login", () => {
        describe("given the username and password are valid", () => {
            it("should return token", async () => {
                const { body } = await loginUser();
                expect(body).toHaveProperty("token");
            });
        });
        describe("given invalid username or password", () => {
            it("should return 401", async () => {
                await request(app)
                    .post("/auth/login")
                    .send({
                        username: "wrong-admin",
                        password: "wrong-password",
                    })
                    .expect(401);
            });
        });
        describe("given invalid, missing or no payload", () => {
            it("should return 422", async () => {
                await request(app)
                    .post("/auth/login")
                    .send({ password: "password" })
                    .expect(422);
            });
        });
    });
});

async function loginUser() {
    const response = await request(app)
        .post("/auth/login")
        .send({ username: "admin", password: "password" });
    return response;
}
