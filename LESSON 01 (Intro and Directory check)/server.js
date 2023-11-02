console.log('Hello World');                     // Hello World
console.log(global);

const os = require('os')
const path = require("path")



    console.log(os.type());                     // Windows_NT
    console.log(os.version());                  // Windows 10 Pro
    console.log(os.homedir());                  // C:\Users\ROCCO           

    console.log(__dirname);                     // C:\Users\ROCCO\Desktop\My_Web\NODE.js\LESSON 01
    console.log(__filename);                    // C:\Users\ROCCO\Desktop\My_Web\NODE.js\LESSON 01\server.js 

    console.log(path.dirname(__filename));      // C:\Users\ROCCO\Desktop\My_Web\NODE.js\LESSON 01\ 
    console.log(path.basename(__filename));     // server.js   
    console.log(path.extname(__filename));      // .js     
    console.log(path.parse(__filename));        // {root: 'C:\\', dir: 'C:\\Users\\ROCCO\\Desktop\\My_Web\\NODE.js\\LESSON 01', base: 'server.js', ext: '.js', name: 'server'}





// const math = require('./math')    // To import server.js 

// console.log(math.add(2, 3));        
// console.log(math.subtract(2, 3));
// console.log(math.multiply(2, 3));
// console.log(math.divide(2, 3));

//              OR

const { add, subtract, multiply, divide } = require('./math'); // Assuming math.js is in the same directory as main.js

console.log(add(2, 3)); // Output: 5
console.log(subtract(2, 3)); // Output: -1
console.log(multiply(2, 3)); // Output: 6
console.log(divide(2, 3)); // Output: 0.6666666666666666



