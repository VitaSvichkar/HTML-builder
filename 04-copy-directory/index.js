const fs = require('fs');
const path = require('path');
// const fsPromises = fs.promises;
const urlFiles = '04-copy-directory/files/';

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => console.log(err));
const urlFilesCopy = '04-copy-directory/files-copy/';
fs.readdir(urlFiles, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    fs.copyFile(urlFiles + file, urlFilesCopy + file, (err) => {
      if (err) console.log(err);
    });
  });
});
