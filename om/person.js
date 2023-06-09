import { Entity, Schema } from 'redis-om';
import client from './client.js';

class Person extends Entity { }

/* create a Schema for Person */
const personSchema = new Schema(Person, {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: { type: 'number' },
    verified: { type: 'boolean' },
    location: { type: 'point' },
    locationUpdated: { type: 'date' },
    skills: { type: 'string[]' },
    // If you have defined a field with a type of 'text' in your schema,
    // you can perform full-text searches against it
    personalStatement: { type: 'text' },
});

/* use the client to create a Repository just for Persons */
export const personRepository = client.fetchRepository(personSchema);

/* create the index for Person */
await personRepository.createIndex();
