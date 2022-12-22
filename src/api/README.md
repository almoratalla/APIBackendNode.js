# API Documentation

## `POST` /auth/login

**Endpoint**: /auth/login  
**Method**: `POST`  
**Description**: Login route to receive auth token. Received token will be attached to authorization headers in API requests for authorization. Please refer to seed data for a dummy admin credential.

`Note:` Only users with `admin` role can trigger the current API endpoints.

**Request Body (_required_)**:

```json
{
    "username": "admin",
    "password": "password"
}
```

**Response (_on success_)**

```json
{
    "message": "Auth successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkB3ZWJhcGkuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjcxNzA1MzE2LCJleHAiOjE2NzE3MDg5MTZ9.GtuBmyIzeDEW1xsC-LfKd0UP-60MX3BWZKGjHfV_ELM",
    "username": "admin"
}
```

`Note:` Response token `TOKEN` should be used for the other API endpoints attached to authorization headers.

---

## `GET` /api/users

**Endpoint**: /api/users  
**Method**: `GET`  
**Description**: View all users in the system.  
Attach in the headers a bearer token for authorization to access.

`Note:` Only users with `admin` role can trigger this endpoint.

**Request Headers (_required_)**:

```bash
    Authorization: Bearer <TOKEN>
```

**Response (_on success_)**

```json
[
  {
    "id": 1,
    "first_name": "admin",
    "last_name": "admin",
    "address": "quezon",
    "postcode": "1159",
    "contact_phone_number": "639123456789",
    "email": "admin@webapi.com",
    "role": "admin",
    "username": "admin",
    "created_at": "2022-12-22T09:33:08.836Z",
    "updated_at": "2022-12-22T09:33:08.836Z"
  },
  {
    "id": 2,
    "first_name": "test",
    "last_name": "test",
    "address": "quezon",
    "postcode": "1159",
    "contact_phone_number": "639123456789",
    "email": "test@webapi.com",
    "role": "user",
    "username": "test",
    "created_at": "2022-12-22T09:33:08.906Z",
    "updated_at": "2022-12-22T09:33:08.906Z"
  },
  ...
]
```

---

## `POST` /api/users

**Endpoint**: /api/users  
**Method**: `POST`  
**Description**: Create a new user. All fields in the request are required.  
Attach in the headers a bearer token for authorization to access.

`Note:` Only users with `admin` role can trigger this endpoint.

**Request Headers (_required_)**:

```bash
    Authorization: Bearer <TOKEN>
```

**Request Body (_required_)** [sample]:

```json
{
    "first_name": "test",
    "last_name": "test",
    "address": "quezon",
    "postcode": "1106",
    "contact_phone_number": "639567912384",
    "role": "user",
    "email": "test@webapi.com",
    "username": "uniqueUsernameHere",
    "password": "password"
}
```

**Response (_on success_)**

```json
{
    "id": 9,
    "first_name": "test",
    "last_name": "test",
    "address": "quezon",
    "postcode": "1106",
    "contact_phone_number": "639567912384",
    "email": "test@webapi.com",
    "role": "user",
    "username": "uniqueUsernameHere",
    "created_at": "2022-12-22T10:47:40.234Z",
    "updated_at": "2022-12-22T10:47:40.234Z"
}
```

---

## `PUT` /api/users/{id}

**Endpoint**: /api/users/{id}  
**Method**: `PUT`  
**Description**: Edit a user. Fields are optional. Choose which to update.  
Attach in the headers a bearer token for authorization to access.

`Note:` Only users with `admin` role can trigger this endpoint.

**URL Parameters (_required_)**:

```bash
    id: <id-of-the-user-to-update>
```

**Request Headers (_required_)**:

```bash
    Authorization: Bearer <TOKEN>
```

**Request Body (_required_)** [sample]:

```json
{
    "first_name": "testNewFirstName",
    "last_name": "testNewLastName"
}
```

**Response (_on success_)**

```json
{
    "id": 9,
    "first_name": "testNewFirstName",
    "last_name": "testNewLastName",
    "address": "quezon",
    "postcode": "1106",
    "contact_phone_number": "639567912384",
    "email": "test@webapi.com",
    "role": "user",
    "username": "uniqueUsernameHere",
    "created_at": "2022-12-22T10:47:40.234Z",
    "updated_at": "2022-12-22T10:47:40.234Z"
}
```

---

## `DELETE` /api/users/{id}

**Endpoint**: /api/users/{id}  
**Method**: `DELETE`  
**Description**: Deletes a user.  
Attach in the headers a bearer token for authorization to access.

`Note:` Only users with `admin` role can trigger this endpoint.

**URL Parameters (_required_)**:

```bash
    id: <id-of-the-user-to-delete>
```

**Request Headers (_required_)**:

```bash
    Authorization: Bearer <TOKEN>
```

**Response (_on success_)**

```json
{
    "message": "User successfully deleted",
    "user": {
        "id": 9,
        "first_name": "testNewFirstName",
        "last_name": "testNewLastName",
        "address": "quezon",
        "postcode": "1106",
        "contact_phone_number": "639567912384",
        "email": "test@webapi.com",
        "role": "user",
        "username": "uniqueUsernameHere",
        "created_at": "2022-12-22T10:47:40.234Z",
        "updated_at": "2022-12-22T10:47:40.234Z"
    }
}
```

---

## `DELETE` /api/users/ids?id={id}&id={id}

**Endpoint**: /api/users/{id}  
**Method**: `DELETE`  
**Description**: Deletes multiple users.  
Attach in the headers a bearer token for authorization to access.

`Note:` Only users with `admin` role can trigger this endpoint.  
`Note:` Only works right now for multiple id query params. Will try to use delimiters in handling arrays in query params.

**Query Parameters (_required_)**(_multiple_):

```bash
    id: <id-of-the-user-to-delete>
```

**Request Headers (_required_)**:

```bash
    Authorization: Bearer <TOKEN>
```

**Response (_on success_)**

```
    204: No Content
```
