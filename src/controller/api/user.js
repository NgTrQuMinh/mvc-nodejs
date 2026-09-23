const { uploadSingleFile, UploadMultiFile } = require('../../services/fileServices');
const { getAllUsers, getUsers, createUsers, createArrUsers, updateUsers, updateArrUsers, deleteUsers, deleteArrUsers } = require('../../services/users');

module.exports = {
    getAllUsersAPI: async (req, res) => {
        try {
            const result = await getAllUsers(req.query);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi getAllUsersAPI -> ', error);
            return [];
        }
    },

    getUsersAPI: async (req, res) => {
        try {
            let id = req.body.id;
            console.log('ID nhận được:', id);
            const result = await getUsers(id);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi getUsersAPI -> ', error);
            return [];
        }
    },

    createUsersAPI: async (req, res) => {
        try {
            const { name, email, city } = req.body;
            const objectData = { name, email, city };
            console.log(objectData);
            const result = await createUsers(objectData);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi createUsersAPI -> ', error);
            return null;
        }
    },

    createArrUsersAPI: async (req, res) => {
        try {
            const result = await createArrUsers(req.body);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi createArrUsersAPI -> ', error);
            return null;
        }
    },

    updateUsersAPI: async (req, res) => {
        try {
            const { id, name, email, city } = req.body;
            const objectData = { name, email, city };
            const result = await updateUsers(id, objectData);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi createArrUsersAPI -> ', error);
            return null;
        }
    },

    updateArrUsersAPI: async (req, res) => {
        try {
            // Lấy thẳng mảng dữ liệu gửi lên từ Postman
            const result = await updateArrUsers(req.body);

            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi updateArrUsersAPI -> ', error);
        }
    },

    deleteUsersAPI: async (req, res) => {
        try {
            const id = req.body.id;
            const result = await deleteUsers(id);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi deleteUsersAPI -> ', error);
        }
    },

    deleteArrUsersAPI: async (req, res) => {
        try {
            let { id } = req.body;
            console.log(id);
            const result = await deleteArrUsers(id);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi deleteArrUsersAPI -> ', error);
        }
    }
}