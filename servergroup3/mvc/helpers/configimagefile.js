const multer = require('multer')
const path = require('path')

//Config storage upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '__dirname/../mvc/imgupload') //link file
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

//Config upload file
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)

    }
}).single('img')

//Check file type
const checkFileType = (file, cb) => {
    //Allowed ext
    const filetype = /jpeg|jpg|png|gif/
        //Check ext
    const extname = filetype.test(path.extname(file.originalname).toLowerCase())
        //Check mime
    const mimetype = filetype.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Image Only')
    }


}


module.exports = {
    upload
}