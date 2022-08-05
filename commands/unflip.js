module.exports = {
	name: "unflip",
	description: "Unflips a table",
	execute(message, args) {
		args.push("┬─┬ ノ( ゜-゜ノ)")
		message.edit(args.join(" "));
	}
};