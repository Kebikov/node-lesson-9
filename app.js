const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
// формирование пути, помошью __dirname происходит явное определение пути исполняемого файла, добавляем папку с файлами и имя страницы

    let basePath = '';

    switch(req.url) {
        case '/home':
        case '/index.html':
        case '/index':
        case '/':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
// желательно сделать, указываем код статуса ответа, 200 - все завершено успешно, 404 - ошибка пользователя, в данном случае введен некоректный адресс страницы
            break;
    }

    fs.readFile( basePath, (err, data) => {
// получаем данные из файла где хранится html файл
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });
});

server.listen(PORT, 'localhost', (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});


