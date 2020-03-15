import express from 'express'
import { ApolloServer } from "apollo-server-express"
import models from "./models"
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import cors from 'cors'

let typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
let resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

let server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models }
})

let app = express()
app.use(cors('*'))
app.use(express.json())
server.applyMiddleware({ app })
models.sequelize.sync().then(() => {
    app.listen(8080, () => console.log('Slack running'))
})