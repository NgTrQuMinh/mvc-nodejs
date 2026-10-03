const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    city: { type: String },
}, {
    _id: false
})

const taskSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },

    userSub: userSchema,
    projectID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
}, {
    timestamps: true
})

taskSchema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;