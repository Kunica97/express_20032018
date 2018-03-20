const express = require('express');
const { get } = require('axios');
const URL = 'https://kodaktor.ru/j/users';

const PORT = 4321;
const app = express();
app
   .get(/hello/, r => r.res.end('Hello, world!'))
   .get(/users/, async r => { 
      const { data: { users: items } } = await get(URL);
      r.res.render('list', {title: 'Login list', items});
   })
   .use(r => r.res.status(404).end('Still not here, sorry!'))
   .use((e, r, res, n) => res.status(500).end('Error: ${e}'))
   .set('view engine', 'pug')
   .listen(process.env.PORT || PORT, () => console.log("My pid is very big : " + process.pid));