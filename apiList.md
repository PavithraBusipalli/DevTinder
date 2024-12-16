# DevTinder APIs

## authRouter
- POST /signup
- POST /signin
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET /connections
- GET /request/received
- GET /feed - Gets you the profiles of other 
              users on platform

Status: ignore, interested, accepted, rejected