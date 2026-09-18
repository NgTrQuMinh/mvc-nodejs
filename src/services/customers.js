const { default: aqp } = require('api-query-params');
const Customer = require('../model/customersModel');

module.exports = {
    getAllCustomers: async (rawQuery) => {
        try {
            let { filter, limit, sort } = aqp(rawQuery, {
                blacklist: ['page']
            });
            const parsePage = parseInt(rawQuery?.page, 10) || 1;
            const parseLimit = parseInt(limit, 10) || 10;
            const parseSkip = (parsePage - 1) * parseLimit;

            if (parsePage && parseLimit) {
                let result = await Customer.find(filter)
                    .skip(parseSkip)
                    .limit(parseLimit)
                    .sort(sort)
                    .exec();
                return result;
            }
            let result = await Customer.find({});
            return result;
        } catch (error) {
            console.error('Lỗi getAllCustomers -> ', error);
            return [];
        }
    },

    getCustomers: async (id) => {
        try {
            const result = await Customer.findById(id);
            return result;
        } catch (error) {
            console.error('Lỗi getCustomers -> ', error);
            return [];
        }
    },

    createCustomers: async (object) => {
        try {
            const result = await Customer.create({
                name: object.name,
                email: object.email,
                phone: object.phone,
                address: object.address,
                city: object.city,
                description: object.description,
                image: object.image,
            })
            return result;
        } catch (error) {
            console.error('Lỗi createCustomers -> ', error);
            return null;
        }
    },

    createArrCustomers: async (Array) => {
        try {
            const result = await Customer.insertMany(Array);
            return result;
        } catch (error) {
            console.error('Lỗi createArrCustomers -> ', error);
            return null;
        }
    },

    updateCustomers: async (id, object) => {
        try {
            const result = await Customer.updateOne({ _id: id }, {
                name: object.name,
                email: object.email,
                phone: object.phone,
                address: object.address,
                city: object.city,
                description: object.description,
                image: object.image,
            })
            return result;
        } catch (error) {
            console.error('Lỗi updateCustomers -> ', error);
            return null;
        }
    },

    deleteCustomers: async (id) => {
        try {
            const result = await Customer.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error('Lỗi deleteCustomers -> ', error);
            return null;
        }
    },

    deleteArrCustomers: async (Arr) => {
        try {
            const result = await Customer.delete({ _id: { $in: Arr } });
            return result;
        } catch (error) {
            console.error('Lỗi deleteArrCustomers -> ', error);
            return null;
        }
    }
}