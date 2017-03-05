const util = require('util');

// デバッグ用
const print = (obj) => {
  console.log(util.inspect(obj, false, null));
};

module.exports = print;