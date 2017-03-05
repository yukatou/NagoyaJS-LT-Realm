const Realm = require('realm');
const moment = require('moment');
const bookSchema = require('./models/book');
const tagSchema = require('./models/tag');
const print = require('./libs/print');

const realm = new Realm({
  path: './database/app.realm',
  schema: [bookSchema, tagSchema],
});

let books;

//
// 全件取得
//
books = realm.objects('Book');
// print(books);

//
// javascriptのobjectと同じように扱える
//
// let book = books[0];
// // print(book.title);

//
// 検索
//
books = realm.objects('Book').filtered('title CONTAINS $0', 'ワンピース');
// print(books);

//
// タグから検索
//
books = realm.objects('Book').filtered('tags.name = $0', '格闘');
// print(books);

//
// 件数指定
//
books = realm.objects('Book').slice(0, 2);
// print(books);

//
// ソート
//
books = realm.objects('Book').sorted('publishedAt', true);
// print(books);


// クローズ
realm.close();