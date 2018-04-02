#API ROUTES

### USER ROUTES
| +/- | Command  | Path                           | Description                                                 |
| --- | -------- | ------------------------------ | ----------------------------------------------------------- |
| -   | [GET]    | 'api/users/'                   | Returns all users in the DB                                 |
| -   | [GET]    | 'api/users/:id'                | Returns user by user ID                                     |
| -   | [GET]    | 'api/users/class/:userClass'   | Returns all users in :userClass (admin, user, probationary) |
| -   | [GET]    | 'api/users/activated/:boolean' | Returns users by activated status (true / false)            |
| -   | [POST]   | 'api/users/newUser'            | Creates a new user                                          |
| -   | [PUT]    | 'api/users/update'             | Updates a user                                              |
| -   | [DELETE] | 'api/users/delete'             | Deletes a user                                              |


### EVENTS ROUTES
| +/- | Command  | Path                           | Description                                                 |
| --- | -------- | ------------------------------ | ----------------------------------------------------------- |
| -   | [GET]    | 'api/events/'                  | Returns all events in the DB                                |
| -   | [GET]    | 'api/events/:id'               | Returns event by ID                                         |
| -   | [GET]    | 'api/events/owner/:id          | Returns all events by owner ID (userId)                     |
| -   | [POST]   | 'api/events/newEvent           | Creates a new event                                         |
| -   | [DELETE] | 'api/events/delete             | Deletes an event                                            |
| -   | [GET]    | 'api/events/:id/activate       | Returns activated status of event                           |
| -   | [PUT]    | 'api/events/:id/activate       | Changes activated status - payment callback url             |
| -   | [POST]   | 'api/events/:id/newGroup       | Creates a new group under eventId                           |
| -   | [PUT]    | 'api/events/:id/editGroup      | Edits info of a group under eventId                         |
| -   | [DELETE] | 'api/events/:id/deleteGroup    | Deletes a group out of an event                             |
