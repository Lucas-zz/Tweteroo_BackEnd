import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();
const port = 5000;
const totalTweetsOnScreen = 10;

app.use(cors());
app.use(json());

const users = [];
const tweets = [];

app.get('/tweets', (request, response) => {
    const filterTweets = [...tweets].reverse().slice(0, totalTweetsOnScreen);
    response.send(filterTweets);
});

app.post('/sign-up', (request, response) => {
    const user = request.body;

    users.push(user);
    response.send('OK');
});

app.post('/tweets', (request, response) => {
    const tweet = request.body;
    const { avatar } = users.find(user => user.username === request.body.username);

    tweets.push({ ...tweet, avatar });
    response.send('OK');
});

app.listen(port, () => {
    console.log(`Servidor ${chalk.bgGreen(chalk.black(' ON '))} - Porta ${chalk.magenta(port)} - ${chalk.blue(`http://localhost:${port}/`)}`);
});
