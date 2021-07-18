# Exam of Stark Tech

## Design

### Sequence Diagram

#### How to use API

<img src="/Users/monemo12/Documents/Docker Volumes/nginx/stark_tech_exam/documents/How to use API.png" alt="How to use API" style="zoom:50%;" />

#### How to upload and share a photo

<img src="/Users/monemo12/Documents/Docker Volumes/nginx/stark_tech_exam/documents/How to upload and share a photo.png" alt="How to upload and share a photo" style="zoom: 50%;" />

### Database

#### User

| Field    | Data Type | Description                 |
| -------- | --------- | --------------------------- |
| email    | string    | The email of user           |
| password | string    | The hashed password of user |



#### User > Photos

| Field       | Data Type | Description                       |
| ----------- | --------- | --------------------------------- |
| file_path   | string    | The file path of photo in storage |
| is_public   | boolean   | The stauts of public              |
| sharing_url | string    | The sharing url of public photo   |



---

## Environment

### Initilaization

`npm install`

### Runing on Local Environment

`npm run serve`

### Configuration

- Firebase Admin Key
  - Replace the file of `src/config/firebase-admin.json`
- Listening Port (Default: 3002)
  - Change the variable of `ConfigServer.port` in `src/config/server.ts`

---

## APIs

- Base URL:
- Add token in the header if required

### Register

| Path      | Method | Token        |
| --------- | ------ | ------------ |
| /register | POST   | Not Required |

#### Request Parameters

| Name     | Data Type | Description                                                  |
| -------- | --------- | ------------------------------------------------------------ |
| email    | string    | the email of user                                            |
| password | string    | the password of user. Using md5 method from `crypto-js` to hash the password before the request. |

#### Example of Request

```json
{
  "email": "test@gmail.com",
  "password": "..." // Hashed Password
}
```

#### Example of Response

##### - Succeeded

```json
{
  "status": "succeeded"
}
```

##### - Failed

```json
{
  "status": "failed",
  "message": "The email is exist."
}
```



### Login

| Path   | Method | Token        |
| ------ | ------ | ------------ |
| /login | POST   | Not Required |

#### Request Parameters

| Name     | Data Type | Description                                                  |
| -------- | --------- | ------------------------------------------------------------ |
| email    | string    | the email of user                                            |
| password | string    | the password of user. Using md5 method from `crypto-js` to hash the password before the request. |

#### Example of Request

```json
{
  "email": "test@gmail.com",
  "password": "..." // Hashed Password
}
```

#### Example of Response

##### - Succeeded

```json
{
  "status": "succeeded",
  "token": "..."
}
```

##### - Failed

```json
{
  "status": "succeeded",
  "message": "The email is not exist or the password is worng."
}
```



### Photo

#### Add Photo

| Path   | Method | Token    |
| ------ | ------ | -------- |
| /photo | POST   | Required |

#### Request Parameters

| Name | Data Type | Description       |
| ---- | --------- | ----------------- |
| file | binary    | the file of photo |

#### Example of Request

#### Example of Response

##### - Succeeded

```json

```

##### - Failed

```json
```



#### Set Photo Private/Public

| Path       | Method | Token    |
| ---------- | ------ | -------- |
| /photo/:id | PATCH  | Required |

#### Request Parameters

| Name      | Data Type | Description                |
| --------- | --------- | -------------------------- |
| is_public | boolean   | the public status of photo |

#### Example of Request

```json
{
  "is_public": true
}
```



#### Example of Response

##### - Succeeded

```json
{
  "status": "succeeded"
}
```

##### - Failed

```json
{
  "status": "failed",
  "message": "Not authorized."
}
```



#### Get a Photo's Sharing URL

| Path       | Method | Token    |
| ---------- | ------ | -------- |
| /photo/:id | GET    | Required |

#### Request Parameters

N/A

#### Example of Request

N/A

#### Example of Response

##### - Succeeded

```json
{
  "status": "succeeded"
}
```

##### - Failed

```json
{
	"status": "failed",
  "message": "Not authorized."
}
```



#### Delete Photo

| Path       | Method | Token    |
| ---------- | ------ | -------- |
| /photo/:id | DELETE | Required |

#### Request Parameters

N/A

#### Example of Request

N/A

#### Example of Response

##### - Succeeded

```json
{
  "status": "succeeded"
}
```

##### - Failed

```json
{
  "status": "failed",
  "message": "The photo is not exist."
}
```



---

## Test

- Register
  - If the email is not exist in database, it shoud create a user and response the succeeded status.
  - If the email is exist in database, it shoud response the failed status.
- Login
  - If use the email is not exist in database, it should response the succeeded status.
  - If use the email is exist and password is wrong, it should response the failed status.
  - If use the email is exist and password is right, it should response the succeeded status and token.
- Authenticate
  - If API call is without token in the header, it should response not authorized status.
  - If API call is with token in the header and the user is valid and the token is not expirate, it should be continue.
  - If API call is with token in the header and the user is invalid and the token is not expirate, it should response not authorized status.
  - If API call is with token in the header and the user is valid and the token is expirate, it should response not authorized status.
- User
  - Add Photo
    - If the size of photo is 0, it should response the failed status.
    - If the size of photo is not exceed 10 MB, it should create the record in database response the succeeded status
    - If the size of photo is exceed 10 MB, it should create the record in database response the succeeded status
    - If the type of a file is not image, it should response the failed status.
  - Set Photo Private/Public
    - If set existing and public/private photo to public, it should create a sharing url both in database and storage and response the succeeded status
    - If set existing and public/private photo to private, it should delete the sharing url both in database and storage and response the succeeded status.
  - Share Photo
    - If get the sharing url of a private photo, it should response the failed status.
    - If get the sharing url of a public photo, it should response the succeeded status.
    - If request the sharing url of a private photo, it should response the failed status.
    - If request the sharing url of a public photo, it should response the succeeded status and image.
    - If request the sharing url of a public photo which is not equal in database, it should response the failed status.
  - Delete Photo
    - If delete the photo is exist, it should delete the record in databse and the file in storage and response the succeeded status.
    - If delete the photo is not exist, it should response the failed status.

## 