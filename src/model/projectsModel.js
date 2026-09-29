const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const customersSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
}, {
    timestamps: true,
    _id: false
});

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    city: { type: String },
}, {
    timestamps: true,
    _id: false
})


const projectsSchema = new mongoose.Schema({
    name: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    customerInfor: customersSchema,
    leader: userSchema,
    userSchema: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Tham chiếu tới Model User
    }],
    taskSchema: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task' // Tham chiếu tới Model Task
    }]
}, {
    timestamps: true
});

projectsSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true });

const Project = mongoose.model('Project', projectsSchema);

module.exports = Project;