module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: '123456789012345678901234567890', callback_data: '1'},
                    {text: '123456789012345678901234567890', callback_data: '2'},
                ],
                [
                    {text: '123456789012345678901234567890', callback_data: '3'},
                    {text: '123456789012345678901234567890', callback_data: '4'}
                ]
            ]
        })
    },
    startGame: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {text: 'Давай начинать!', callback_data: '/start_game'},
                ]
            ]
        })
    }
}


