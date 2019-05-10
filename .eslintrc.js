module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es6': true,
		'mocha': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
		'keyword-spacing': [
			'error', 
			{'before': true, 
			'after': true}
		],
		'space-before-function-paren': ['error', 'always'],
		'space-in-parens': ['error', 'never'],
		'no-console': 0,
		'no-process-env': 0,
		'no-var': 2,
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}