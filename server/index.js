import express from 'express'
import { ApolloServer } from "apollo-server-express"
import typeDefs from './schema'
import resolvers from './resolvers'

let server = new ApolloServer({
    typeDefs,
    resolvers
})

let app = express()
app.use(express.json())
server.applyMiddleware({ app })
app.listen(8080, () => console.log('Slack running'))