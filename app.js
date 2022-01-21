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

let globalTweets;


app.get('/tweets', (request, response) => {
    // response.send(() => {
    //     for (i = 0; i < totalTweetsOnScreen; i++) {
    //         tweets[i];
    //     }
    // });

    let listOfTweets = [];
    globalTweets = listOfTweets;

    for (let i = 0; i < totalTweetsOnScreen; i++) {

        if (i > tweets.length - 1) {
            response.send(globalTweets);
        } else {
            let tweet = {
                "username": tweets[i].username,
                "avatar": users.find((user) => user.username === tweets[i].username).avatar,
                "tweet": tweets[i].tweet,
            };

            listOfTweets.push(tweet);
        }
    }

    response.send(globalTweets);
});

app.post('/sign-up', (request, response) => {
    const user = request.body;

    users.push(user);
    response.send('OK');
});

app.post('/tweets', (request, response) => {
    const tweet = request.body;

    tweets.push(tweet);
    response.send('OK');
});

app.listen(port, () => {
    console.log(`Servidor ${chalk.bgGreen(chalk.black(' ON '))} - Porta ${chalk.magenta(port)} - ${chalk.blue(`http://localhost:${port}/`)}`);
});