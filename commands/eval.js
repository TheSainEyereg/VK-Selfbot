const Messages = require("../components/Messages");

module.exports = {
	name: "eval",
	aliases: ["run"],
	description: "Запускает код",
	async execute(message, args) {
		const code = args.join(" ");
		const isPromise = v => typeof v === "object" && typeof v.then === "function";
		const dontSend = code.includes("message.edit(") || code.includes("message.delete(") || code.includes("Messsages.")
		try {
			const evaled = eval(code);
			if (isPromise(evaled)) {
				evaled.then(r => {
					if (dontSend) return;
					Messages.completed(message, "Promise resolved!", {
						description: r,
						timeout: 2500
					});
				}).catch(e => {
					Messages.error(message, "Promise rejected!", {
						description: e,
						timeout: 2500
					});
				});
			} else {
				if (dontSend) return;
				Messages.completed(message, "Eval successful!", {
					description: evaled,
					timeout: 2500
				});
			}
		} catch (e) {
			Messages.error(message, "Eval error!", {description: e, timeout: 2500});
		}
	}
}