const TelegramApi = require('node-telegram-bot-api');
const { messages, stickers }  = require('./resources');
const token = '5861491978:AAHCLzpYavl8c4xZU5lopi8cuNOfhn9R06Y';

const bot = new TelegramApi(token, {polling: true});

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
        await bot.sendMessage(chatId, messages.startGame1);
        setTimeout(() => {
            bot.sendMessage(chatId, messages.startGame2);
        }, 2000);
        setTimeout(() => {
            bot.sendMessage(chatId, messages.startGame3);
        }, 4500);
    }
    // отправка стикера
    // bot.sendSticker(chatId, stickers.sadRobotPainter);

})
