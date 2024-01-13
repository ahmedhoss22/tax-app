const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;
    console.log("=============>",req.baseUrl);
    switch (req.baseUrl) {
      case '/tax/v1/user':
        dest = 'src/uploads/users';
        break;
      case '/tax/v1/papers':
        dest = 'src/uploads/papers';
        break;
      case '/tax/v1/blog':
        dest = 'src/uploads/blogs';
        break;
      case '/tax/v1/services':
        dest = 'src/uploads/service';
        break;
      default:
        dest = 'src/uploads';
    }
    cb(null, dest);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${uuidv4()}--${file.originalname}`);
  },
});
const checkFileType = function (file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});
module.exports = { upload };