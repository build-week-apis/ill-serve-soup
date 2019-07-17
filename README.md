# <p align="center" style="color: green" size="40"> I'll Serve Soup Backend</p>

<p align="center">
  <img src="soup.png" width="190" alt="I'll serve soup">
</p>

# About

This is the back-end for the I'll serve soup, which is part of Lambda School Build Week Project.

# Instructions

All API requests are made to: **Not yet deployed**

This api is using **https://sendgrid.com/** for sending emails.

If a Item amount is 0 the API will automatically send a messege to supplier with a messege

## Roles

-   admin
-   manager
-   volunteer

```
  to: 'supplier@example.com',
  from: 'currentUser@example.com',
  subject: 'Bananas out of stock',
  text: 'Need more Bananas!!',
```

## REGISTER (POST) User

**Access:** All

a **POST** request to _/api/users/register_ will create a new user and return an object

`email must be in the form: anystring@anystring.anystring`

if not server will respond with :

```
{
    "message": "Please provide correct email for the user. Ex: anystring@anystring.anystring"
}
```

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

**Access:** All

a **POST** request to \_/api/users/login will return an object

URL: /api/users/login

Form will need `email` and `password`. If posted correctly, should get a response of:

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

---

## GET ALL Users

**Access:** manager, admin

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

**Access:** All

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

**Access:** All

URL: /api/users/:id

Nothing required, can change as few or as many things as wanted.

Example: Changing user's `name` from Alex to Alexander, and `email` from alex@yahoo.com to newEmail@yahoo.com

```
{
    "name": "Alexander",
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

**Access:** All

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

---

## GET all Items/Inventory from database

**Access:** All

URL: /api/users/items

The respone will include the decoded tokend contains the id,email and role of the current user
This route is restricted - a authorization header with the token its required

Example Data for /api/items:

```

{
    "items": [
        {
            "id": 1,
            "name": "Stone fruit",
            "amount": 12,
            "unit": "lbs",
            "price": 6.3,
            "supplier_name": "Est products",
            "supplier_contact": "est@yahoo.com",
            "image": "https://i.imgur.com/SCAVfIV.jpg",
            "categoryID": 2
        },
        {
            "id": 2,
            "name": "carrots",
            "amount": 15,
            "unit": "lbs",
            "price": 2.3,
            "supplier_name": "Nord products",
            "supplier_contact": "nord@yahoo.com",
            "image": "https://i.imgur.com/NdX1vFQ.jpg",
            "categoryID": 1
        },
        {
            "id": 3,
            "name": "cereal",
            "amount": 3,
            "unit": "gal",
            "price": 13.2,
            "supplier_name": "First products",
            "supplier_contact": "first@yahoo.com",
            "image": "https://i.imgur.com/dGWUJEj.jpg",
            "categoryID": 4
        }
    ],
    "decodedToken": {
        "subject": 4,
        "role": "manager",
        "email": "test@yahoo.com",
        "iat": 1555417996,
        "exp": 1555489996
    }
}
```

## GET Items by Id from database

**Access:** All

URL: /api/items/:id

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
        "price": 2.3,
        "supplier_name": "Nord products",
        "supplier_contact": "nord@yahoo.com",
        "image": "https://i.imgur.com/NdX1vFQ.jpg",
        "categoryID": 1
    },
    "decodedToken": {
        "subject": 4,
        "role": "manager",
        "email": "test@yahoo.com",
        "iat": 1555417996,
        "exp": 1555489996
    }
}
```

## Add (POST) Items to inventory

**Access:** All

URL: /api/items

This route is restricted - a authorization header with the token its required

The API does not _require_ every section to be provided.

Required fields:

-   name(string)
-   amount(integer)
-   unit(string).

```

{
    "name":"soup",
    "amount": 5,
    "unit": "gallons"
}

```

A successfully created item will return a object with the posted item:

```
{
    "id": 8,
    "name": "Magic",
    "amount": "12 lbs",
    "unit": "kg",
    "price": null,
    "supplier_name": null,
    "supplier_contact": null,
    "image": "slsls",
    "categoryID": 2
}
```

## EDIT (PUT) Items

**Access:** All

URL: /api/items/:id

This route is restricted - a authorization header with the token its required

The API does not _require_ every section to be provided. Front End architects may choose what is required on their discretion. Here is what a an edit with only the name changed will look like for user 2. Name, amount and category is being changed:

```

{
    "name": "potato",
    "amount": 25,
    "unit": "lbs",
    "categoryID": 3
}

```

If succesfully the message will be returned:

```

{
    "message": "Item potato was succesfully edited"
}

```

## DELETE (DELETE) Items

**Access:** All

URL: /api/items/:id

A successful delete will return a message:

```
{
    "message": "Item succesfully deleted"
}
```

---

## GET all Categoris from database

**Access:** All

URL: /api/categories

The respone will include the decoded tokend contains the id,email and role of the current user
This route is restricted - a authorization header with the token its required

Example Data for /api/categories:

```
{
    "categories": [
        {
            "id": 1,
            "name": "chicken"
        },
        {
            "id": 2,
            "name": "fruits"
        },
        {
            "id": 3,
            "name": "herbal"
        },
        {
            "id": 4,
            "name": "proteins"
        },
        {
            "id": 5,
            "name": "cream"
        },
        {
            "id": 6,
            "name": "instant"
        },
        {
            "id": 7,
            "name": "noodle"
        },
        {
            "id": 8,
            "name": "fish"
        },
        {
            "id": 9,
            "name": "bread"
        },
        {
            "id": 10,
            "name": "Bisque"
        }
    ],
    "decodedToken": {
        "subject": 4,
        "role": "manager",
        "email": "test@yahoo.com",
        "iat": 1555417996,
        "exp": 1555489996
    }
}
```

