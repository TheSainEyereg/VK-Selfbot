module.exports = {
	name: "tableflip",
	description: "Flips a table",
	execute(message, args) {
		message.edit(args.map(e => e+" ").join("") + "(╯°□°）╯︵ ┻━┻");
	}
};