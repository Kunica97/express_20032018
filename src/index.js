const express = require('express');
const { get } = require('axios');
const moment = require('moment');
const fs = require('fs');
const USERS_URL = 'https://kodaktor.ru/j/users';

const PORT = 7654;
const app = express();

const myLogger =  (req, res, next) => {
  console.log('LOGGED : ' + moment().format('DD.MM.YYYY HH:mm:ss') + "\t" + req.url);
  fs.appendFileSync("log.txt", moment().format('DD.MM.YYYY HH:mm:ss') + " " + req.url + "\n",  "ascii");
  next();
};

app
	.use(myLogger)
   	.get(/users/, async r => {
    	const { data: { users: items } } = await get(USERS_URL);
    	r.res.render('list', {title: 'Login list', items});
   	})
   	.use(r => r.res.status(404).end('Still not here, sorry!'))
   	.use((e, r, res, n) => res.status(500).end(`${e}`))
   	.set('view engine', 'pug')
   	.listen(process.env.PORT || PORT, () => console.log("Hello, i am here : " + process.pid));
