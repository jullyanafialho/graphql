const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuidv4 = require('uuid/v4')


const adapter = new FileSync('db.json')
const db = low(adapter)

const create = (name, price) => {
  const product = {
    id: uuidv4(),
    name,
    price
  }

  const response = db.get('products')
  .push(product)
  .write()

  return product

}

const getAll = () => {
  const response = db.get('products')
  .value()

  return response
}

const getByID = (id) => {

  console.log('id', id)
  const response =  db.get('products')
  .find({ id: id })
  .value()
  console.log('response', response)
  return response
}
module.exports = {
  create,
  getAll,
  getByID
}

