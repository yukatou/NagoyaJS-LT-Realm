const Realm = require('realm');
const moment = require('moment');
const bookSchema = require('./models/book');
const tagSchema = require('./models/tag');
const print = require('./libs/print');

const realm = new Realm({
  path: './database/app.realm',
  schema: [bookSchema, tagSchema],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {

    if (oldRealm.schemaVersion < 1) {
      console.log('start migration');

      let oldObjects = oldRealm.objects('Book');
      let newObjects = newRealm.objects('Book');

      for (let i = 0; i < oldObjects.length; i++) {
        let data = oldObjects[i].title.split(' ');
        newObjects[i].title = data[0];
        newObjects[i].volume = data[1];
      }
    }
  },
});

realm.close();
