Setup:
1. Clone Repo.
2. Install docker, run it.
3. RUN  `cd cc_VinayAshok_BackendAPI`.
3. RUN `docker-compose up`.
4. Backend API is running on port 8080, the different API calls are listed below in order

## API Specs

### POST /api/v1/signup

Payload

```json
{
  "email": "test@axiomzen.co",
  "password": "axiomzen",
  "firstName": "Alex",
  "lastName": "Zimmerman"
}
```

Example Curl Call:
```json
curl --location --request POST 'http://localhost:8080/api/v1/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
   "email": "test@axiomzen.co",
  "password": "axiomzen",
  "firstName": "Alex",
  "lastName": "Zimmerman"
}'
```

Response:

```json
{
  "token": "some_jwt_token"
}
```

### POST /api/v1/login

Payload

```json
{
  "email": "test@axiomzen.co",
  "password": "axiomzen"
}
```

Example Curl Call:
```json
curl --location --request POST 'http://localhost:8080/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@axiomzen.co",
    "password": "axiomzen"
}'
```

Response:

```json
{
  "token": "some_jwt_token"
}
```

### GET /api/v1/users

Header

```json
{
  "x-authentication-token": "some_jwt_token",
}
```

Example Curl Call:
```json
curl --location --request GET 'http://localhost:8080/api/v1/users' \
--header 'x-authentication-token: some_jwt_token'
```

Response:

```json
{
  "users":[
    {
      "email":"test@axiomzen.co",
      "firstName":"Alex",
      "lastName":"Zimmerman"
    }
  ]
}

```


### PUT /api/v1/users

Header

```json
{
  "x-authentication-token": "some_jwt_token",
}
```

Payload

```json
{
  "firstName": "Axiom",
  "lastName": "Dapper"
}

```

Example Curl Call:
```json
curl --location --request PUT 'http://localhost:8080/api/v1/users' \
--header 'x-authentication-token: some_jwt_token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Zen",
    "lastName": "labs"
}'
```

No response message on Success just status 200, Error Response:  
```json
{
    "message": "Invalid/expired authentication token!"
}

```
