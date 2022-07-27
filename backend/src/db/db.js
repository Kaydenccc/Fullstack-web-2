const mongoose = require('mongoose');
const db_url = 'mongodb://127.0.0.1:27017/';
exports.connect = async () => {
  await mongoose.connect(db_url, { dbName: 'BlogDB' });
};
