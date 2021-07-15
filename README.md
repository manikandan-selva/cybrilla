/readme.md

# **Ecommerce cart and discount**


## Description

Sample ecommerce application having features like add items to cart, create discount rules, apply discount rules automatically when item added to cart etc.

## Installation

```bash
$ npm install
```
- Add `.env` with values for variable in `.env.example`
- Run migrations.
```bash
$ npx sequelize-cli db:migrate
```
- Run seeders.
```bash
$ npm sequelize-cli db:seed:all
```

## Running the app

```bash
# development
$ npm run dev


# production mode
$ npm start
```
## API Details, content type for all apis application/json
- To get the products list
```js
GET http://localhost:2239/api/v1/product?limit=10&page=1

```

- To get the product information by ID
```js
GET http://localhost:2239/api/v1/product/:productId?limit=10&page=1
```

- To add the product
```js
POST http://localhost:2239/api/v1/product
```
{
"productName":"E",
"quantityAvailable":50,
"cost":100
}


- To update the product details
```js
PUT http://localhost:2239/api/v1/product
```
{
"productName":"E",
"quantityAvailable":55
}

- To get the product discount details
```js
GET http://localhost:2239/api/v1/product/discount
```

- To add the discount
```js
POST http://localhost:2239/api/v1/product/discount
```
{
    "productId":6,
    "quantity":3,
    "discountPercent":18
}


- To update or edit the discount
```js
PUT http://localhost:2239/api/v1/product/discount?productId=6
```

{
    "quantity":3,
    "discountPercent":15
}

- To add item to cart
```js
POST http://localhost:2239/api/v1/cart/item
```

{
    "userId":"User4",
    "cartId":1,
    "productId":1,
    "quantity":1

}

- To get items info for cart
```js
GET http://localhost:2239/api/v1/cart?userId=User4&cartId=1
```




