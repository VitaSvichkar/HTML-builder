const fs = require('fs');
const path = require('path');
fs.readdir(
  '03-files-in-folder/secret-folder',
  // { withFileTypes: true },
  (err, data) => {
    if (err) throw err;
    data.forEach((elem) => {
      // console.log(elem);
      const url = '03-files-in-folder/secret-folder/' + elem;
      fs.stat(url, (err, elem) => {
        if (elem.isFile()) {
          const name = path.basename(url, path.extname(url));
          const extension = path.extname(url);
          const size = elem.size / 1024;
          console.log(name + ' - ' + extension + ' - ' + size + 'kb');
        }
      });
    });
  },
);
