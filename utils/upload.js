const multer = require("multer");

let fileName = "";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      let Oname = file.originalname;
      let extension = Oname.substring(Oname.lastIndexOf('.'));
      let prefix = Oname;
      prefix = prefix.replace(/^\s+|\s+$/g, '');
      prefix = prefix.replace(/\s\s+/g, '_');
      prefix = prefix.replace(/ /g, '_');
      fileName = prefix;
      cb(null, './media');
    },
    filename(req, file, cb) {
      cb(null, fileName);
    }
  }),
});

module.exports = upload;
