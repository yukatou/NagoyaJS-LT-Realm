module.exports = {
  name: 'Tag',
  properties: {
    id: 'string',
    name: { type: 'string', indexed: true },
  },
  primaryKey: 'id',
};