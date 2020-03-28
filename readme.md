# URL Shortener API

Just messing around with Express.js

## Features

- You can shorten your URLs

- Login to your account/Register

- Authenticated users can view the number of clicks their links have, info about users that clicked the links like OS, device, date and time they clicked

- Authenticated users can revoke(delete) and change destination of their links


## Usage

- run `npm install`, 
- create your `.env` file and add your MONGO_URI, BASE_LINK and JWT_SECRET variables, 
- when running locally, you could set your BASE_LINK variable to "http://127.0.0.1:5000" since I set the app to run on port 5000 locally.
- run `npm run dev`

## Endpoints 

|  Request  | Output  |
| ------------ | ------------ |
|  /api/auth GET | Returns currently signed in(authenticated) user |
|  /api/auth POST | Login a user and return a jsonwebtoken |
|  /api/users POST | Register a user |
|  /:linkID GET | Redirects to destination link. linkID is the unique short ID of the link |
|  /api/urls GET(private) | Returns all the created links of an authenticated user  |
|  /api/urls/:linkID GET(private) | Returns matched link of an authenticated user  |
|  /api/urls POST | create a shortened link |
|  /api/urls PUT(private) | change the destination of link |
|  /api/urls DELETE(private) | revoke/delete a link |

## Todos

- authenticated users should be able to customize their short links.

- Build a React FE to bring this API to life.

- Deploy and buy a domain name whenever I have spare cash.
