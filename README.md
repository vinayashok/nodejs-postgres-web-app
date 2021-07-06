Setup:
1. Clone Repo.
2. Install docker, run it.
3. RUN  `cd nodejs-postgres-web-app`.
3. RUN `docker-compose up`.
4. Backend API is running on port 8080, the different API calls are listed below in order

## API Specs

### POST /api/v1/signup

Payload

```json
{
  "email": "alex@gmail.com",
  "password": "alexhunt123",
  "firstName": "Alex",
  "lastName": "Hunt"
}
```

Example Curl Call:
```json
curl --location --request POST 'http://localhost:8080/api/v1/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
   "email": "alex@gmail.com",
  "password": "alexhunt123",
  "firstName": "Alex",
  "lastName": "Hunt"
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
  "email": "alex@gmail.com",
  "password": "alexhunt123"
}
```

Example Curl Call:
```json
curl --location --request POST 'http://localhost:8080/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "alex@gmail.com",
    "password": "alexhunt123"
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
      "email":"alexhunt@gmail.com",
      "firstName":"Alex",
      "lastName":"Warner"
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
  "firstName": "Alex",
  "lastName": "Hunt"
}

```

Example Curl Call:
```json
curl --location --request PUT 'http://localhost:8080/api/v1/users' \
--header 'x-authentication-token: some_jwt_token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Alex",
    "lastName": "Zen"
}'
```

No response message on Success just status 200, Error Response:  
```json
{
    "message": "Invalid/expired authentication token!"
}

```
