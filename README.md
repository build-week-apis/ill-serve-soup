## I'll Serve Soup Server

### About

This is the back-end for the I'll serve soup, which is part of Lambda School Build Week Project.

# Instructions

All API requests are made to: **_https://kitchen-soup-backend.herokuapp.com_**

## REGISTER (POST) User

a **POST** request to _/api/users/register_ will create a new user and return an object

Form will need `name` , `password` , `email` and `role` that are require for registration a user
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

If posted succesfully, will return a object with message:

```
{
    "id": 5,
    "email": "sorin@yahoo.com",
    "message": "User: Sorin was registered succesfully"
}
```

If require field are not preset it will return a object with message:

```
{
    "message": "please provide name, password email and role for the user"
}
```

## LOGIN (POST) User

a **POST** request to \_/api/users/login will return an object

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

If require field are not preset it will return a object with message:

```
{
    "message": "please provide username and password"
}
```

## GET ALL Users

a **GET** request to \_/api/users will return all the users existing in database

URL: /api/users/

This route is restricted - a authorization header with the token its required
The respone will include the decoded tokend contains the id,email and role of the current user

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

In case the token is not present in the header it will respond with:

```
{
    "message": "Invalid Credentials"
}
```

## GET Users By ID

a **GET** request to \_/api/users will return the user with specified ID

URL: /api/users/:id

This route is restricted - a authorization header with the token its required

If Successful, response should be 200 (OK), should get a response of:

```
{
    "id": 4,
    "name": "Mia",
    "email": "mia@yahoo.com",
    "role": "admin"
}
```

If id does't exist in database will response with 404 and a message:

```
{
    "message": "Id not found"
}
```

If unsuccessful, response should be 500

In case the token is not present in the header it will respond with:

```
{
    "message": "Invalid Credentials"
}
```

## EDIT (PUT) User

URL: /api/users/:id

Nothing required, can change as few or as many things as wanted.

Example: Changing user 's `username` from Alex to Alexandru, and `email` from alex@yahho.com to newEmail@yahoo.com

```
{
    "name": "Alexadru",
    "email": "newEmail@yahoo.com
}
```

A successful post will return the updated user ID and a message. For example, the above edit will return:

```
{
    "updateID": "2",
    "message": "User: Alexandru Update succesfully"
}
```

If user with specified ID does't exist in database will response with 404 and a message:

```
{
    "message": "User not found"
}
```

If unsuccessful, response should be 500 and a message:

```
{
    "error": "error trying to update user"
}
```

## DELETE User

URL: /api/users/:id

Nothing required, can change as few or as many things as wanted.

A successful delete will return a object with a message, for example deleting a user succesfully will return:

```
{
    "message": "Delete Succesfully"
}
```

If user with specified ID does't exist in database will response with 404 and a message:

```
{
    "message": "User not found"
}
```

## GET all Items/Inventory from database

URL: /api/users/:id/items

The respone will include the decoded tokend contains the id,email and role of the current user
This route is restricted - a authorization header with the token its required

Example Data for /api/users/items:

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
            "name": "Alexandru",
            "email": "newEmai@yahoo.com",
            "password": "123",
            "role": "volunteer"
        },
        {
            "id": 3,
            "name": "Maria",
            "email": "maria@yahoo.com",
            "password": "123",
            "role": "manager"
        }
    ],
    "decoded": {
        "subject": 2,
        "role": "manager",
        "email": "mihai@yahoo.com",
        "iat": 1555318714,
        "exp": 1555390714
    }
}
```

## GET Items by Id from database

URL: /api/users/items/:id

The respone will include the decoded tokend contains the id,email and role of the current user
This route is restricted - a authorization header with the token its required

Example Data for /api/users/items/2:

```
{
    "item": {
        "id": 2,
        "name": "carrots",
        "amount": 15,
        "unit": "lbs",
        "image": "https://i.imgur.com/NdX1vFQ.jpg",
        "categoryID": 1
    },
    "decodedToken": {
        "subject": 4,
        "role": "manager",
        "email": "cata@yahoo.com",
        "iat": 1555256198,
        "exp": 1555328198
    }
}
```

## POST Items

URL: /api/items

This route is restricted - a authorization header with the token its required

The API does not _require_ every section to be provided. Require fields: name and amout.

```
{
    "name":"Magic",
    "amount":"12 lbs"
}
```

A successfully created item will return a object with the posted item:

```
{
    "id": 13,
    "name": "Magic",
    "amount": "12 lbs",
    "unit": null,
    "image": null,
    "categoryID": null
}
```

## EDIT (PUT) Items

URL: /api/items/:id

This route is restricted - a authorization header with the token its required

The API does not _require_ every section to be provided. Front End architects may choose what is required on their descretion. Here is what a an edit with only the name changed will look like for user 2. Name, amount and category is being changed:

```
{
    "name": "pattato",
    "amount": 25,
    "unit": "lbs",
    "categoryID": 3
}
```

If succesfully the messege will be returned:

```
{
    "message": "Item pattato was succesfully edited"
}
```

## DELETE Items

URL: /api/items/:id

A successful delete will return a message:

```
{
    "message": "Item succesfully deleted"
}
```
