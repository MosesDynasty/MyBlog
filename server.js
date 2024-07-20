const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/dynasty_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Define a schema and model
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    imageUrl: String,
    videoUrl: String
});

const Article = mongoose.model('Article', articleSchema);

// Example route to get articles
app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Example route to create an article
app.post('/articles', async (req, res) => {
    const { title, content, imageUrl, videoUrl } = req.body;

    const article = new Article({
        title,
        content,
        imageUrl,
        videoUrl
    });

    try {
        await article.save();
        res.status(201).send(article);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

