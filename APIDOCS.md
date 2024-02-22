# API

> backned api routes

> [!NOTE]
> all the below routes are prefixed with `/api`

> [!NOTE]
> every api response will have these two fields 
```javascript
    {
        success: boolean,
        message: string
    }
```


## Routes
- [/auth]() : 
    - [/vendor/login](#vendor-login)
    - [/vendor/register](#vendor-register)
    - [/vendor/resetPassword](#vendor-reset-password)
    - [/vendor/forgotPassword](#vendor-forgot-password)
    - [/staff/login]()
    - [/admin/login]()

- [/vendor]() : 
    - [/]()

- [/staff]():
- [/bill]():
- [/shop]():
- [/admin]():

### /auth

> auth related routes

#### vendor login

- route: `/auth/vendor/login`
- method: `POST`
- description: login route for vendor 
- request:
    - body: 
        ```javascript
            {
                email: string,
                password: string
            }
        ```
- response:
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
                token: string
            }
        ```

#### vendor register

- route: `/auth/vendor/register`
- method: `POST`
- description: login route for vendor 
- request:
    - body: 
        ```javascript
            {
                username: string,
                email: string,
                password: string,
                phone: string
            }
        ```
- response:
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
            }
        ```

#### vendor reset password

- route: `/auth/vendor/resetPassword`
- method: `POST`
- description:  change password of vendor account
- request:
    - body: 
        ```javascript
            {
                username: string,
                email: string,
                password: string,
                phone: string
            }
        ```
- response:
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
            }
        ```

#### vendor forgot password

- route: `/auth/vendor/forgotPassword`
- method: `GET`
- description:  request to change password when forgotten
- request:
    - body: 
        ```javascript
            {
                email: string,
            }
        ```
- response:
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
            }
        ```

#### staff login

- route: `/auth/staff/login`
- method: `POST`
- description: login route for staff
- request:
    - body: 
        ```javascript
            {
                email: string,
                password: string
            }
        ```
- response:
    - body: 
        ```javascript
            {
                success: boolean,
                message: string,
                token: string
            }
        ```
####  admin login

- route: `/auth/admin/login`
- method: `POST`
- description: login route for admin
- request:
    - body:
        ```javascript
            {
                username: string,
                password: string
            }
        ```
- response: 
    - body:
        ```javascript
            {
                success:boolean,
                message:string,
                token: string
            }
        ```

### /vendor
### /staff
### /shop
### /product
### /bill
### /admin
