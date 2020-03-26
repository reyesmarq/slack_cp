import { PubSub, withFilter } from 'apollo-server-express'
import requiresAuth from '../permissions';

// if I need to use pubsub in a different resolvers, I would put this in a diffetent file and export it
const pubsub = new PubSub();

// Event name
const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE'

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => payload.channelId === args.channelId
      )
    }
  },
  Message: {
    // if of our message
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }),
  },
  Query: {
    messages: requiresAuth.createResolver(async (parent, { channelId }, { models, user }) => models.Message.findAll({ order: [['createdAt', 'ASC']], where: { channelId } }, { raw: true })),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const message = await models.Message.create({
          ...args,
          userId: user.id,
        });

        pubsub.publish(NEW_CHANNEL_MESSAGE, { channelId: args.channelId, newChannelMessage: message.dataValues })
        
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
