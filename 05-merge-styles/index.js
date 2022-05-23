const fs = require('fs');
const path = require('path');
const dirStyles = path.join(__dirname, '/styles');
const projectDist = path.join(__dirname, '/project-dist');
const fileBundle = path.join(projectDist, '/bundle.css');
let data = '';

fs.truncate(fileBundle, err => {
    if(err) 
    fs.open(
        path.join(fileBundle), 'w',
        (err) => {
            if (err) console.log(err);
        });
});

fs.readdir(dirStyles, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            if(path.extname(file) === '.css') {
                let fullPath = path.join(dirStyles, file);
                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    fs.appendFile(path.join(projectDist, 'bundle.css'), data, (err) => {
                        if (err) console.log(err);
                    });
                });
            }
        });
    }
    console.log('Завершено успешно, bundle.css собран');
});

