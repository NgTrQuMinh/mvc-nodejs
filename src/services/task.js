const Task = require('../model/taskModel');
const { default: aqp } = require('api-query-params');

module.exports = {
    getTasks: async (queryParams) => {
        try {
            const { filter, limit, sort, population } = aqp(queryParams, {
                blacklist: ['page']
            })
            const parsePage = parseInt(queryParams?.page, 10) || 1;
            const parseLimit = parseInt(limit, 10) || 10;
            const parseSkip = (parsePage - 1) * parseLimit;

            if (parsePage && parseLimit) {
                return await Task.find(filter)
                    .limit(parseLimit)
                    .sort(sort)
                    .skip(parseSkip)
                    .populate(population)
                    .lean()
                    .exec()
            }
            return await Task.find({}).lean().exec();
        } catch (error) {
            console.error('Lỗi getTasksServices -> ', error)
        }
    },

    createTasks: async (data) => {
        try {
            if (data.type === 'EMPTY-TASK') {
                return await Task.create(data);
            }
            if (data.type === 'ADD-PROJECTS') {
                const { TaskID, ProjectData } = data;
                console.log(data);
                const myTask = await Task.findById(TaskID);
                if (!myTask) {
                    return {
                        ErrCode: 1,
                        message: 'myTask?',
                    }
                }
                if (ProjectData.length >= 0) {
                    myTask.projectID.addToSet(...ProjectData);
                }
                const result = await myTask.save();
                return {
                    ErrCode: 0,
                    message: 'Add Project to Task OK!',
                    data: result
                };
            }
        } catch (error) {
            console.error('Lỗi createTasksServices -> ', error);
        }
    },

    updateTasks: async (data) => {
        try {
            if (data.type === 'EMPTY-TASK') {
                return await Task.updateOne({ _id: data?.id }, {
                    ...data
                })
            }
            if (data.type === 'UPDATE-PROJECTS') {
                const { TaskID, dataProjects } = data;
                const updateProjectToTask = await Task.findByIdAndUpdate(TaskID,
                    { projectID: dataProjects },
                    { new: true }
                );
                return {
                    ErrCode: 0,
                    message: 'Add Project to Task OK!',
                    data: updateProjectToTask
                };
            }
        } catch (error) {
            console.error('Lỗi updateTaskServices -> ', error);
        }
    },

    deleteTasks: async (data) => {
        try {
            if (data.type === 'EMPTY-TASK') {
                if (!data.id) {
                    return {
                        ErrCode: 1,
                        message: 'taskID?',
                    }
                }
                return await Task.deleteOne({ _id: data.id }).lean().exec();
            }
            if (data.type === 'DELETE-PROJECTS') {
                const { TaskID, dataProjects } = data;
                console.log(data);
                const myTask = await Task.findById(TaskID).exec();
                if (!myTask) {
                    return {
                        ErrCode: 1,
                        message: 'myTask?',
                    }
                }
                if (dataProjects && dataProjects.length > 0) {
                    myTask.projectID.pull(...dataProjects);
                }
                const result = await myTask.save();
                return {
                    ErrCode: 0,
                    message: 'Delete Project to Task OK!',
                    data: result
                }
            }
            if (data.type === 'DELETE-USER_SUB') {
                const { TaskID } = data;
                const myTask = await Task.findById(TaskID).exec();
                if (!myTask) {
                    return {
                        ErrCode: 1,
                        message: 'myTask?',
                    }
                }
                myTask.userSub = null;
                const result = await myTask.save();
                return {
                    ErrCode: 0,
                    message: 'Delete UserSub to Task OK!',
                    data: result.toObject()
                };
            }
        } catch (error) {
            console.error('Lỗi deleteTasksServices -> ', error);
            return null;
        }
    }
}