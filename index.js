const express = require('express');
const graphqlHTTP = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express').default

const { schema, resolver }= require('./schemas/resolver');

const app = express()



app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }),
)

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))


app.listen(4000);