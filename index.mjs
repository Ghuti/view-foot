import express from 'express'
import mysql from 'mysql'
import ejs from 'ejs'

const app = express();

app.set('view engine','ejs');

const kikou = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'football_french_chiampionship'
});

app.get('/teams', function (req, res) {
  kikou.query('SELECT * FROM teams', function( err, data){
    res.render('teams', {
      teams: data
    });
  })
});


app.get('/', (req, res) => {
  res.render('index', { title: 'Ligue 1 ENCULER', message: 'TARTE A GUEULLE A LA RECREE'});
})



app.listen(3000, function() {
  console.log('http://localhost:3000');
})
