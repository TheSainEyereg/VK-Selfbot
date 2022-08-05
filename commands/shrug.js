module.exports = {
	name: "shrug",
	description: "Shrugs",
	execute(message, args) {
		args.push("¯\\_(ツ)_/¯")
		message.edit(args.join(" "));
	},
};