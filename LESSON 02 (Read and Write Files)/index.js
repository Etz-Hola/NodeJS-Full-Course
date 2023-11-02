
                          //How to read a file
const { log } = require('console');
const fs = require('fs')
const path = require('path')

fs.readFile('./files/starter.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());         //Rocco is here for me baby
});

            //OR

fs.readFile('./files/lorem.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);                    //Here we go
});



console.log('Hello.........');


fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data + ' wow');                  //Rocco is here for me baby
});

// ************************TO WRITE FILES ******************************
fs.writeFile(path.join(__dirname, 'files', 'text.txt'), `Here in DLTAfrica it's a new day`, (err) => {
  if (err) throw err;
  console.log('Write Completed');
})

//Read the created file
fs.readFile('./files/text.txt', 'utf8', (err, data) => {
  if(err) throw err;
  console.log(data);
})

// ***********************To Append Child**********************************
fs.appendFile(path.join(__dirname, 'files', 'text.txt'), '\n\n\nTesting testing', (err) => {
  if (err) throw err
  console.log('append done');
})

// *********************RENAMING*****************************
fs.rename(path.join(__dirname, 'files', 'text.txt'), path.join(__dirname, 'files', 'renamed.txt'), (err) => {
  if (err) throw err
  console.log('file renamed successfully');
})

//Exiting uncaught error
process.on('uncaughtException', error => {
  console.error(`there was an uncaught error: ${error}`),
  process.exit(1)
})



