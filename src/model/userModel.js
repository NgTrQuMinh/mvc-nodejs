const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    city: { type: String },
})

userSchema.plugin(mongoose_delete, {
    overrideMethods: "all",
    deletedAt: true,
    deletedBy: true,
    indexFields: 'all',
    validateBeforeDelete: false,
    validateBeforeRestore: false,
    use$neOperator: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;