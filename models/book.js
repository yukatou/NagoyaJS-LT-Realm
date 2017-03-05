module.exports = {
  name: 'Book',
  properties: {
    id: 'string',
    title: 'string',
    volume: 'string',
    publishedAt: { type: 'date', indexed: true },
    tags: { type: 'list', objectType: 'Tag', default: [] },
  },
  primaryKey: 'id',
};