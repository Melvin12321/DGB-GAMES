const Discord = require("discord.js")
const TOKEN = "NDE2OTQ3NTY2NjE0MjgyMjQz.DXL4Ng.G7twlFaX8DLRRgJDw7fKuZQ9lOg"
const PREFIX = "/"
const msg = 'message'
const { version } = require("discord.js")

const client = new Discord.Client();



client.on("ready", function() {
  console.log(`DGB-Games bot is online!`)

  client.user.setStatus(`Online`);
  client.user.setActivity('DGB-Games', {  type: 'WATCHING'});

})


client.on("message", async message => {
      if (message.author.bot) return;
      if (message.content === 'ReactionTest') {
        message.channel.send('Succesfully!');

}

client.on("guildMemberAdd", member => {
  var role = member.guild.roles.find('name', 'Member');

  member.addRole(role)

});  
  
  
if(message.content.indexOf(PREFIX) !== 0) return;
const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command === "ping") {
    const msg = await message.channel.send("Pinging...");
    msg.edit(`${msg.createdTimestamp - message.createdTimestamp}ms.`);
    const ping = msg.createdTimestamp - message.createdTimestamp;
    msg.delete();
    const embed = new Discord.RichEmbed()
    .addField('Ping', `${ping}ms :ping_pong: `);

    message.channel.send(embed);

}

if(command === "botinfo") {

    const embed = new Discord.RichEmbed()
    .setDescription("__**Bot Informatie:**__")
    .setColor(0x0B97DE)
    .addField("Bot naam:", "DGB-Games-bot")
    .addField("Gemaakt op:", "24-02-2018")
    .addField("Gemaakt door:", "@Melvin#7592 | @ItsDerpyAron#9620")
    .addField("Prefix:", "/")
    .addField("Versie:", "1.5.5 [BETA]")
    .addField("Copyright:", "*DGB-Games© Copyright 2018 - 2019*")

    return message.channel.send(embed)
};


if(command === "help") {

    const embed = new Discord.RichEmbed()
    .setDescription("__**DGB-Games Command List:**__")
    .setColor(0x0B97DE)
    .addField(":pushpin: /help", "==========")
    .addField(":clipboard: /botinfo", "==========")
    .addField(":ping_pong: /ping", "==========")
    .addField(":video_camera: /youtube", "==========")
    .addField(":question: /report", "==========")
    .addField(":hammer: /warn", "==========")
    .addField(":pencil2: /clear", "==========")
    .addField("Copyright:", "*DGB-Games© Copyright 2018 - 2019*")
    .setTimestamp()

    return message.channel.send(embed)
}

  if(command === 'warn') {

    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send("Ik kan deze gebruiker niet vinden");
    if (!message.member.roles.find("name", "BotPerms"))
      return message.reply(':no_entry: Je hebt geen toegang tot dit commando! :no_entry:');
    let wreason = args.join("  ").slice(22);

    let warnEmbed = new Discord.RichEmbed()
    .setColor("#ff0800")
    .addField("**Warn**", `**Gewarnde gebruiker:** ${wUser}\n\n**Gewarned door:** ${message.author.username}#${message.author.discriminator}\n\n**Gewarned in:** ${message.channel}\n\n**Reden:** ${wreason}\n\n`)
    .addField("Copyright:", "*DGB-Games© Copyright 2018 - 2019*")
    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("Ik kan de logs channel niet vinden.");

    message.delete().catch(O_o=>{});
    logs.send(warnEmbed);

    return;
  }

  if(command === "report") {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(":warning: Ik kan deze gebruiker niet vinden");
    let wreason = args.join("  ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setColor("#ff0800")
    .addField("**Report**", `**Reported gebruiker:** ${rUser}\n\n**Reported door:** ${message.author.username}#${message.author.discriminator}\n\n**Reported in:** ${message.channel}\n\n**Reden:** ${wreason}\n\n`)
    .addField("Copyright\n", "DGB-Games© Copyright 2018 - 2019")
    let logs = message.guild.channels.find(`name`, "reports");
    if(!logs) return message.channel.send("Ik kan de logs channel niet vinden.");

    message.delete().catch(O_o=>{});
    const msg = message.channel.send("Je report is ingediend! Onze staff zal zo snel mogelijk uitzoeken wat er aan de hand is!")
    console.log(`========================\nAlert!\n========================\nEr is een nieuw report binnengekomen!\nReported door: ${message.author.username}\n========================\n`)
    logs.send(reportEmbed);

    return;

  }

  if(command === "addmod") {

    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!aUser) return message.channel.send(":warning: Ik kan deze gerbuiker niet vinden");
    if (!message.member.roles.find("name", "BotPerms"))
      return message.reply(':no_entry: Je hebt geen toegang tot dit commando! :no_entry:');

    let addmodEmbed = new Discord.RichEmbed()
    member.addrole(member.guild.roles.find("name", "BotPerms"));

    logs.send(addmodEmbed);

    return;

  }

  if(command === 'youtube') {
    const msg = message.channel.send("https://www.youtube.com/channel/UCDLu_HClTVFhok3XwrO8tHw");
  }
  
  if(command === 'admin') {
    let adminEmbed = new Discord.RichEmbed()
    .setImage("https://cdn.discordapp.com/attachments/363329115958542336/419796791765237761/dc_1.jpeg")

    return;
  }

if (command === 'clear') {

    if (!message.member.roles.find("name", "BotPerms")) {
      return message.channel.send(':no_entry: Je hebt geen toegang tot dit commando! :no_entry:');
    }

    if (isNaN(args[0])) {
        message.channel.send(':warning: Geef een aantal berichten op dat je wilt deleten!');
        return;
    }

    const fetched = await message.channel.fetchMessages({limit: args[0]});
    console.log(fetched.size + ' messages found, deleting...');

    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Error: ${error}`));
      message.channel.send('Ik heb ' + fetched.size + ' berichten verwijderd!')
      message.delete();
}
  
  if(command === 'say') {
    if (!message.member.roles.find("name", "BotPerms"))
      return message.reply(':no_entry: Je hebt geen toegang tot dit commando! :no_entry:');
    const sayMessage = args.join("  ");
    const sayEmbed = new Discord.RichEmbed()
    .setColor(0x0B97DE)
    .addField("Nieuwe Melding!", sayMessage)
    .setTimestamp()
    message.delete().catch(O_o=>{});
    message.channel.send(sayEmbed)
}

   if(command === 'youtuber_say') {
    if (!message.member.roles.find("name", "YouTuber"))
      return message.reply(':no_entry: Je hebt geen toegang tot dit commando! :no_entry:');
    const sayMessage = args.join("  ");
    const sayEmbed = new Discord.RichEmbed()
    .setColor(0x0B97DE)
    .addField("__**Nieuwe YouTuber Melding!**__", sayMessage)
    .addField("Geschreven door:", `${message.author.username}`)
    .setTimestamp()
    message.delete().catch(O_o=>{});
    message.channel.send(sayEmbed)
} 
   
});
client.login(TOKEN);