If name field are not preset it will return a object with message:

```
{
    "error": "please provide a name for the category"
}

```

## EDIT (PUT) Categories

**Access:** All

URL: /api/categories/:id

Nothing required, can change as few or as many things as wanted.

Example: Changing category 's `name` from fish to bird

```

{
    "name": "bird",
}

```

A successful post will return the updated user ID and a message. For example, the above edit will return:

```

{
    "message": "Category: bird was update succesfully"
}

```

If category with specified ID does't exist in database will response with 404 and a message:

```

{
    "message": "Category not found"
}

```

If unsuccessful, response should be 500 and a message:

```

{
    error: "error trying to edit category"
}

```

## DELETE Category

**Access:** All

URL: /api/categories/:id

Nothing required, can change as few or as many things as wanted.

A successful delete will return a object with a message, for example deleting a category succesfully will return:

```

{
    "message": "Category succesfully deleted"
}

```

If Category with specified ID does't exist in database will response with 404 and a message:

```

{
    "message": "Category id not found"
}

```

---

## GET all Kitchens Soup Restaurants from database

**Access:** All

URL: /api/kitchens

Nothing required, anybody can access this endpoint

Example Data for /api/kitchens:

```
[
    {
        "id": 1,
        "name": "The Soup Kitchen",
        "location": "123 Smith Street, Brunswick, VIC, 3056",
        "mission": "Established in 1983, The Soup Kitchen Inc. is a 501 (c)(3) non-profit organization whose goal is to help the less fortunate members of our community.  This includes the elderly, unemployed, underemployed, poor, migrants and homeless – women, men and children",
        "average_visitors": 2.4,
        "website": "www.thesoupkitchen.com"
    },
    {
        "id": 2,
        "name": "The Soup Compasion",
        "location": "Via Garibaldi 123, 00100 Roma\t",
        "mission": "All of the Compassion Soup Kitchen’s mahi is guided by our vision, mission and values. We strive to ensure our service best fits the needs of people in our community, and honour our mission. We evaluate new and existing services against our vision and mission, and use our values to carry out this work",
        "average_visitors": 6.4,
        "website": "www.thesoupcompasion.com"
    },
    {
        "id": 3,
        "name": "Treton Soup Kitchen",
        "location": "Javorová 33/A, 123 45 Bratislava 2\t",
        "mission": "With a strong infrastructure managed by a committed and engaged Board and staff, TASK will expand its ability to reach the hungry in the Trenton area and those with the aspiration or responsibility to serve them.",
        "average_visitors": 8.6,
        "website": "www.tretonkitchen.com"
    }
]

```

If unsuccessful, response should be 500 and a message:

```

{
    error: "error trying to get all kitchens from database"
}

```

## GET Kitchen Soup by Id from database

**Access:** All

URL: /api/kitchens/:id

Nothing required, anybody can access this endpoint

Example Data for /api/kitchens/:id

```

{
    "kitchen": {
        "id": 2,
        "name": "The Soup Compasion",
        "location": "Via Garibaldi 123, 00100 Roma\t",
        "mission": "All of the Compassion Soup Kitchen’s mahi is guided by our vision, mission and values. We strive to ensure our service best fits the needs of people in our community, and honour our mission. We evaluate new and existing services against our vision and mission, and use our values to carry out this work",
        "average_visitors": 6.4,
        "website": "www.thesoupcompasion.com"
    }
}

```

If Kitchen with specified ID does't exist in database will response with 404 and a message:

```

{
    "message": "Id not found"
}

```

## POST a Kitchen Soup to database

URL: /api/kitchens

Nothing required, anybody can access this endpoint

The API _require_ require fields:

-   name(string),
-   location(string)
-   mission(string)
-   average_visitors(string)
-   website (string)

```

{
    "name":"Best Soup Kitchen",
    "location":"445 Mount Eden Road, Mount Eden, Auckland",
    "mission":" Mission Possible is about the best practices that have changed peoples’ lives for the better through a soup kitchen. Here’s the model. Make a difference!",
    "average_visitors": 50,
    "website": "https://www.coolkitchen.com"
}

```

A successfully created item will return a object with the posted item:

```

{
    "id": 5,
    "name": "Best Soup Kitchden",
    "location": "445 Mount Edden Road, Mount Eden, Auckland",
    "mission": " Mission Possdible is about the best practices that have changed peoples’ lives for the better through a soup kitchen. Here’s the model. Make a difference!",
    "average_visitors": 50,
    "website": "https://www.coolkitchen.com"
}

```

## EDIT (PUT) Kitchens

URL: /api/kitchens/:id

Nothing required, can change as few or as many things as wanted.

Example: Changing category 's `name` and `mission` from fish to bird

```

{
    "name":"new name",
    "mission":"new mission"
}

```

A successful post will return the updated kitchen name with a message. For example, the above edit will return:

```

{
    "message": "new name was succesfully edited"
}

```

If kitchen with specified ID does't exist in database will response with 404 and a message:

```

{
    message: "Kitchen not found"
}

```

If unsuccessful, response should be 500 and a message:

```

{
    "error trying to edit the kitchen"
}

```

## DELETE Kitchen by ID

**Access:** All

URL: /api/categories/:id

Nothing required, can change as few or as many things as wanted.

A successful delete will return a object with a message, for example deleting a kitchen succesfully will return:

```

{
    "message": "Kitchen succesfully deleted"
}

```

If Category with specified ID does't exist in database will response with 404 and a message:

```

{
    "message": "Kitchen not found"
}

```
