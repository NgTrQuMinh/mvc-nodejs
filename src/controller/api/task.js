const { getTasks, createTasks, updateTasks, deleteTasks } = require('../../services/task');

module.exports = {
    getTasksAPI: async (req, res) => {
        try {
            const result = await getTasks(req.query);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi getTasksAPI -> ', error);
        }
    },

    createTasksAPI: async (req, res) => {
        try {
            const result = await createTasks(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi createTasksAPI -> ', error);
        }
    },

    updateTasksAPI: async (req, res) => {
        try {
            const result = await updateTasks(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi updateTasksAPI -> ', error);
        }
    },

    deleteTasksAPI: async (req, res) => {
        try {
            const result = await deleteTasks(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi deleteTasksAPI -> ', error);
        }
    }
}