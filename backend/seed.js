// server/seed.js
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');
require('dotenv').config();

const coupons = [
  { code: 'COUPON1' }, { code: 'COUPON2' }, { code: 'COUPON3' },
  { code: 'COUPON4' }, { code: 'COUPON5' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Coupon.deleteMany({});
    await Coupon.insertMany(coupons);
    console.log('Coupons seeded');
    mongoose.connection.close();
  });