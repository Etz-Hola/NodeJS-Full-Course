const fs = require('fs')

fs.mkdir("./rocco", (err) =>{           //make directory
    if(err)throw err
    console.log("New Dir");
})

if(!fs.existsSync('./new')) {           //If it does not exist
    fs.mkdir("./new", (err) =>{
        if(err)throw err
        console.log("New Dir");
    })
}

if(fs.existsSync('./new')) {
    fs.rmdir("./new", (err) =>{         //remove directory
        if(err)throw err
        console.log("New Dir");
    })
}