#API ROUTES

### USER ROUTES

| +/- | Command  | Path                             | Example                     | Description                                                 |
| --- | -------- | -------------------------------- | --------------------------- | ----------------------------------------------------------- |
| +   | [GET]    | 'api/users/'                     |                             | Returns all users in the DB                                 |
| +   | [GET]    | 'api/users/:id'                  | 'api/users/1'               | Returns user by user ID                                     |
| +   | [GET]    | 'api/users/class/:userClass'     | 'api/users/class/2'         | Returns all users in :userClass (admin, user, probationary) |
| +   | [GET]    | 'api/users/validated/:validated' | 'api/users/validated/false' | Returns users by activated status (true / false)            |
| +   | [POST]   | 'api/users/newUser'              |                             | Creates a new user                                          |
| +   | [PUT]    | 'api/users/update'               |                             | Updates a user                                              |
| +   | [DELETE] | 'api/users/delete'               |                             | Deletes a user                                              |

### EVENTS ROUTES

| +/- | Command  | Path                                  | Description                                                     |
| --- | -------- | ------------------------------------- | --------------------------------------------------------------- |
| +   | [GET]    | 'api/events'                          | Returns all events in the DB based off of userClass in req.body |
| +   | [POST]   | 'api/events'                          | Creates a new event                                             |
| +   | [DELETE] | 'api/events'                          | Deletes an event                                                |
| +   | [GET]    | 'api/events/byUser/:userId'           | Returns all events by owner ID (userId)                         |
| +   | [GET]    | 'api/events/:eventId'                 | Returns event by ID                                             |
| +   | [POST]   | 'api/events/:eventId/'                | Creates a new group under eventId                               |
| +   | [GET]    | 'api/events/:eventId/activate'        | Returns activated status of event                               |
| -   | [PUT]    | 'api/events/:eventId/activate'        | Changes activated status - payment callback url                 |
| +   | [GET]    | 'api/events/:eventId/groups'          | Returns all groups within specified event                       |
| +   | [GET]    | 'api/events/:eventId/groups/:groupId' | Returns all users subscribed to a group                         |
| +   | [POST]   | 'api/events/:eventId/groups/:groupId' | Adds subscriber to group                                        |
| +   | [PUT]    | 'api/events/:eventId/groups/:groupId' | Edits info of a group under eventId                             |
| -   | [DELETE] | 'api/events/:eventId/groups/:groupId  | Deletes a group out of an event                                 |

