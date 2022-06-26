module.exports = {
	name: "unflip",
	description: "Unflips a table",
	execute(message, args) {
		message.edit(args.map(e => e+" ").join("") + "┬─┬ ノ( ゜-゜ノ)");
	}
};