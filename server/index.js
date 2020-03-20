import express from 'express'
import { ApolloServer } from "apollo-server-express"
import models from "./models"
import { refreshTokens } from './auth'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import cors from 'cors'

let dbFlush = false
let SECRET = 'thisIsSuperSecret'
let SECRET2 = 'thisIsSuperSecret2'

let typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
let resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

let app = express()
app.use(cors('*'))

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(express.json())

app.use(addUser);

let server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: {
  //   models,
  //   user: req.user,
  //   SECRET,
  //   SECRET2
  // },
  context: ({req, res}) => ({...req, ...res, models, user: req.user, SECRET, SECRET2})
})

server.applyMiddleware({ app })
models.sequelize.sync({ force: dbFlush }).then(() => {
  app.listen(8081, () => console.log('Slack running'))
})