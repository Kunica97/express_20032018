const express = require('express');
const { get } = require('axios');
const moment = require('moment');
const fs = require('fs');
const exphbs  = require('express-handlebars');


const PORT = 7654;
const URL = 'https://kodaktor.ru/j/users';
const app = express(); //Godlike
const Olologger =  (req, res, next) => {
  fs.appendFile('log.txt', moment().format('DD.MM.YYYY HH:mm:ss') + ': ' + req.url + '\n', (err) => {
    if (err) throw err;
    console.log('update log!');
  });
  next();
};

app.engine('handlebars', exphbs({layoutsDir: 'listhb'}));
app.set('view engine', 'handlebars');


app
	.use(Olologger)
	.get('/',  (req, res) => {
  		res.send('Hello! You are on my localhost!');
	})
	.get('/log/', r => r.res.end(fs.readFileSync('log.txt')))
	.get('/hello', r => r.res.end('Hello world'))
	.get('/hello/:name', r => r.res.end(`Hello, ${r.params.name}`))
	.get('/listhb', async r => {
      const {data: {users: items}} = await get(URL);
      r.res.render('listhb', {users: items})
     })
    .use(r => r.res.status(404).end('Still not here, sorry!'))
    .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))

	.listen(process.env.PORT || PORT, () => console.log('Im working!:)'));
