const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, data) => {
    console.log(data);
    data.forEach((item) => {
      if (item.isFile()) {
        const fileName = path.basename(item.name, path.extname(item.name));
        const ext = path.extname(item.name).slice(1);

        fs.stat(
          path.join(__dirname, 'secret-folder', item.name),
          (err, stat) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(
              fileName + ' - ' + ext + ' - ' + stat.size / 1024 + 'kb',
            );
          },
        );
      }
    });
  },
);
