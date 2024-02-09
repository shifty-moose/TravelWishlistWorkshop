import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    alpha2: {
      type: String,
      required: true
    },
    alpha3: {
      type: String,
      required: true
    },
    visited: {
      type: Boolean,
      required: true
    }
});

const Country = mongoose.model('Country', countrySchema);

export default Country;