import express from 'express'
import { ApolloServer } from "apollo-server-express"
import typeDefs from './schema'
import resolvers from './resolvers'
import models from "./models"

let server = new ApolloServer({
    typeDefs,
    resolvers
})

let app = express()
app.use(express.json())
server.applyMiddleware({ app })
models.sequelize.sync({ force: true }).then(() => {
    app.listen(8080, () => console.log('Slack running'))
})