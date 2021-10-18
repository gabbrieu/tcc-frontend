module.exports = {
	theme: {
		colors: {
			white: '#ffffff',
			background: '#E7E9FF',
			'gray-line': '#dcdde8',
			text: '#666666',
			'text-highlight': '#b3b9ff',
			title: '#2e384d',
			red: '#e83f5b',
			'red-dark': '#d13952',
			green: '#4cd62b',
			'green-dark': '#43c026',
			blue: '#3F53FD',
			'blue-dark': '#4953b8',
			'blue-twitter': '#2aa9e0',
		},
	},
	variants: {},
	plugins: [],
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'components/**/*.vue',
			'layouts/**/*.vue',
			'pages/**/*.vue',
			'plugins/**/*.js',
			'nuxt.config.js',
			// TypeScript
			'plugins/**/*.ts',
			'nuxt.config.ts',
		],
	},
}