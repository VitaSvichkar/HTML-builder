const fs = require('fs');
const { stdin, stdout } = process;
const path = require('path');

// const filePath = path.join(__dirname, '02-write-file.txt');
let text = '';

fs.writeFile(path.join(__dirname, '02-write-file.txt'), '', (err) => {
  if (err) throw err;
  // console.log('File created');
  stdout.write('hello, write something\n');

  stdin.on('data', (data) => {
    const textData = data.toString().trim();
    text += textData;

    if (textData.toLowerCase() === 'exit') {
      console.log('goodbye');
      process.exit();
    }
    fs.writeFile('02-write-file/02-write-file.txt', text, (err) => {
      if (err) throw err;
    });
  });
});
process.on('SIGINT', () => {
  console.log('goodbye');
  process.exit();
});
