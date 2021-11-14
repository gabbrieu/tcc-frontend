module.exports = {
	theme: {
		colors: {
			white: '#ffffff',
			background: '#F7F7FC',
			'gray-line': '#dcdde8',
			text: '#666666',
			'text-highlight': '#b3b9ff',
			title: '#2e384d',
			red: '#e83f5b',
			'red-dark': '#d13952',
			green: '#77c277',
			'green-dark': '#43c026',
			blue: '#3F53FD',
			'blue-dark': '#4953b8',
			'blue-twitter': '#2aa9e0',
			'kanban-column-title': '#47484F',
			'border-color': '#E7E9FF',
			'light-gray': '#CBD5E0',
			gray: '#757373',
			'priority-very-low': '#CBD5E0',
			'priority-low': '#3F53FD',
			'priority-medium': '#FFFF00',
			'priority-high': '#ffa500',
			'priority-urgent': '#FA0000',
		},
		extend: {
			spacing: {
				9.5: '2.375rem',
			},
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
};
