const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const shell = require('shelljs')
const { GenerateRandomNumbers } = require('./helpers')

const init = () => {
	console.log(
		chalk.green(
			figlet.textSync('RANDOM NUMBER GENERATOR', {
				font: 'banner',
				horizontalLayout: 'default',
				verticalLayout: 'default',
			})
		)
	)
}

const askQuestions = () => {
	const questions = [
		{
			name: 'FILENAME',
			type: 'input',
			message: 'What is the name of the file without extension?',
		},
	]
	return inquirer.prompt(questions)
}

const createFile = filename => {
	const filePath = `${process.cwd()}/${filename}.csv`
	shell.touch(filePath)
	return filePath
}

const success = (filepath, numbers) => {
	console.log(chalk.white.bgGreen.bold(`Done! File created at ${filepath}`))
	console.log(chalk.white.bgGreen.bold(`Done! Number created ${numbers}`))
}

const run = async () => {
	// show script introduction
	init()

	// ask questions
	const answers = await askQuestions()
	const { FILENAME } = answers

	// create the file
	const filePath = createFile(FILENAME)

	// generate random number
	const numbers = GenerateRandomNumbers()()

	// show success message
	success(filePath, numbers)
}

run()
