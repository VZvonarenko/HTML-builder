const path = require('path');
const fs = require('fs');
const templateFile = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const projectDist = path.join(__dirname, 'project-dist');
const fileHtml = path.join(projectDist, 'index.html');

fs.rm(projectDist, { recursive: true, force: true }, err => {
    if (err) return console.log(err);

    fs.mkdir(projectDist, err => {
        if (err) return console.log(err);

        console.log('Каталог "project-dist" создан');
        createIndexHtml();
        createAssetsDir();
        createCssFile();
    });
});

function createIndexHtml() {
    fs.readFile(templateFile, err => {
        if (err) return console.log(err);

        let string;

        const template = fs.createReadStream(templateFile, 'utf8');
        const writeTemplate = fs.createWriteStream(fileHtml);

        template.on('data', chunk => {
            string = chunk;

            fs.readdir(components, (err, files) => {
                if (err) return console.log(err);

                let fileText = [];
                let fileName = [];
                files.forEach(file => {
                    const readablefile = fs.createReadStream(path.join(components, file));
                    fileText.push(readablefile);
                    fileName.push(path.parse(file).name);
                    for (let i = 0; i < fileText.length; i++) {
                        fileText[i].on('data', (data) => {
                            string = string.replace(`{{${fileName[i]}}}`, data);
                            if (i === fileText.length - 1)
                                writeTemplate.write(string);
                        });
                    }
                });
            });
        });
    });
}

const originAssets = path.join(__dirname, 'assets');
const copyedAssets = path.join(projectDist, 'assets');

function createAssetsDir() {
    fs.mkdir(copyedAssets, err => {
        if (err) return console.log(err);
        console.log('Каталог "assets" создан');
        copyFiles(originAssets, copyedAssets);
    });
}

function copyFiles(dir, dist) {
    fs.readdir(dir, { withFileTypes: true }, (err, items) => {
        if (err) return console.log(err);
        fs.mkdir(dist, { recursive: true }, function(err) {
            if (err) return console.log(err);
        });
        items.forEach(item => {
            if (item.isDirectory()) {
                const nextDir = path.join(dir, item.name);
                const nextDist = path.join(dist, item.name);
                copyFiles(nextDir, nextDist);
            } else {
                fs.copyFile(path.join(dir, item.name), path.join(dist, item.name), err => {
                    if (err) return console.log(err);
                });
            }
        });
    });
}

const currentDir = path.join(__dirname, 'styles');
const targetFile = path.join(__dirname, 'project-dist', 'style.css');

function createCssFile() {
    fs.open(targetFile, 'w', err => {
        if (err) return console.log(err);
        console.log('Файл "style.css" создан');
    });
    fs.readdir(currentDir, (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            const currentFile = path.join(currentDir, file);
            if (path.parse(file).ext === '.css') {
                fs.readFile(currentFile, (err, data) => {
                    if (err) return console.log(err);

                    fs.appendFile(targetFile, data, err => {
                        if (err) return console.log(err);
                    });
                });
            }
        });
    });
}