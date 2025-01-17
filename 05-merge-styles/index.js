const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    fs.writeFile(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      '',
      (err) => {
        if (err) {
          console.log(err);
          return;
        }

        data.forEach((item) => {
          if (item.isFile()) {
            if (path.extname(item.name) === '.css') {
              fs.readFile(
                path.join(__dirname, 'styles', item.name),
                'utf-8',
                (err, data) => {
                  if (err) {
                    console.log(err);
                    return;
                  }

                  fs.appendFile(
                    path.join(__dirname, 'project-dist', 'bundle.css'),
                    data,
                    (err) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                      console.log('File ' + item.name + ' is copied');
                    },
                  );
                },
              );
            }
          }
        });
      },
    );
  },
);
