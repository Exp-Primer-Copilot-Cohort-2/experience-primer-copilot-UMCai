//Create web server
const express = require('express');
const app = express();
//Create path
const path = require('path');
//Create port
const port = process.env.PORT || 3000;
//Create body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//Create comment array
let comments = [
    {
        id: 1,
        username: "Alice",
        comment: "I love it!"
    },
    {
        id: 2,
        username: "Bob",
        comment: "I hate it!"
    }
];
//Create get request
app.get('/comments', (req, res) => {
    res.json(comments);
});
//Create post request
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});
//Create put request
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const newComment = req.body;
    const comment = comments.find(comment => comment.id == id);
    comment.username = newComment.username;
    comment.comment = newComment.comment;
    res.json(comment);
});
//Create delete request
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments = comments.filter(comment => comment.id != id);
    res.json({
        id: id
    });
});
//Create static folder
app.use(express.static(path.join(__dirname, 'public')));
//Create listening port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
