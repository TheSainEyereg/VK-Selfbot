module.exports = {
	name: "ping",
	aliases: ["p"],
	description: "Проверка подключения к серверу",
	execute(message, args) {
		message.edit("Pong!");
	}
}