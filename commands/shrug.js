module.exports = {
	name: "shrug",
	description: "Shrugs",
	execute(message, args) {
		message.edit(args.map(e => e+" ").join("") + "¯\\_(ツ)_/¯");
	},
};