const { default: aqp } = require('api-query-params');
const User = require('../model/userModel');

module.exports = {
    getAllUsers: async (queryParams) => {
        try {
            const { filter, limit, sort, population } = aqp(queryParams, {
                blacklist: ['page']
            });

            const parsePage = parseInt(queryParams.page, 10) || 1;
            const parseLimit = parseInt(limit, 10) || 1;
            const parseSkip = parseInt((parsePage - 1) * parseLimit);

            if (parsePage && parseLimit) {
                const result = await User
                    .find(filter)
                    .skip(parseSkip)
                    .limit(parseLimit)
                    .sort(sort)
                    .populate(population)
                    .exec()
                return result;
            }
            return await User.find({}).exec();
        } catch (error) {
            console.error('Lỗi getAllUsersServices -> ', error);
            return [];
        }
    },

    getUsers: async (id) => {
        try {
            const result = await User.find({ _id: { $in: id } });
            return result;
        } catch (error) {
            console.error('Lỗi getUsersServices -> ', error);
            return [];
        }
    },

    createUsers: async (objectData) => {
        try {
            const result = await User.create({
                name: objectData.name,
                email: objectData.email,
                city: objectData.city
            });
            return result;
        } catch (error) {
            console.error('Lỗi createUsersServices -> ', error);
            return null
        }
    },

    createArrUsers: async (arrayData) => {
        try {
            const result = await User.insertMany(arrayData);
            return result;
        } catch (error) {
            console.error('Lỗi createUsersServices -> ', error);
            return null
        }
    },

    updateUsers: async (id, objectData) => {
        try {
            const result = await User.updateOne({ _id: id }, {
                name: objectData.name,
                email: objectData.email,
                city: objectData.city
            })
            return result;
        } catch (error) {
            console.error('Lỗi updateUsersServices -> ', error);
            return null
        }
    },

    updateArrUsers: async (usersArray) => {
        try {
            let count = 0;

            for (let user of usersArray) {
                await User.findByIdAndUpdate(user.id, { $set: user });
                count++;
            }

            return { acknowledged: true, modifiedCount: count };
        } catch (error) {
            console.error('Lỗi updateArrUsersServices -> ', error);
            return null;
        }
    },

    deleteUsers: async (id) => {
        try {
            const result = await User.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error('Lỗi deleteUsersServices -> ', error);
            return null;
        }
    },

    deleteArrUsers: async (arrayID) => {
        try {
            const result = await User.delete({ _id: { $in: arrayID } });
            return result;
        } catch (error) {
            console.error('Lỗi deleteArrUsersServices -> ', error);
        }
    }
}