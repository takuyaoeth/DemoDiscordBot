const options = {
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
};

// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client(options);

// トークンの用意
const token = '{YOUR_TOKEN}'; // ここにアクセストークンを入力

// 反応するメッセージIDと絵文字
const targetMessageId = '{YOUR_MESSAGE_ID}'; // ここにリアクションを反応させるメッセージのIDを入力 30行目のconsole.logで確認可能
const targetEmoji = '☑️';

// 起動
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// 該当のメッセージに対してのリアクションをチェックする
const checkMessageReaction = async (reaction, user) => {
   const message = reaction.message
   const member = message.guild.members.resolve(user)

   // 該当のメッセージIDとリアクション（絵文字）を調べる
   console.log("messageid is... " + message.id);
   console.log("emoji is... " + reaction.emoji.name);

   if (message.id === targetMessageId && reaction.emoji.name === targetEmoji) {
     const role = message.guild.roles.cache.find(Role => Role.name === 'member')
     console.log(member.roles.member.guild.roles);
     return true;
  }
  return false;
}

// チェックするとmember権限を付与
client.on('messageReactionAdd', async (reaction, user) => {
   if(checkMessageReaction(reaction, user)) {
     const message = reaction.message;
     const member = message.guild.members.resolve(user);
     const role = message.guild.roles.cache.find(Role => Role.name === 'member');
     member.roles.add(role);
   }
});

// チェックを外すとmember権限を剥奪
client.on('messageReactionRemove', async (reaction, user) => {
   if(checkMessageReaction(reaction, user)) {
     const message = reaction.message;
     const member = message.guild.members.resolve(user);
     const role = message.guild.roles.cache.find(Role => Role.name === 'member');
     member.roles.remove(role);
   }
});

// Discordへの接続
client.login(token);
