# Photo-Studio
Node JS, Express API for storing images. 

## Setup

* install dependencies with $ npm install
* start the project with $ npm start

Valid access_token as QS parameter is required for each request. 

### Request for inserting new photo

POST: /user/me/photo 

### Request for updating photo by id

PUT: /user/me/photo/:id 

### Request for deleting photo by id

DELETE: /user/me/photo/:id 

### Request for getting one photo

GET: /user/me/photo/:id

### Request for getting own photos

GET: /user/me/photo 

### Request for getting other user or followee user photos

GET: /user/:id/photo 


The typical use cases are:

* user can sign in with facebook and submit images (gps coordinates is not implemented)
* fetch a photos's information
* update a photos's information
* delete a photo
* fetch all the photos of a given user (followee user or mine)

#### Used technologies

I have chosen 
* MongoDB - document-oriented database program  
* Mongoose - as ODM 
* [Google Cloud Storage](https://cloud.google.com/storage/) for storing and serving photos binary data
* [JSON Web Tokens](https://jwt.io/) for token based authentication
* REST API - for architecture of HTTP requests
* uuid - for unique image names

Notes:
* I have sent access_token as QS parameter as you have mentioned, but I'll prefer to send token with header of request
* actually client side is not implemented
