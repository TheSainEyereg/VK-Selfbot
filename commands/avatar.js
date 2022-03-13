module.exports = {
	name: "avatar",
	aliases: ["аватар"],
	description: "Показывает аватар пользователя",
	async execute(message, args) {
		const user = message.mentions[0] || message.client.id;
		const userInfo = await message.api.users.get({user_ids: user, fields: "photo_max_orig"});
		const attachment = await message.upload.messagePhoto({
			source: {
				values: [{
					value: userInfo[0].photo_max_orig,
				}]
			}
		});
		await message.edit(`Аватар пользователя ${userInfo[0].first_name} ${userInfo[0].last_name}:`, attachment);
	}
}