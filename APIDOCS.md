# API

> backned api routes

> [!NOTE]
> all the below routes should be prefixed with `/api`

> [!NOTE]
> every api responses will have two fields shown below 
```javascript
    {
        success: boolean,
        message: string
    }
```


## Routes
- [/auth](#auth) 
    - [/vendor/login](#vendor-login)
    - [/vendor/register](#vendor-register)
    - [/vendor/resetPassword](#vendor-reset-password)
    - [/vendor/forgotPassword](#vendor-forgot-password)
    - [/staff/login](#staff-login)
    - [/admin/login](#admin-login)

- [/vendor](#vendor) 
    - /
        - [`GET`](#get-vendor-details) 
        - [`PUT`](#update-vendor-details)

- [/staff](#staff)
    - /
        - [`GET`](#get-staff-details)
        - [`POST`](#create-a-staff-account)
    - /:id
        - [`GET`](#get-staff-details-by-id)
        - [`PUT`](#update-staff-account)
        - [`DELETE`](#delete-staff-account)

- [/subscribe](#subscribe)
    - /
        - [`POST`](#subscribe)
        - [`GET`](#get-subscription-details)
        - [/confirm](#confirm-subscription-payment)

- [/shop](#shop)
    - /
        - [`GET`](#get-shops-of-current-vendor)
        - [`POST`](#create-a-shop)
    - /:id
        - [`GET`](#get-shop-details-by-id)
        - [`PUT`](#edit-shop-details)
        - [`DELETE`](#delete-shop-by-id)
    - [/:id/products](#get-products-in-this-shop)
    - [/:id/bills](#get-staffs-in-this-shop)
    - [/:id/coupons](#get-coupons-in-this-shop)

- [/product](#product)
    - /
        - [`POST`](#create-a-product)
    - /:id
        - [`GET`](#get-product-details)
        - [`PUT`](#edit-product-details)
        - [`DELETE`](#delete-product)

- [/bill](#bill)
    - /
        - [`POST`](#create-bill)
    - /:id
        - [`GET`](#get-bill-details)
        - [`PUT`](#edit-bill-details)
        - [`DELETE`](#delete-bill)

- [/coupon](#coupon)
    - /
        - [`POST`](#create-a-coupon)
    - /:id
        - [`GET`](#get-coupon-by-id)
        - [`PUT`](#edit-coupon-details)
        - [`DELETE`](#delete-coupon-by-id)

- [/plan](#plan)
    - [`GET`](#get-active-plans)
    - [/:id](#get-active-plan-details)

- [/admin](#admin)
    - /vendor
        - [`GET`](#get-all-vendors)
        - /:id
            - [`GET`](#get-details-of-a-vendor-by-id)
    - /plan
        - [`GET`](#get-all-plans)
        - /:id
            - [`GET`](#get-plan-details-by-id)
            - [`PUT`](#update-a-plan)
            - [`DELETE`](#delete-a-plan)

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
            {}
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
            {}
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
            {}
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
                token: string
            }
        ```

### /vendor

#### get vendor details

- route: `/vendor`
- method: `GET`
- description: get current logged in vendors details
- request: 
    - header:
        ```javascript
            {
                authorization: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                vendor: VendorType
            }
        ```

#### update vendor details 

- route: `/vendor`
- method: `PUT`
- description: update details of the vendor account
- request:
    - header:
        ```javascript
            {
                authorization: string
            }
        ```
    - body:
        ```javascript
            {
                username: string
            }
        ```
- response: 
    - body:
        ```javascript
            {
                vendor: VendorType
            }
        ```

### /staff

#### get staff details

- route: `/staff`
- method: `GET`
- description: get staff details
- request:
    - header:
        ```javascript
            {
                authorization: string
            }
        ```
- response:
    - body:
        ```
            {
                staff: StaffType
            }
        ```

#### create a staff account

- route: `/staff`
- method: `POST`
- description: create a staff for a shop
- request:
    - body:
        ```javscript
            {
                username: string,
                password: string,
                shopId: string,
                manager: boolean
            }
        ```
- response:
    - body:
        ```javascript
            {
                staff: StaffType
            }
        ```

#### get staff details by id

- route: `/staff/:id`
- method: `GET`
- description: get details of the staff by give id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                staff: StaffType
            }
        ```

#### update staff account

- route: `/staff/:id`
- method: `PUT`
- description: update details of a staff account corresponding to the give staff id
- request: 
    - body:
        ```javascript
            {
                username: string,
                password: string,
                manager: boolean
            }
        ```
- response:
    - body:
        ```javascript
            {
                staff: StaffType
            }
        ```

#### delete staff account

- route: `/staff/:id`
- method: `DELETE`
- description: delete a staff account
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {}
        ```

### subscribe

#### create a subscribtion

- route: `/subscribe`
- method: `POST`
- description: create a subscribtion request
- request:
    - body:
        ```javascript
            {
                vendorId: string,
                planId: string,
                expireAt: string
            }
        ```
- resposne:
    - body:
        ```javascript
            {}
        ```

#### confirm subscription payment

- route `/subscribe/confirm`
- method: `POST`
- description: confirm the payment for subscription
- request:
    - body:
        ```javascript
           unknown
        ```
- response:
    - body:
        ```javascript
            unknown
        ```

#### get subscription details

- route `/subscribe`
- method: `GET`
- description: get details of the subscriptions of current vendor account
- request:
    - header:
        ```javascript
            {
                authorization: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                subscription: SubscriptionType
            }
        ```

### /shop

#### create a shop

- route: `/shop`
- method: `POST`
- description: create a shop
- request:
    - body: 
        ```javascript
            {
                name: string
                vendorId: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                shop: ShopType
            }
        ```

#### get shops of current vendor 

- route: `/shop`
- method: `GET`
- description: get shops managed by the currently logged in vendor
- request: 
    - header:
        ```javascript
            {
                authorization: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                shops: ShopType[]
            }
        ```

#### get shop details by id

- route: `/shop/:id`
- method: `GET`
- description: fetch details about the shop from the give shope id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                shop: ShopType
            }
        ```

####  edit shop details

- route: `/shop/:id`
- method: `PUT`
- description: edit details of the give shop
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
    - body:
        ```javascript
            {
                name: string
                image: string
                description: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                shop: ShopType
            }
        ```

#### delete shop by id

- route: `/shop/:id`
- method: `DELETE`
- description: delete the shop corresponding to the give shop id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {}
        ```

#### get products in this shop

- route: `/shop/:id/products`
- method: `GET`
- description: get all products in this shop
- request:
    - params:
        ```javascript{
            {
                id: string
            }
        ```
        
- response:
    - body:
        ```javascript
            {
                products: ProductType[]
            }
        ```

#### get staffs in this shop

- route: `/shop/:id/staffs`
- method: `GET`
- description: get all staffs assigned to this shop
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response: 
    - body:
        ```javascript
            {
                staffs: StaffType[]
            }
        ```

#### get coupons in this shop

- route: `/shop/:id/coupons`
- method: `GET`
- description: get all coupons in this shop
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                coupons: CouponsType[]
            }
        ```

### /product

> product related details

#### create a product

- route: `/product`
- method: `POST`
- description: create a product
- request:
    - body:
        ```javascript
        {
          name: string,
          shopId: string,
          price: number,
          stock: number,
          barcode: number,
          profit: number,
        }
        ```
- response:
    - body:
        ```javascript
            {
                product: ProductType
            }
        ```

#### get product details

- route: `/product/:id`
- method: `GET`
- description: get details of a product by its id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                product: ProductType
            }
        ```

#### edit product details

- route: `/product/:id`
- method: `PUT`
- description: update details of the give product by id
- request:
    - body:
        ```javascript
            {
                name: string,
                shopId: string,
                price: number,
                stock: number,
                barcode: number,
                profit: number,
            }
        ```
- response:
    - body:
        ```javascript
            {
                product: ProductType
            }
        ```

#### delete product

- route: `/producr/:id`
- method: `DELETE`
- description: delete a product by id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {}
        ```

### /bill

#### create bill

- route: `/bill`
- method: `POST`
- descriptoin: create a bill
- request:
    - body:
        ```javascript
            {
                staffId: string,
                shopId: string,
                products: string[],
                total: number,
                discount: number,
                totalAterDiscount: number
            }
        ```
- response:
    - body:
        ```javascript
            {
                bill: BillType
            }
        ```

#### get bill details

- route: `/bill/:id`
- method: `GET`
- description: get details of the bill by give id
- request: 
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                bill: BillType
            }
        ```

#### edit bill details

- route: `/bill/:id`
- method: `PUT`
- description: update the details of the bill corresponding to the give id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
    - body:
        ```javascript
            {
                products: string[],
                total: string,
                discount: string,
                totalAfterDiscount: number
            }
        ```
- response:
    - body:
        ```javascritp
            {
                bill: BillType
            }
        ```

#### delete bill

- route: `/bill/:id`
- method: `DELETE`
- description: delete a bill corresponding to the bill id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {}
        ```

### /coupon

#### create a coupon 

- route: `/coupon`
- method: `POST`
- description: create a coupon
- request:
    - body:
        ```javascript
            {
                shopId: string,
                discount: number,
                expiresAt: date
            }
        ```
- response:
    - body:
        ```javascritp
            {
                coupon: CouponType
            }
        ```

#### get coupon by id

- route: `/coupon/:id`
- method: `GET`
- description: get details of the coupon by id
- request: 
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                coupon: CouponType
            }
        ```

#### edit coupon details

- route: `/coupon/:id`
- method: `PUT`
- description: edit details of the give coupon
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
    - body:
        ```javascript
            {
                claimed: boolean,
                discount: number,
                billUsedIn: string,
                expireAt: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                coupon: CouponType
            }
        ```

#### delete coupon by id

- route: `/coupon/:id`
- method: `DELETE`
- description: deletea a coupon by id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {}
        ```

### /plan

#### get active plans

- route: `/plan`
- method: `GET`
- description: get all the active plans
-  response:
    - body:
        ```javascript
            {
                plans: PlanType[]
            }
        ```

#### get active plan details

- route: `/plan/:id`
- method: `GET`
- description: get details of an active plan by id
- request: 
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                plan: PlanType
            }
        ```

### /admin

#### get all vendors

- route: `/admin/vendor`
- method: `GET`
- description: get all vendors
- response:
    - body:
        ```javascript
            {
                vendors: VendorType[]
            }
        ```

#### get details of a vendor by id

- route: `/admin/vendor/:id`
- method: `GET`
- description: get all details of a vendor
- request:
    - params:   
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                vendor: VendorType
            }
        ```

#### get all plans

- route: `/admin/plan`
- method: `GET`
- description: get all plans
- respones: 
    - body:
        ```javascript
            {
                plans: PlanType[]
            }
        ```

#### create a plan

- route: `/admin/plan`
- method: `POST`
- description: create a plan
- request:
    - body:
        ```javascript
            {
                name: string,
                description: string,
                price: string,
                discount: string,
                active: boolean,
                features: string[]
            }
        ```
- response:
    - body:
        ```javascript
            {
                plan: PlanType
            }
        ```

#### update a plan

- route: `/admin/plan/:id`
- method: `PUT`
- description: update a plan by id
- request:
    - body:
        ```javascript
            {
                name: string,
                descriptoin: string,
                price: number,
                discount: number,
                active: boolean,
                features: string[]
            }
        ```
- response:
    - body:
        ```javascript
            {
                plan: PlanType
            }
        ```

#### delete a plan

- route: `/admin/plan/:id`
- method: `DELETE`
- description: delete a plan by id
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- resposne:
    - body:
        ```javascript
            {}
        ```

#### get plan details by id

- route: `/admin/plan/:id`
- method: `GET`
- description: get details of a plan
- request:
    - params:
        ```javascript
            {
                id: string
            }
        ```
- response:
    - body:
        ```javascript
            {
                plan: PlanType
            }
        ```
