# Photo-Studio
Node JS, Express API for storing images. 

Valid access_token as QS parameter is required for each request. 

### Request for inserting new photo

POST: /user/me/photo 

### Request for updating existing photo by id

PUT: /user/me/photo/:id 

### Request for deleting existing photo by id

DELETE: /user/me/photo/:id 

### Request for getting one photo

GET: /user/me/photo/:id

### Request for getting own photos

GET: /user/me/photo 

### Request for getting other user or followee user photos

GET: /user/:id/photo 