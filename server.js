
//create express server and mysql connection 
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

