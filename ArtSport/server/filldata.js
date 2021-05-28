// server > filldata.js
const faker = require('faker');

const database = {
  artItems: []
};

for (let i = 1; i <= 5; i++) {
  database.artItems.push({
    id: i,
    name: faker.name.findName(),
    imageUrl: faker.image.avatar(),
    localisation: faker.address.longitude() + "," + faker.address.latitude(),
    grade: Math.floor(Math.random() * (5 - 1)) + 1,
  });
}

console.log(JSON.stringify(database));
