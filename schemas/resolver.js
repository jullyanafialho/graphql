const { buildSchema } = require("graphql");
const { create: createProduct , getAll: getAllProducts, getByID: getProdyctByID } = require('../models/product')
const { create: createCart , getAll: getAllCarts, getByID: getCartByID, addProduct, deleteProduct } = require('../models/cart')

const data = [
  { 
    id: 1,
    name: 'Feijão',
    price: 35.3,
  }
]

const schema = buildSchema(`
  type Product {
    id: ID
    name: String
    price: Float
    cart: Cart
  }
  type Cart {
    id: ID
    products: [Product]
  }
  type Query {
    product(id: ID!): Product
    products: [Product]
    cart(id: ID!): Cart
    carts: [Cart]
  }
  type Mutation {
    createProduct(name: String!, price: Float!): Product
  }
  `)
  // createCart(products: [Product]!): Cart
  // addProduct(product: Product!): Cart
  // deleteProduct(product: Product!): Cart

const resolver = {
  product({ id }) {
    const product = getProdyctByID(id)
    return product
  },
  products() {
    return getAllProducts()
  },
  createProduct({ name, price }) {
    const newProduct = createProduct(name, price)
    return newProduct;
  },
  cart({ id }) {
    const cart = getCartByID(id)
    return cart
  },
  carts() {
    return getAllCarts()
  },
}

// createCart({ products }) {
//   const newCart = createCart(products)
//   return newCart;
// },
// addProduct({ product }) {
//   const newProduct = addProduct(product)
//   return newProduct;
// },
// deleteProduct({ product }) {
//   const deletedProduct = createCart(products)
//   return deletedProduct;
// },
module.exports = {
  resolver,
  schema
}