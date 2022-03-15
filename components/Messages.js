function getMessageObject(vk, ctx, additional) {
	const message = ctx;
	Object.assign(message, additional);

	message.mentions = ctx.text?.match(/\[[a-z0-9]+\|[a-z0-9.@_\-]+\]/gi)?.map(mention => mention.split("|")[0].slice(1)) || []
	message.send = (content, attachment) => {
		return vk.api.messages.send({
			peer_id: ctx.peerId,
			random_id: Math.random() * 1000000000000,
			message: content,
			attachment
		});
	};
	message.edit = (content, attachment) => {
		return vk.api.messages.edit({
			peer_id: ctx.peerId,
			message_id: ctx.id,
			message: content,
			keep_forward_messages: 1,
			attachment
		});
	};
	message.delete = () => {
		return vk.api.messages.delete({
			peer_id: ctx.peerId,
			message_ids: ctx.id,
			delete_for_all: 1
		});
	}

	return message;
}

function regular(message, text, options) {
	if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
	return message.edit(text).catch();
}
function completed(message, text, options) {
	if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
	return message.edit(`${options?.color ? "🟢" : "✔"} ${text} ${options?.description ? "\n"+options.description : ""}`).catch();
}
function warning(message, text, options) {
	if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
	return message.edit(`${options?.color ? "🟡" : "⚠"} ${text} ${options?.description ? "\n"+options.description : ""}`).catch();
}
function error(message, text, options) {
	if (options?.timeout) setTimeout(_=>{message.delete().catch()}, options.timeout);
	return message.edit(`${options?.color ? "🔴" : "❌"} ${text} ${options?.description ? "\n"+options.description : ""}`).catch();
}

module.exports = {
	getMessageObject, regular, completed, warning, error
}