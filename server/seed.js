// require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/imageUploadDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = require('./models');

const users = [
  { username: 'xyz', password: 'password' },
  { username: 'prem', password: 'password' },
];

const seed = async () => {
  try {
    await db.User.deleteMany({});
    console.log('DROP ALL USERS');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));
  } catch (err) {
    console.error(err);
  }
};

seed();