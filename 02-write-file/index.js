const fs = require('fs');
const { stdin, stdout } = process;
const path = require('path');
const filePath = path.join(__dirname, '02-write-file.txt');
const writeStream = fs.createWriteStream(filePath);

fs.writeFile(filePath, '', (err) => {
  if (err) console.log(err);
});

stdout.write('Write something (type "exit" or press Ctrl + C to quit):\n');

stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    stdout.write('^-^  GOODBYE  ^-^');
    writeStream.end();
    process.exit();
  } else {
    writeStream.write(data);
  }
});

process.on('SIGINT', () => {
  stdout.write('^-^  GOODBYE  ^-^');
  writeStream.end();
  process.exit();
});
