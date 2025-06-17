'use strict';

import Fastify from 'fastify';
import mercurius from 'mercurius';
import { createSchema } from './create-schema.js';

const schema = createSchema();

const app = Fastify();

app.register(mercurius, {
  schema,
  subscription: true
});

await app.listen({
  port: 3000,
});
console.log('Server listening on port 3000');


/*
# Messaging

## Connect init msg
{ "type": "connection_init", "payload": {}}

## Subscribe
{
    "id": "67b2ac0f-1f21-480b-8f96-b306658d269e",
    "type": "subscribe",
    "payload": {
        "variables": {},
        "extensions": {},
        "operationName": "authorAdded",
        "query": "subscription authorAdded {\n  authorAdded {\n    id    \n    __typename\n  }}"
    }
}

## Unsubscribe
{
    "id": "67b2ac0f-1f21-480b-8f96-b306658d269e",
    "type": "complete"
}
*/
