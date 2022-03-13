const fs = require("fs");

const {VK} = require("vk-io");
const {token, prefix} = require("./config.json");

const {getMessageObject} = Messages = require("./components/Messages.js");

const vk = new VK({token});

(async () => {
	const client = await vk.api.account.getProfileInfo();

	client.commands = new Map();
	for (const file of fs.readdirSync("./commands")) {
		if (!file.endsWith(".js")) continue;
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
	
	console.log(`Logged in as ${client.id} (${client.first_name} ${client.last_name})`);

	vk.updates.on("message_new", async (ctx) => {
		const message = getMessageObject(vk, ctx, {client});

		if (!message.isOutbox || !message.text.startsWith(prefix)) {
			return;
		}

		const args = message.text.slice(prefix.length).split(/ +/);
		const commandString = args.shift().toLowerCase().replace(/\ /g,"");
		if (commandString.length == 0) return;
		const command = Array.from(client.commands.values()).find(cmd => cmd.name.startsWith(commandString)) || Array.from(client.commands.values()).find(cmd => cmd.aliases && cmd.aliases.find(a => a.startsWith(commandString)))
		
		if (!command) return Messages.error(message, `Команда \"${commandString}\" не найдена.`, {timeout: 2500});

		if(args.length == 0 && command.args) return Messages.warning(message, "Arguments required!", {timeout: 2500})
		
		try {
			await command.execute(message, args);
		} catch(e) {
			console.error(e);
			return Messages.error(message, "Error in command!", {description: e, timeout: 2500});
		}

	});

	vk.updates.start()
})();