const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const customersSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    description: { type: String },
    image: { type: String }
}, {
    timestamps: true
});

customersSchema.plugin(mongoose_delete, {
    overrideMethods: "all",
    deletedAt: true,
    deletedBy: true,
    indexFields: 'all',
    validateBeforeDelete: false,
    validateBeforeRestore: false,
    use$neOperator: true,
})

const Customer = mongoose.model('Customer', customersSchema);

module.exports = Customer;