
//create express server and mysql connection 
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
con.query("CREATE DATABASE test", (err, result) => {
    if (err) throw err;
    console.log("Database created");
    });
con.query("CREATE TABLE test.users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))", (err, result) => {
    if (err) throw err;
    console.log("Table created");
    });
app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    const sql = `INSERT INTO test.users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
        res.send(result);
    });
});
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM test.users';
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Data received");
        res.send(result);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

