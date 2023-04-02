module.exports = {
    createButtons: (variants) => {
        variants.sort(() => Math.random() - 0.5);
        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {text: '' + variants[0].name, callback_data: '' + variants[0].isTrue },
                        {text: '' + variants[1].name, callback_data: '' + variants[1].isTrue },
                    ],
                    [
                        {text: '' + variants[2].name, callback_data: '' + variants[2].isTrue },
                        {text: '' + variants[3].name, callback_data: '' + variants[3].isTrue },
                    ]
                ]
            })
        }
    },
    startGame: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Давай начинать!', callback_data: '/start_game'},
                ]
            ]
        })
    },
    choseAfterEndGame: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Играть еще раз', callback_data: '/start_game'},
                    {text: 'Посмотреть статистику', callback_data: '/statistics'}
                ]
            ]
        })
    },
}


