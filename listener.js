const Realm = require('realm');
const moment = require('moment');
const shortid = require('shortid');
const bookSchema = require('./models/book');
const tagSchema = require('./models/tag');
const print = require('./libs/print');

const realm = new Realm({
  path: './database/app.realm',
  schema: [bookSchema, tagSchema],
});

//
// Bookが更新されたことを検知する
//
realm.objects('Book').addListener((books, changes) => {

  // bookが追加されたら
  changes.insertions.forEach((index) => {
    console.log("inserted");
    print(books[index]);
  });

  // bookが更新されたら
  changes.modifications.forEach((index) => {
    console.log("modified");
    print(books[index]);
  });

  // bookが削除されたら
  changes.deletions.forEach((index) => {
    console.log("deleted");
  });

});


let book;

//
// 新規追加
//
realm.write(() => {
  book = realm.create('Book', {
    id: shortid.generate(),
    title: 'ハンターハンター １巻',
    publishedAt: moment('2014-01-01').toDate(),
  });
});

//
// 更新
//
realm.write(() => {
  book.title = "ハンターハンター ２巻";
});

//
// 削除
//
realm.write(() => {
  realm.delete(book);
});




// リスナーの解除
realm.removeAllListeners();
realm.close();