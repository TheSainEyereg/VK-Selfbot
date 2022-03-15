module.exports = {
	name: "crossline",
	description: "Перечеркивает текст",
	args: true,
	aliases: ["зачеркнуть"],
	execute(message, args) {
		message.edit(args.join(" ").split("").join("&#0822;"));
	},
};