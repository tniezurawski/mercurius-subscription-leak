import { faker } from '@faker-js/faker';

// that way data is consistent
faker.seed(4321);

function genData() {
  const authors = [];
  for (let i = 0; i < 20; i++) {
    authors.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    });
  }

  return authors;
}

export const data = genData();
