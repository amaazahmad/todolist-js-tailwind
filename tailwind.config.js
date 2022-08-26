/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./public/*.html", "./public/*.js"],
	theme: {
		extend: {
			gridTemplateRows: {
				layout: "72px minmax(300px,800px) 100px",
			},
			gridTemplateColumns: {
				xlLayout: "400px auto 400px",
				lgLayout: "200px auto 200px",
				smLayout: "20px auto 20px",
				layout: "5px auto 5px",
			},
			maxHeight: {
				155: "620px",
				"60vh": "60vh",
			},
			maxWidth: {
				130: "580px",
				"100vw": "90vw",
			},
		},
	},
	plugins: [],
};
