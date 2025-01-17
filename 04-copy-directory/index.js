// const fs = require('fs');
// const path = require('path');
// // const fsPromises = fs.promises;
// const urlFiles = '04-copy-directory/files/';
// const urlFilesCopy = '04-copy-directory/files-copy/';

// fs.mkdir(path.join(__dirname, 'files-copy'), (err) => console.log(err));

// fs.readdir(urlFiles, (err, files) => {
//   if (err) throw err;

//   files.forEach((file) => {
//     fs.copyFile(urlFiles + file, urlFilesCopy + file, (err) => {
//       if (err) console.log(err);
//     });
//   });
// });
// -------------
// const fs = require('fs').promises;
// const path = require('path');

// const urlFiles = '04-copy-directory/files/';
// const urlFilesCopy = '04-copy-directory/files-copy/';

// async function clearAndCopyFiles(folder, copyFolder) {
//   try {
//     try {
//       await fs.rm(copyFolder, { recursive: true });
//     } catch (err) {}

//     await fs.mkdir(copyFolder, { recursive: true });

//     const files = await fs.readdir(folder);
//     // console.log(files);

//     for (const file of files) {
//       const folderPath = path.join(folder, file);
//       const copyFolderPath = path.join(copyFolder, file);

//       const stats = await fs.stat(folderPath);

//       if (stats.isDirectory()) {
//         await clearAndCopyFiles(folderPath, copyFolderPath);
//       } else {
//         await fs.copyFile(folderPath, copyFolderPath);
//       }
//     }
//     console.log('Files copied');
//   } catch (err) {
//     console.error(err);
//   }
// }
// clearAndCopyFiles(urlFiles, urlFilesCopy);

const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  copyDir();
});

function copyDir() {
  const copyFolder = path.join(__dirname, 'files-copy');
  fs.readdir(path.join(__dirname, 'files'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    fs.readdir(path.join(__dirname, 'files-copy'), (err, copyData) => {
      if (err) {
        console.log(err);
        return;
      }

      copyData.forEach((item) => {
        if (!data.includes(item)) {
          fs.unlink(path.join(__dirname, 'files-copy', item), (err) => {
            if (err) console.log(err);
          });
        }
      });

      data.forEach((item) => {
        fs.copyFile(
          path.join(__dirname, 'files', item),
          path.join(copyFolder, item),
          (err) => {
            if (err) console.log;
          },
        );
      });
    });
  });
}
