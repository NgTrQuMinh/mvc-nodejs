const express = require("express");
const apiRouter = express.Router();
const { postUploadSingleFileAPI, postUploadMultiFileAPI, getAllCustomersAPI, getCustomersAPI, createCustomersAPI, createArrCustomersAPI, updateCustomersAPI, deleteCustomersAPI, deleteArrCustomersAPI } = require('../controller/api/customers');

apiRouter.get('/customers', getAllCustomersAPI);
apiRouter.get('/customer', getCustomersAPI);
apiRouter.post('/customer', createCustomersAPI);
apiRouter.post('/customer-many', createArrCustomersAPI);
apiRouter.put('/customers', updateCustomersAPI);
apiRouter.delete('/customer', deleteCustomersAPI);
apiRouter.delete('/customer-many', deleteArrCustomersAPI);

apiRouter.post('/file', postUploadSingleFileAPI);
apiRouter.post('/files', postUploadMultiFileAPI);

module.exports = apiRouter;