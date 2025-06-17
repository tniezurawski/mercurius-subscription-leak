import mercurius from 'mercurius';
import { makeExecutableSchema } from '@graphql-tools/schema';
const { withFilter } = mercurius;
import gql from 'graphql-tag';

import { data } from './data.js';

import { RedisPubSub } from 'graphql-redis-subscriptions';
const pubsub = new RedisPubSub();

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
  }

  type Query {
    authors: [Author!]!
  }

  type Subscription {
    authorAdded: Author
  }
`;

const resolvers = {
  Query: {
    authors: () => data,
  },
  Subscription: {
    authorAdded: {
      // Works fine. No memory leaks
      // subscribe: withFilter(
      //   (root, args, { pubsub }) => pubsub.subscribe('some_topic'),
      //   () => {
      //     return true;
      //   },
      // ),

      // Memory leak. Redis pubsub with asyncIterator from `graphql-redis-subscriptions`
      subscribe: withFilter(
        () => pubsub.asyncIterator('some_topic'),
        () => {
          return true;
        },
      ),
    },
  },
};

export function createSchema() {
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
}
