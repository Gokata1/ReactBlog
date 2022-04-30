import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());

app.use(function(req,res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'su3do!#',
    database: 'posts',
    multipleStatements: true
}); 

mysqlConnection.connect((err) => {
    if(!err) console.log("Connection established Successfully!!!!");
    else console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello to a Server for blog app");
});

app.get('/posts', (req, res) => {
    mysqlConnection.query('SELECT * FROM posts.posts_table', (err, rows, field) => {
        if(!err) res.send(rows);
        else console.log(err);
    });
} );

app.post('/posts', (req, res) => {
    let { post_title, post_author, post_content } = req.body;
    const post_id = uuidv4();

    var err = false;
    if(!post_title) err = "Title";
    if(!post_author) err = "Author";
    if(!post_content) err = "Content";

    if(!err){
        const query = `INSERT INTO posts.posts_table (post_id,post_title,post_author,post_time_created,post_content) VALUES ('${post_id}','${post_title}','${post_author}',SYSDATE(),"${post_content}");`;
        mysqlConnection.query(query, (err, rows, field) => {
            if(!err) res.send(`A new post has been added`);
            else console.log(err);
        });
    }
    else{
        res.send(`${err} can cot be empty`);
    }
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM posts.posts_table WHERE post_id='${id}';`;
    mysqlConnection.query(query, (err, rows, field) => {
        if(!err) res.send(rows);
        else console.log(err);
    });
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM posts.posts_table WHERE post_id='${id}' LIMIT 1;`;
    mysqlConnection.query(query, (err, rows, field) => {
        if(!err) res.send(`Post with id: ${id} has been deleted`);
        else console.log(err);
    });
});

app.put('/posts/:post_id', (req, res) => {
    const { post_id } = req.params;
    const {post_title, post_author, post_content} = req.body;

    var arr = []

    const varToString = varObj => Object.keys(varObj)[0];

    if(post_title) arr.push(` ${varToString({ post_title })} = '${post_title}'`);
    if(post_author) arr.push(` ${varToString({ post_author })} = '${post_author}'`);
    if(post_content) arr.push(` ${varToString({ post_content })} = "${post_content}"`);
    
    if(`${arr.length}` !== '0') arr.push(' post_last_edited = SYSDATE() ');
    
    var query = ''
    if(`${arr.length}` !== '0'){
        query = `UPDATE posts.posts_table SET ${arr.toString()} WHERE post_id='${post_id}';`;
    }else{
        res.send("No element to update");
    }

    mysqlConnection.query(query, (err, rows, field) => {
        if(!err) res.send("Update Successful");
        else console.log(err);
    });

});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));