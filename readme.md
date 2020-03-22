# URL Shortener API

Just messing around with Express.js

## Features

- You can shorten your URLs, but because, I don't have money yet, you can only use the service via localhost.

- Number of click count

- Details of each client click(OS, browser type, mobile or desktop). Only the admins can see this in the DB, it's never sent to the client

## Usage

- `npm install`, 
- create your .env file and add your MONGO_URI and jsonwebtoken(later) details, 
- `npm run dev`


## Todos

- Users can sign up, login.

- Users can see the number of clicks their links have had along with some info about of each device that made a click.

- Users can revoke a link, change it's destination.

- Only authenticated users can do the above two. Visitors can only shorten links and be given back these shortened links.

- Build a React FE to bring this API to life.

- Deploy and buy a domain name whenever I have spare cash.
