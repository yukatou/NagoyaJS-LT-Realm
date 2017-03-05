const Realm = require('realm');
const moment = require('moment');
const shortid = require('shortid');
const constants = require('./constants');
const bookSchema = require('./models/book');
const tagSchema = require('./models/tag');

// realm インスタンス生成
const realm = new Realm({
  path: './database/app.realm',
  schema: [bookSchema, tagSchema],
});

// realmに入れるデータ
const data = [
  {
    title: 'ドラゴンボール 1巻',
    publishedAt: '1998-11-20',
    tags: ['格闘', 'JUMP']
  },
  {
    title: 'こち亀 1巻',
    publishedAt: '1980-03-01',
    tags: ['ギャグ', '警察官', 'JUMP']
  },
  {
    title: 'ワンピース 1巻',
    publishedAt: '2004-10-10',
    tags: ['海賊', '格闘', 'JUMP']
  },
];

for (row of data) {

  //
  // トランザクション開始
  //
  realm.write(() => {

    // BookデータをInsertする
    let book = realm.create('Book', {
      id: shortid.generate(),
      title: row.title,
      publishedAt: moment(row.publishedAt).toDate(),
    });

    for (tagname of row.tags) {

      // タグが既にあるか調べる
      let tag = realm.objects('Tag').filtered('name = $0', tagname)[0];

      if (!tag) {
        // タグが無ければInsertする
        tag = realm.create('Tag', {
          id: shortid.generate(),
          name: tagname,
        });
      }

      // Bookとタグを関連づける
      book.tags.push(tag);
    }
  });
}


console.log("done.");
realm.close();