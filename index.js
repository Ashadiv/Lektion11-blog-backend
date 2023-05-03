
const dbDriver = require('better-sqlite3');

const db = dbDriver('blog.sqlite3');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('frontend'));

/* Setup all routes */
// Get
app.get('/api/posts',(req,res) => {
    const statement = db.prepare('select * FROM posts');
    const posts = statement.all();
    res.json(posts);
});

// Get 1
app.get('/app/posts/:id', (req,res) => {
    const statement = db.prepare('Select * FROM posts WHERE id = ?');
    const post = statement.get(req.params.id);
    res.json(post);
});

// Post
app.post('/api/posts', (req, res) => {
    const post = req.body;
    const statement = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
    const result = statement.run(post.title, post.content);
    res.json({ id: result.lastInsertRowid, success: true});

});

// PUT
app.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    const statement = db.prepare('UPDATE posts SET title = ?, content = ? WHERE id = ?');
    const result = statement.run(post.title, post.content, req.params.id);
    res.json({changes: result.changes, success: true});

});

// DELECT
app.delete('/api/posts/:id', (req, res) => {
    const statement = db.prepare('DELETE FROM posts WHERE id = ?');
    const result = statement.run(req.params.id);
    res.json({success: true});

});

/* Start server */
app.listen(3000, console.log('Server started on port 3000'));