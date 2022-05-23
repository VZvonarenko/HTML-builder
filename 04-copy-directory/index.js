const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, '/files');
const folderCopy = path.join(__dirname, '/files-copy');

fs.stat(folderCopy, err => {
    if(err) {
        fs.mkdir(folderCopy, err => {
            if(err) console.log(err);
            console.log('Директория files-copy создана');
             startCopy();
        });
    } else {
        clearDir();
        startCopy();
    }
});

function startCopy() {
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Cледующие файлы скопированы в каталог files-copy:');
            files.forEach(file => {
                console.log(file);
                fs.copyFile(folder+ '/' + file, folderCopy + '/' + file, (err) => {
                    if(err) console.log(err); 
                });
            });
        }
    });
}

function clearDir() {
    fs.readdir(folderCopy, (err, files) => {
        if(err) {
            console.log(err);
        } else {
            files.forEach(file => {
                fs.unlink(folderCopy + '/' + file, (err) => {
                    if (err) console.log(err);
                });
            });
        }
    });
}

