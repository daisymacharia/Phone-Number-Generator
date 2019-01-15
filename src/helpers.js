export function GenerateRandomNumbers() {
	let number = Math.floor(Math.random() * 1000000000)
	let length = 10
	function LeftPadWithZeros() {
		var str = '' + number
		while (str.length < length) {
			console.log(str.length, 'the length')

			str = '0' + str
		}
		console.log(str.length, 'the length')
		console.log(str, length)
	}
	return LeftPadWithZeros
}
