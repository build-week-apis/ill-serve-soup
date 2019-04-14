## I'll Serve Soup Server

### About

This is the back-end for the I'll serve soup, which is part of Lambda School Build Week Project.

# MVP

## REGISTER (POST) User

a **POST** request to _/api/users/register_ will create a new user and return an object

URL: /api/users/register

Example data:

```
{
	"name":"Sorin",
	"password":"123",
	"email":"sorin@yahoo.com",
	"role":"manager"
}
```

If posted succesfully, the username will be returned. Example:

```
{
    "id": 5,
    "email": "sorin@yahoo.com",
    "message": "User: Sorin was registered succesfully"
}
```

## LOGIN (POST) User

a **POST** request to \_/api/users/login will create a new user and return an object

URL: /api/users/login

Form will need `username` and `password`. If posted correctly, should get a response of:

```
{
    "message": "Welcome Sorin!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InNvcmluQHlhaG9vLmNvbSIsImlhdCI6MTU1NTE5MTE4NiwiZXhwIjoxNTU1MjYzMTg2fQ.bmynQf4cFPjY3xRbf1aL5zdi90Fk7Kq51lcFX5smPQg",
    "role": "manager",
    "id": 5
}
```

## GET ALL Users

a **GET** request to \_/api/users will return all the users existing in database

URL: /api/users/

This route is restricted - a authorization header with the token its required

If Successful, response should be 200 (OK). If unsuccessful, response should be 500. Example users data:

```
{
    "users": [
        {
            "id": 1,
            "name": "Mihai",
            "email": "mihsi@yahoo.com",
            "password": "123",
            "role": "manager"
        },
        {
            "id": 2,
            "name": "Ion",
            "email": "ion@yahoo.com",
            "password": "123",
            "role": "volunteer"
        },
        {
            "id": 3,
            "name": "Maria",
            "email": "maria@yahoo.com",
            "password": "123",
            "role": "manager"
        },
    ],
    "decoded": {
        "subject": 7,
        "role": "manager",
        "email": "cata@yahoo.com",
        "iat": 1555192150,
        "exp": 1555264150
    }
}
```
