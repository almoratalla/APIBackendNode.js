import request from "supertest";
import app from "../app";

describe("users", () => {
    describe("GET /api/users : View list of all users in the system", () => {
        describe("given the endpoint is triggered without authorization", () => {
            it("should return 401", async () => {
                await request(app).get("/api/users").expect(401);
            });
        });
        describe("given authorization is provided by a user account", () => {
            it("should return 401 and invalid request", async () => {
                const { body } = await loginUser({
                    username: "mikkijillmcsd",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .get("/api/users")
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .expect(401)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                message: expect.any(String),
                                error: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                                status: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                            })
                        );
                    });
            });
        });
        describe("given authorization is provided by an admin account", () => {
            it("should return 200 and a list of users", async () => {
                const { body } = await loginUser({
                    username: "admin",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .get("/api/users")
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .expect(200)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    id: expect.any(Number),
                                    first_name: expect.any(String),
                                    last_name: expect.any(String),
                                    address: expect.any(String),
                                    postcode: expect.any(String),
                                    contact_phone_number: expect.any(String),
                                    email: expect.any(String),
                                    role: expect.any(String),
                                    username: expect.any(String),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String),
                                }),
                            ])
                        );
                    });
            });
        });
    });

    describe("POST /api/users : Add a new user", () => {
        describe("given the endpoint is triggered without authorization", () => {
            it("should return 401", async () => {
                await request(app)
                    .post("/api/users")
                    .send({
                        first_name: "sample",
                        last_name: "payload",
                        address: "philippines",
                        postcode: "1100",
                        contact_phone_number: "639567912384",
                        role: "user",
                        email: "sample@webapi.com",
                        username: "sampleapi",
                        password: "password",
                    })
                    .expect(401);
            });
        });
        describe("given authorization is provided by a user account", () => {
            it("should return 401 and invalid request", async () => {
                const { body } = await loginUser({
                    username: "mikkijillmcsd",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .post("/api/users")
                    .send({
                        first_name: "sample",
                        last_name: "payload",
                        address: "philippines",
                        postcode: "1100",
                        contact_phone_number: "639567912384",
                        role: "user",
                        email: "sample@webapi.com",
                        username: "sampleapi",
                        password: "password",
                    })
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .expect(401)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                message: expect.any(String),
                                error: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                                status: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                            })
                        );
                    });
            });
        });
        describe("given authorization is provided by an admin account", () => {
            // Note: This test will fail if user already exists in record. Make sure to delete the duplicate record or
            // modify the payload to create a new record
            // describe("given payload is complete and valid", () => {
            //     it("should return 201 and the created user object", async () => {
            //         const { body } = await loginUser({
            //             username: "admin",
            //             password: "password",
            //         });
            //         const { token } = body;
            //         await request(app)
            //             .post("/api/users")
            //             .send({
            //                 first_name: "sample",
            //                 last_name: "payload",
            //                 address: "philippines",
            //                 postcode: "1100",
            //                 contact_phone_number: "639567912384",
            //                 role: "user",
            //                 email: "sample@webapi.com",
            //                 username: "sampleapi2",
            //                 password: "password",
            //             })
            //             .set({
            //                 Authorization: `Bearer ${token}`,
            //                 Accept: "application/json",
            //             })
            //             .expect(201)
            //             .then((response) => {
            //                 expect(response.body).toEqual(
            //                     expect.objectContaining({
            //                         id: expect.any(Number),
            //                         first_name: expect.any(String),
            //                         last_name: expect.any(String),
            //                         address: expect.any(String),
            //                         postcode: expect.any(String),
            //                         contact_phone_number: expect.any(String),
            //                         email: expect.any(String),
            //                         role: expect.any(String),
            //                         username: expect.any(String),
            //                         created_at: expect.any(String),
            //                         updated_at: expect.any(String),
            //                     })
            //                 );
            //             });
            //     });
            // });
            // This test will fail if user already exists in record
            describe("given payload is missing, incomplete or invalid and/or username is already in record", () => {
                it("should return 422", async () => {
                    const { body } = await loginUser({
                        username: "admin",
                        password: "password",
                    });
                    const { token } = body;
                    // incomplete payload
                    await request(app)
                        .post("/api/users")
                        .send({
                            first_name: "sample",
                            last_name: "payload",
                        })
                        .set({
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        })
                        .expect(422)
                        .then((response) => {
                            expect(response.body).toEqual(
                                expect.objectContaining({
                                    status: expect.stringContaining("failed"),
                                    error: expect.any(String),
                                })
                            );
                        });
                });
            });
        });
    });

    describe("DELETE /api/users/:id : Delete a user", () => {
        describe("given the endpoint is triggered without authorization", () => {
            const idToBeDeleted = 31;
            it("should return 401", async () => {
                await request(app)
                    .delete(`/api/users/${idToBeDeleted}`)
                    .expect(401);
            });
        });
        describe("given authorization is provided by a user account", () => {
            it("should return 401 and invalid request", async () => {
                const idToBeDeleted = 31;
                const { body } = await loginUser({
                    username: "mikkijillmcsd",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .delete(`/api/users/${idToBeDeleted}`)
                    .expect(401)
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                message: expect.any(String),
                                error: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                                status: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                            })
                        );
                    });
            });
        });
        describe("given authorization is provided by an admin account", () => {
            // Note: This test will fail if user id doesnt exist and is already deleted
            it("should return 400 if trying to delete a user that doesn't exist", async () => {
                const idToBeDeleted = 31;
                const { body } = await loginUser({
                    username: "admin",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .delete(`/api/users/${idToBeDeleted}`)
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .expect(400);
            });
        });
    });

    describe("PUT /api/users/:id : Edit a user", () => {
        describe("given the endpoint is triggered without authorization", () => {
            it("should return 401", async () => {
                await request(app)
                    .put("/api/users/2")
                    .send({
                        first_name: "mikki",
                    })
                    .expect(401);
            });
        });
        describe("given authorization is provided by a user account", () => {
            it("should return 401 and invalid request", async () => {
                const { body } = await loginUser({
                    username: "mikkijillmcsd",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .put("/api/users/2")
                    .send({
                        first_name: "mikki",
                    })
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .expect(401)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                message: expect.any(String),
                                error: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                                status: expect.stringContaining(
                                    "INVALID_REQUEST"
                                ),
                            })
                        );
                    });
            });
        });
        describe("given authorization is provided by an admin account", () => {
            describe("given payload is valid", () => {
                it("should return 200", async () => {
                    const { body } = await loginUser({
                        username: "admin",
                        password: "password",
                    });
                    const { token } = body;
                    // incomplete payload
                    await request(app)
                        .put("/api/users/2")
                        .send({
                            first_name: "mikki",
                        })
                        .set({
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        })
                        .expect(200)
                        .then((response) => {
                            expect(response.body).toEqual(
                                expect.objectContaining({
                                    id: expect.any(Number),
                                    first_name: expect.any(String),
                                    last_name: expect.any(String),
                                    address: expect.any(String),
                                    postcode: expect.any(String),
                                    contact_phone_number: expect.any(String),
                                    email: expect.any(String),
                                    role: expect.any(String),
                                    username: expect.any(String),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String),
                                })
                            );
                        });
                });
            });
        });
    });

    describe("DELETE /api/users/ids?id=1&id=2 : Allow multiple users to be removed", () => {
        describe("given the endpoint is triggered without authorization", () => {
            const idsToBeDeleted = [31, 32];
            it("should return 401", async () => {
                await request(app)
                    .delete(
                        `/api/users/ids?id=${idsToBeDeleted[0]}&id=${idsToBeDeleted[1]}`
                    )
                    .expect(401);
            });
        });
        describe("given authorization is provided by a user account", () => {
            it("should return 401 and invalid request", async () => {
                const idsToBeDeleted = [31, 32];
                const { body } = await loginUser({
                    username: "mikkijillmcsd",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .delete(
                        `/api/users/ids?id=${idsToBeDeleted[0]}&id=${idsToBeDeleted[1]}`
                    )
                    .expect(401)
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                message: expect.any(String),
                                error: expect.any(String),
                                status: expect.any(String),
                            })
                        );
                    });
            });
        });
        describe("given authorization is provided by an admin account", () => {
            // Note: This test will fail if user id doesnt exist and is already deleted
            it("should return 204", async () => {
                const idsToBeDeleted = [31, 32];
                const { body } = await loginUser({
                    username: "admin",
                    password: "password",
                });
                const { token } = body;
                await request(app)
                    .delete(
                        `/api/users/ids?id=${idsToBeDeleted[0]}&id=${idsToBeDeleted[1]}`
                    )
                    .set({
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    })
                    .expect(204);
            });
        });
    });
});

async function loginUser(payload: { username: string; password: string }) {
    const response = await request(app).post("/auth/login").send(payload);
    return response;
}
