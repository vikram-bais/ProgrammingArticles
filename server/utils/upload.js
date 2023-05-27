
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
require('dotenv').config()


const storage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
        const match = ['image/png', 'image/jpg'];
        if(match.indexOf(file.mimetype ) === -1) {
            return Date.now()+"-"+file.originalname;
        }
        return {
            bucketName: 'photos',
            filename: Date.now()+"-"+file.originalname
        }
    }
})

const upload = multer({ storage });

module.exports = upload
// module.exports = multer({storage})

