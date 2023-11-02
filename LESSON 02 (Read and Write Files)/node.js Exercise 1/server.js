const fs = require('fs')
const path = require('path')

fs.readFile('./reg/test.txt', (err, data) => {
    if (err) throw err
    console.log(data.toString());
})


fs.writeFile(path.join(__dirname, 'reg', 'node.txt'), 'Here is my node text file', err => {
    if (err) throw err
    console.log('file created successfully');
})

fs.rename(path.join(__dirname, 'reg', 'node.txt'), path.join(__dirname, 'reg', 'ten.txt'), err => {
    if (err) throw err
    console.log('file renamed successfully');
})


process.on('uncaughtException', error => {
  console.error(`there was an uncaught error: ${error}`),
  process.exit(1)
})