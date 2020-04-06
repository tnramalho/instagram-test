const multer = require('multer');
const path = require('path');


module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename: function (req, file, callback) {
            
            const [ name ] = file.originalname.split('.');

            const fileName = `${name}.jpg`;

            callback(null, fileName);
        }
    })

}