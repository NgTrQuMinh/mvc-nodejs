const { uploadSingleFile, UploadMultiFile } = require('../../services/fileServices');
const { getAllCustomers, getCustomers, createCustomers, createArrCustomers, updateCustomers, deleteCustomers, deleteArrCustomers } = require('../../services/customers');
module.exports = {
    postUploadSingleFileAPI: async (req, res) => {
        try {
            const result = await uploadSingleFile(req.files.image);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi postUploadSingleFileAPI -> ', error);
        }
    },

    postUploadMultiFileAPI: async (req, res) => {
        try {
            const result = await UploadMultiFile(req.files.image);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi postUploadMultiFileAPI -> ', error);
        }
    },

    getAllCustomersAPI: async (req, res) => {
        try {
            const result = await getAllCustomers(req.query);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi getAllCustomersAPI -> ', error);
        }
    },

    getCustomersAPI: async (req, res) => {
        try {
            const { id } = req.body;
            const result = await getCustomers(id);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            })
        } catch (error) {
            console.error('Lỗi getCustomersAPI -> ', error);
        }
    },

    createCustomersAPI: async (req, res) => {
        try {
            const { name, email, phone, address, city, description, image } = req.body;

            let imgeURL = '';
            if (req.files && req.files.image) {
                let result = await uploadSingleFile(req.files.image);
                imgeURL = result.path;
            }

            let objectData = {
                name, email, phone, address, city, description, image: imgeURL
            };
            const result = await createCustomers(objectData);

            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi getAllCustomersAPI -> ', error);
        }
    },

    createArrCustomersAPI: async (req, res) => {
        try {
            const result = await createArrCustomers(req.body.Customer);
            console.log(result);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi createArrCustomersAPI -> ', error);
        }
    },

    updateCustomersAPI: async (req, res) => {
        try {
            const { id } = req.body;
            const { name, email, phone, address, city, description, image } = req.body;

            const currentCustomer = await getCustomers(id);
            if (!currentCustomer) {
                return res.status(404).json({
                    ErrCode: 1,
                    message: 'Không tìm thấy khách hàng này'
                });
            }

            let imgeURL = currentCustomer.image || '';
            if (req.files && req.files.image) {
                let result = await uploadSingleFile(req.files.image);
                imgeURL = result.path;
            }

            let objectData = {
                name, email, phone, address, city, description, image: imgeURL
            };
            const result = await updateCustomers(id, objectData);

            return res.status(200).json({
                ErrCode: 0,
                message: 'Cập nhật khách hàng thành công',
                data: result
            });
        } catch (error) {
            console.error('Lỗi updateCustomersAPI -> ', error);
        }
    },

    deleteCustomersAPI: async (req, res) => {
        try {
            const id = req.body.id;
            const result = await deleteCustomers(id);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi deleteCustomersAPI -> ', error);
        }
    },

    deleteArrCustomersAPI: async (req, res) => {
        try {
            let { id } = req.body;
            console.log(id);
            const result = await deleteArrCustomers(id);
            return res.status(200).json({
                ErrCode: 0,
                data: result
            });
        } catch (error) {
            console.error('Lỗi deleteArrCustomersAPI -> ', error);
        }
    }
}