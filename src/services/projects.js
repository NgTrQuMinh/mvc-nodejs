const Project = require('../model/projectsModel');
const { default: aqp } = require('api-query-params');

module.exports = {
    getProjects: async (queryParams) => {
        try {
            const { filter, limit, sort, population } = aqp(queryParams, {
                blacklist: ['page']
            })

            const parsePage = parseInt(queryParams.page, 10) || 1;
            const parseLimit = parseInt(limit, 10) || 10;
            const parseSkip = parseInt((parsePage - 1) * parseLimit);

            if (parseLimit && parsePage) {
                const result = await Project.find(filter)
                    .skip(parseSkip)
                    .limit(parseLimit)
                    .sort(sort)
                    .populate(population)
                    .lean()
                    .exec()
                return result;
            }
            return await Project.find({}).exec();
        } catch (error) {
            console.error('Lỗi getProjectsServices -> ', error)
        }
    },

    createProjects: async (data) => {
        try {
            if (data.type === 'EMPTY-PROJECT') {
                return await Project.create(data);
            }
            if (data.type === 'ADD-USERS') {
                const { projectID, userSchema } = data;
                console.log(data); // Lấy dữ liệu req.body

                const myProject = await Project.findById(projectID).exec(); // Tìm id Project cần thêm User
                if (!myProject) {
                    return { success: false, message: "Project không tồn tại" };
                }
                if (userSchema.length > 0) {
                    myProject.userSchema.addToSet(...userSchema); // Thêm dữ liệu vào Project
                }
                const result = await myProject.save(); // Lưu
                return {
                    ErrorCode: 0,
                    data: result
                };
            }
            if (data.type === 'ADD-TASKS') {
                const { projectID, taskSchema } = data;
                const myProject = await Project.findById(projectID).exec();
                if (!myProject) {
                    return { success: false, message: "Project không tồn tại" };
                }
                if (userSchema.length > 0) {
                    myProject.userSchema.addToSet(...taskSchema);
                }
                const result = await myProject.save(); // Lưu
                return {
                    ErrorCode: 0,
                    data: result
                };
            }
        } catch (error) {
            console.error('Lỗi createProjectsServices -> ', error)
        }
    },

    updateProjects: async (data) => {
        try {
            if (data.type === 'UPDATE-PROJECT') {
                if (!data.id) {
                    return {
                        ErrorCode: 1,
                        message: 'ID?'
                    }
                }
                return await Project.updateOne({ _id: data.id }, {
                    name: data.name,
                    endDate: data.endDate,
                    description: data.description
                }, { new: true, runValidators: true }).lean();
            }
            if (data.type === 'UPDATE-USERS') {
                const { projectID, userSchema } = data;
                console.log(data);

                // ***** Cách 1: Code -> Tìm ProjectID -> và Thay đổi mảng userSchema + save
                // const myProject = await Project.findById(projectID).exec();
                // if (!myProject) {
                //     return { success: false, message: "Project không tồn tại" };
                // }

                // if (userSchema.length > 0) {
                //     myProject.userSchema = userSchema;
                // }
                // const result = await myProject.save();

                // ***** Cách 2: Sử dụng findByIdAndUpdate
                const result = await Project.findByIdAndUpdate(projectID,
                    { $set: { userSchema: userSchema || [] } }, {
                    new: true,
                    runValidators: true
                }).populate('userSchema', 'name email');

                return {
                    ErrorCode: 0,
                    message: 'Update User Confirm with Projects',
                    data: result
                };
            }
            if (data.type === 'UPDATE-TASKS') {
                const { projectID, taskSchema } = data;
                const myProject = await Project.findById(projectID).exec();
                if (!myProject) {
                    return { success: false, message: "Project không tồn tại" };
                }

                if (taskSchema.length > 0) {
                    myProject.taskSchema = taskSchema;
                }
                const result = await myProject.save();
                return {
                    ErrorCode: 0,
                    message: 'Update User Confirm with Projects',
                    data: result
                };
            }
        } catch (error) {
            console.error('Lỗi updateProjectsServices -> ', error)
        }
    },

    deleteProjects: async (data) => {
        try {
            if (data.type === 'DELETE-PROJECT') {
                return await Project.deleteOne({ _id: data.id });
            }
            if (data.type === 'DELETE-USERS') {
                const { projectID, userID } = data;

                const myProject = await Project.findById(projectID).exec();
                if (!myProject) {
                    return { success: false, message: "Project không tồn tại" };
                }

                myProject.userSchema.pull(...userID);
                const result = await myProject.save();

                return { success: true, data: result };
            }
            if (data.type === 'DELETE-TASKS') {
                const { projectID, taskID } = data;
                console.log(data);

                const result = await Project.findByIdAndUpdate(
                    projectID,
                    { $pull: { taskSchema: taskID } },
                    { new: true, runValidators: true }
                ).populate('userSchema', 'name email');

                return {
                    success: true,
                    message: "Xóa tasks khỏi project thành công",
                    data: result
                };
            }
        } catch (error) {
            console.error('Lỗi deleteProjectsServices -> ', error)
        }
    }
}