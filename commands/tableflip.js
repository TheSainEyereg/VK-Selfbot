module.exports = {
	name: "tableflip",
	description: "Flips a table",
	execute(message, args) {
		args.push("(╯°□°）╯︵ ┻━┻")
		message.edit(args.join(" "));
	}
};