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
const fs = require('fs').promises;
const path = require('path');

const urlFiles = '04-copy-directory/files/';
const urlFilesCopy = '04-copy-directory/files-copy/';

async function clearAndCopyFiles(folder, copyFolder) {
  try {
    await fs.rmdir(copyFolder, { recursive: true });

    await fs.mkdir(copyFolder, { recursive: true });

    const files = await fs.readdir(folder);
    // console.log(files);

    for (const file of files) {
      const folderPath = path.join(folder, file);
      const copyFolderPath = path.join(copyFolder, file);

      const stats = await fs.stat(folderPath);

      if (stats.isDirectory()) {
        await clearAndCopyFiles(folderPath, copyFolderPath);
      } else {
        await fs.copyFile(folderPath, copyFolderPath);
      }
    }
    console.log('Files copied');
  } catch (err) {
    console.error(err);
  }
}
clearAndCopyFiles(urlFiles, urlFilesCopy);
