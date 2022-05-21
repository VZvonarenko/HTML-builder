const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.open(
    path.join(__dirname, 'test.txt'), 'w',
    (err) => {
        if (err) throw err;
        console.log('Создан пустой файл для записи');
        startwrite();
    });

function startwrite() {
    stdout.write('Что записать в файл?\n');
    stdin.on('data', data => {
        if (data.toString().trim() === 'exit') {
            process.exit();
        }
        fs.appendFile(path.join(__dirname, 'test.txt'), data, (err) => {
            if (err) throw err;
            stdout.write('Данные записаны.\nДля выхода введите exit или нажмите сочетание клавиш ctrl + c\n');
        });
    });
}


process.on('exit', () => stdout.write('Введенные данные сохранены. Пока!'));