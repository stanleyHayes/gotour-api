const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

RegionSchema.virtual('touristsites', {
  localField: '_id',
  foreignField: 'region',
  justOne: false,
  ref: 'Touristsite',
});

const Region = mongoose.model('Region', RegionSchema);

module.exports = Region;
