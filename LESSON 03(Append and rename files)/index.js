const fsPromises = require('fs').promises
const path = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data);                      //Hey everyone. It is afternoon
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promises.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promises.txt'), `\nHere I am niggah`)
        await fsPromises.rename(path.join(__dirname, 'files', 'promises.txt'), path.join(__dirname, 'files', 'index.txt'))

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'index.txt'), 'utf8')
        console.log(newData);                   //Hey everyone. It is afternoon \n Here I am niggah

        //To delete file
        // await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'))
    } catch(err) {
        console.log(err);
    }
}

fileOps()