const { getProjects, createProjects, updateProjects, deleteProjects } = require('../../services/projects');

module.exports = {
    getProjectsAPI: async (req, res) => {
        try {
            console.log(req.query)
            const result = await getProjects(req.query);
            console.log(result)
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi getProjectsAPI -> ', error);
        }
    },
    createProjectsAPI: async (req, res) => {
        try {
            const result = await createProjects(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi createProjectsAPI -> ', error);
        }
    },

    updateProjectsAPI: async (req, res) => {
        try {
            const result = await updateProjects(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi updateProjectsAPI -> ', error);
        }
    },

    deleteProjectsAPI: async (req, res) => {
        try {
            const result = await deleteProjects(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi updateProjectsAPI -> ', error);
        }
    }
}