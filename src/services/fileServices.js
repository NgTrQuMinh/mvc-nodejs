const path = require('path');

module.exports = {
    uploadSingleFile: async (fileObject) => {
        let extName = path.extname(fileObject.name);
        let baseName = path.basename(fileObject.name, extName);
        let uniqueFile = `${baseName}-${Date.now()}${extName}`;

        let uploadPath = path.join(__dirname, '../public/image', uniqueFile);

        try {
            await fileObject.mv(uploadPath);
            return {
                Status: 'OK!',
                path: `/image/${uniqueFile}`,
                FileName: uniqueFile,
                ErrorCode: 0
            }
        } catch (error) {
            console.error('Lỗi uploadSingleFile -> ', error);
        }
    },
    UploadMultiFile: async (fileArray) => {
        let resultFile = [];
        for (let i = 0; i < fileArray.length; i++) {
            let fileObject = fileArray[i];

            let extName = path.extname(fileObject.name);
            let baseName = path.basename(fileObject.name, extName);
            let uniqueFile = `${baseName}-${Date.now()}-${i}${extName}`;

            let uploadPath = path.join(__dirname, '../public/image', uniqueFile);
            try {
                await fileObject.mv(uploadPath);
                resultFile.push({
                    Status: 'OK!',
                    path: `/image/${uniqueFile}`,
                    FileName: uniqueFile,
                    ErrorCode: 0
                })
            } catch (error) {
                console.error('Lỗi uploadSingleFile -> ', error);
            }
        }
        return resultFile;
    },

}