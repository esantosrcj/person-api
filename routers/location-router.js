import { Router } from 'express';
import { personRepository } from '../om/person.js';
import { connection } from '../om/client.js';

export const router = Router();

router.patch('/:id/location/:lng,:lat', async (req, res) => {
    const id = req.params.id;
    const longitude = Number(req.params.lng);
    const latitude = Number(req.params.lat);

    const locationUpdated = new Date();

    const person = await personRepository.fetch(id);
    person.location = { longitude, latitude };
    person.locationUpdated = locationUpdated;
    await personRepository.save(person);

    // NEEDS WORK: Storing location history with Streams
    let keyName = `${person.keyName}:locationHistory`;
    await connection.XADD(keyName, '*', person.location);

    res.send({ id, locationUpdated, location: { longitude, latitude } });
});
