const TelegramApi = require('node-telegram-bot-api');
const { messages, stickers} = require('./resources');
const { startGame } = require('./options');
const { newGame, checkAnswer, printStatistics} = require('./guess-the-picture');

const token = '5861491978:AAHCLzpYavl8c4xZU5lopi8cuNOfhn9R06Y';
const bot = new TelegramApi(token, {polling: true});

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/start_game', description: 'Начать игру'},
    {command: '/statistics', description: 'Посмотреть статистику'}
]);

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
        await bot.sendMessage(chatId, messages.startGame1);
        setTimeout(() => {
            bot.sendMessage(chatId, messages.startGame2);
        }, 2000);
        setTimeout(() => {
            bot.sendMessage(chatId, messages.startGame3, startGame);
        }, 4500);
        return;
    }

    if (text === '/start_game') {
        await newGame(bot, chatId, msg.from.username);
        return;
    }

})

bot.on('callback_query',  async msg => {
    const chatId = msg.message.chat.id;
    if (msg.data === 'true' || msg.data === 'false') {
        await checkAnswer(bot, chatId, msg.data, msg.from.username);
    }

    if (msg.data === '/statistics') {
        await printStatistics(bot, chatId, msg.from.username);
        return;
    }

    if (msg.data === '/start_game') {
        await newGame(bot, chatId, msg.from.username);
        return;
    }

})
