const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/secret-folder');

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        console.log('\nДиректория содержит следующие файлы:');
        files.forEach(file => {
            let fullPath = __dirname + '/secret-folder/' + file;
            fs.stat(fullPath, (err, stats) => {
                if (stats.isFile()) {
                    console.log(path.parse(fullPath).name + ' - ' + path.extname(fullPath).slice(1) + ' - ' + stats.size / 1024 + ' kb');
                }
            });
        });

    }
});