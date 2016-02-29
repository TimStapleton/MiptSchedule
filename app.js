//Initialisation
var TelegramBot = require('node-telegram-bot-api');
var token = '213925292:AAF_SY3P8hgLLrHUlt7RJCrLKFuv2y7b7NU';
var bot = new TelegramBot(token, {polling: true});

//Check for right initialisation
bot.getMe().then(function(me)
{
    console.log('Привет! Меня зовут %s!', me.first_name);
    console.log('Вот мой ID: %s.', me.id);
    console.log('А вот username: @%s.', me.username);
});

//Commands
var commands = [["/help", "Помощь с ботом, описание доступных команд"],
                ["/setgroup", "Сообщить номер своей группы для получения нужного тебе расписания"],
                ["/next", "Информация о следующей паре"],
                ["/today", "Расписание на сегодня"],
                ["/tomorrow", "Расписание на завтра"]];

var users = new Array();

//Human-like answers message
var errorMsg = "Не знаю такой команды, дружище.\nВот здесь ты можешь посмотреть список всех доступных команд:  /help";
var helpMsg = "Привет, дружище!\nЯ - бот 'Расписание МФТИ'.\nС моей помощью ты можешь быстро получить всю необходимую информацию "
            + "о предстоящих парах.\n\nУправляй мной вот этими командами:\n";
for (var i = 0; i < commands.length; i ++) helpMsg = helpMsg + "\n" + commands[i][0] + " - " + commands[i][1];

bot.on('message', function (msg) {
    //Show message
    console.log(msg);

    //Get some useful variables
    var chatId = msg.chat.id;
    var messageUsr = msg.from.username;

    //Help command
    if (msg.text.indexOf(commands[0][0]) === 0 &&
            (msg.text.length === commands[0][0].length || msg.text.charAt(commands[0][0].length) === ' '))
    {
        bot.sendMessage(chatId, helpMsg, {caption: "I'm a bot!"});
    }
    //Set group command
    else if (msg.text.indexOf(commands[1][0]) === 0 &&
            (msg.text.length === commands[1][0].length || msg.text.charAt(commands[1][0].length) === ' '))
    {
        bot.sendMessage(chatId, "Напиши номер своей группы, пожалуйста", {caption: "I'm a bot!"});
    }
    //Next command
    else if (msg.text.indexOf(commands[2][0]) === 0 &&
            (msg.text.length === commands[2][0].length || msg.text.charAt(commands[2][0].length) === ' '))
    {
        bot.sendMessage(chatId, "Вот информация о твоей следующей паре", {caption: "I'm a bot!"});
    }
    //Today command
    else if (msg.text.indexOf(commands[3][0]) === 0 &&
            (msg.text.length === commands[3][0].length || msg.text.charAt(commands[3][0].length) === ' '))
    {
        bot.sendMessage(chatId, "Вот расписание на сегодня", {caption: "I'm a bot!"});
    }
    //Tomorrow command
    else if (msg.text.indexOf(commands[4][0]) === 0 &&
            (msg.text.length === commands[4][0].length || msg.text.charAt(commands[4][0].length) === ' '))
    {
        bot.sendMessage(chatId, "Твое расписание на завтра", {caption: "I'm a bot!"});
    }
    else bot.sendMessage(chatId, errorMsg, {caption: "I'm a bot!"});
});
