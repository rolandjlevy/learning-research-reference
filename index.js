const express = require('express');
const app = express();
const path = require('path');
const marked = require('marked');
const fs = require('fs');
const port = process.env.PORT || 4000;

const ejs = require('ejs');
const views = path.join(__dirname, '/views');
app.set('view engine', 'ejs');
app.set('views', views);

app.use(express.static('public'));

app.get('/', (req, res) => {
  const filepath = __dirname + '/README.md';
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render('index', { 
      markdown:marked(data.toString()) 
    });
  });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});