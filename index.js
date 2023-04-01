const TelegramApi = require('node-telegram-bot-api');
const { messages, stickers } = require('./resources');
const { gameOptions, startGame} = require('./options');

const token = '5861491978:AAHCLzpYavl8c4xZU5lopi8cuNOfhn9R06Y';
const bot = new TelegramApi(token, {polling: true});

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/start_game', description: 'Начать игру'},
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
        bot.sendPhoto(chatId, 'C:\\guess_the_pictures_bot\\1.jpg');
        // await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
        return;
    }

    // bot.sendSticker(chatId, stickers.sadRobotPainter);
})

bot.on('callback_query', msg => {
    const callBackData = msg.data;
    const chatId = msg.message.chat.id;

    bot.sendMessage(chatId, callBackData);
    return;
})
