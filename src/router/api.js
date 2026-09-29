const express = require("express");
const apiRouter = express.Router();
const { postUploadSingleFileAPI, postUploadMultiFileAPI, getAllCustomersAPI, getCustomersAPI, createCustomersAPI, createArrCustomersAPI, updateCustomersAPI, deleteCustomersAPI, deleteArrCustomersAPI } = require('../controller/api/customers');
const { getAllUsersAPI, getUsersAPI, createUsersAPI, createArrUsersAPI, updateUsersAPI, updateArrUsersAPI, deleteUsersAPI, deleteArrUsersAPI } = require('../controller/api/user')
const { getProjectsAPI, createProjectsAPI, updateProjectsAPI, deleteProjectsAPI } = require('../controller/api/projects');

apiRouter.get('/customers', getAllCustomersAPI);
apiRouter.get('/customer', getCustomersAPI);
apiRouter.post('/customer', createCustomersAPI);
apiRouter.post('/customer-many', createArrCustomersAPI);
apiRouter.put('/customers', updateCustomersAPI);
apiRouter.delete('/customer', deleteCustomersAPI);
apiRouter.delete('/customer-many', deleteArrCustomersAPI);

apiRouter.post('/file', postUploadSingleFileAPI);
apiRouter.post('/files', postUploadMultiFileAPI);

apiRouter.get('/users', getAllUsersAPI);
apiRouter.get('/user', getUsersAPI);
apiRouter.post('/users', createUsersAPI);
apiRouter.post('/users-many', createArrUsersAPI)
apiRouter.put('/users', updateUsersAPI);
apiRouter.put('/users-many', updateArrUsersAPI);
apiRouter.delete('/users', deleteUsersAPI);
apiRouter.delete('/users-many', deleteArrUsersAPI);

apiRouter.get('/projects', getProjectsAPI);
apiRouter.post('/projects', createProjectsAPI);
apiRouter.put('/projects', updateProjectsAPI);
apiRouter.delete('/projects', deleteProjectsAPI);


module.exports = apiRouter;