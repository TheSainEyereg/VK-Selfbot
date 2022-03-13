module.exports = {
	name: "rainbow",
	args: true,
	aliases: ["awesome", "rgb"],
	async execute(message, args) {
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		const circles = ["⚪", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫"];
		let circle;
		async function editText() {
			let circle_i = Math.floor(Math.random()*circles.length);
			if (circle_i === circles.indexOf(circle)) circle_i > circles.length-1 ? circle_i = 0 : circle_i++;
			circle = circles[circle_i];
			message.edit(`${circle} ${args.join(" ")} ${circle}`).catch();
			await delay(1000);
		}

		for (let i=0; i<5; i++) await editText();
		message.delete().catch();
	}
}