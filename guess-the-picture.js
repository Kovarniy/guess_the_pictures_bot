const { pictures, statistics } = require('./db');
const { createButtons } = require('./options');
const { messages, stickers } = require("./resources");
const { choseAfterEndGame } = require('./options');

const trueAnswer = (userName) => {
    statistics[userName].countTrueAnswersOfCurrentAttepmt += 1;
    statistics[userName].seriesOfCorrectAnswers += 1;
};

const falseAnswer = (userName) => {
    statistics[userName].seriesOfCorrectAnswers = 0;
    return statistics[userName].countOfAttempt -= 1;
};

const checkAnswer = async (bot, chatId, resultOfAnswer, userName) => {
    if (resultOfAnswer === 'true') {
        console.log('true')
        trueAnswer(userName);
        const seriesOfCorrectAnswers = statistics[userName].seriesOfCorrectAnswers;
        console.log(statistics)

        if (seriesOfCorrectAnswers === 2) {
            await bot.sendSticker(chatId, stickers.happyRobotPainter);
            await bot.sendMessage(chatId, messages.seriesOfCorrectAnswers(seriesOfCorrectAnswers));
        }
    } else {
        console.log('false')
        const countOfAttempts = falseAnswer(userName);
        console.log(statistics)

        if (countOfAttempts === 0) {
            await bot.sendSticker(chatId, stickers.sadRobotPainter)
            await bot.sendMessage(chatId, messages.endOfGame(userName), choseAfterEndGame);

            if (statistics[userName].countTrueAnswersOfCurrentAttepmt > statistics[userName].bestResult) {
                statistics[userName].bestResult = statistics[userName].countTrueAnswersOfCurrentAttepmt;
            }

            return;
        }

        await bot.sendMessage(chatId, messages.countOfAttempts(countOfAttempts))
    }
    await askQuestion(bot, chatId);
};

const newGame = async (bot, chatId, userName) => {
    statistics[userName] = {};
    statistics[userName].countOfAttempt = 3;
    statistics[userName].countTrueAnswersOfCurrentAttepmt = 0;
    statistics[userName].seriesOfCorrectAnswers = 0;
    // TODO Убрать инициализирование лучшего результата
    statistics[userName].bestResult = 0;

    console.log('new Game')
    console.log(statistics)
    await askQuestion(bot, chatId);
};

const askQuestion = async (bot, chatId) => {
    const imageId = Math.floor((Math.random() * 9));
    const picture = pictures[imageId];

    await bot.sendPhoto(chatId, picture.link);
    const answerButtons = createButtons(picture.nameVariants);
    await bot.sendMessage(chatId, picture.author, answerButtons);
}

const printStatistics = async (bot, chatId, userName) => {
    statistics[userName] = statistics[userName] ? statistics[userName] : {};
    statistics[userName].bestResult = statistics[userName].bestResult ? statistics[userName].bestResult : 0;
    await bot.sendMessage(chatId, messages.bestAttempt(statistics[userName].bestResult));
}

module.exports = {
    trueAnswer,
    falseAnswer,
    checkAnswer,
    newGame,
    askQuestion,
    printStatistics
}
