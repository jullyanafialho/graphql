const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuidv4 = require('uuid/v4')


const adapter = new FileSync('db.json')
const db = low(adapter)

const create = (products) => {
  const cart = {
    id: uuidv4(),
    products
  }

  db.get('carts')
  .push(cart)
  .write()

  return cart

}

const getAll = () => {
  const response = db.get('carts')
  .value()

  return response
}

const getByID = (id) => {
  const response =  db.get('carts')
  .filter({ id: id })
  .value()

  const products = response.map((cart) => {
    return db.get('products')
    .find({ id: cart.product })
    .value()
  })

  console.log('products', products)
  return { id: id, products: products}
}

const addProduct = (product) => {
  const newItem = {
    id: uuidv4(),
    product: product.id
  }

  db.get('carts')
  .push(newItem)
  .write()

  return newItem
}

const deleteProduct = (product) => {
  db.get('carts')
  .remove( {product: product.id})
  .write()

  return product.id
}
module.exports = {
  create,
  getAll,
  getByID, 
  addProduct, 
  deleteProduct
}

