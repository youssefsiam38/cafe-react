const multer = require('multer')
const path   = require('path')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './public/imgs'))
    },
    filename: function (req, file, cb) {

        let fileNameParts = file.originalname.split('.')
        let extention = fileNameParts[fileNameParts.length - 1]

        req.ext = extention;

      cb(null, req.query.id + '.' + extention)
    }
  })
   
let upload = multer({ 
    storage,
    limits: {
        fileSize: 5000000
    }
 })

 module.exports = upload


      