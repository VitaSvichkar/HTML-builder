const fs = require('fs').promises;
const path = require('path');

const urlStyles = path.join(__dirname, 'styles');
const urlMergeStyle = path.join(__dirname, 'project-dist');

async function clearAndMergeFile(folderStyles, folderCopyStyles) {
  try {
    const filePath = path.join(folderCopyStyles, 'bundle.css');
    try {
      await fs.unlink(filePath);
    } catch (err) {}
    const files = await fs.readdir(folderStyles);
    const arrFiles = [];

    for (const file of files) {
      const urlFile = path.join(folderStyles, file);
      const extension = path.extname(urlFile);
      const stats = await fs.stat(urlFile);
      // let reading;

      if (stats.isFile() && extension === '.css') {
        const reading = await fs.readFile(urlFile, {
          encoding: 'utf8',
        });
        arrFiles.push(reading);
      }
    }
    await fs.writeFile(filePath, arrFiles.join('\n'), {
      encoding: 'utf8',
      flag: 'w',
    });
  } catch (err) {
    console.log(err);
  }
}
clearAndMergeFile(urlStyles, urlMergeStyle);
