import { faker } from '@faker-js/faker';
import Person from '../models/Person.js';

async function seedPeople() {
  await Person.bulkCreate(
    Array.from({ length: 100 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      registeredDate: faker.date.anytime(),
      isPrivate: Math.ceil(Math.random() * 10) > 5,
      createdAt: new Date(),
    }))
  );
}

export default seedPeople;
