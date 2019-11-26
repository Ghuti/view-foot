import express from 'express'
import mysql from 'mysql'
import ejs from 'ejs'

const app = express();

app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Ligue 1', message: 'retrouver toute vos équipes'});
})

// connection bdd
const kikou = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'football_french_chiampionship'
});

//page list of teams
app.get('/teams', function (req, res) {
  kikou.query('SELECT * FROM teams', function( err, data){
    res.render('teams', {
      teams: data
    });
  })
});

//page of team
app.get('/teams/:id', function (req, res) {
  const teamId = req.params.id;
  kikou.query(`
    SELECT teams.*, stadiums.name AS stadium
    FROM teams
    INNER JOIN stadiums ON stadiums.id = teams.id_stadium
    WHERE teams.id = ?`, [teamId], function( err, data){
    res.render('team', {
      team: data[0]
    });
    //res.send(data)
  })
})

// list of coach
app.get('/coachs', function (req, res) {
  kikou.query('SELECT * FROM coachs', function( err, data){
    res.render('coachs', {
      coachs: data
    });
  })
});

//page of coach
app.get('/coach/:id', function (req, res) {
  const coachId = req.params.id;
  kikou.query(`
    SELECT *
    FROM coachs
    WHERE coachs.id = ?`, [coachId], function( err, data){
    res.render('team', {
      team: data[0]
    });
    //res.send(data)
  })
})



app.listen(3000, function() {
  console.log('http://localhost:3000');
})
