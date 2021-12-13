const operadores = ["+", "*", "-", "/"];
//isOperator checks if a given character is an operator
const isOperador = char => operadores.includes(char);
const operacionesBasicas = {
	"/": (a, b) => {
		return a === 0 || b === 0 ? 'No se puede dividir entre cero' : b > 1 ? [...Array(a).keys()].reduce((acc, num) => multiplication(num, b) <= a ? adition(acc, 1) : acc, -1) : a;
	},
	"*": (a, b) => {
		return b >= 0 ? [...Array(b)].reduce((acc) => adition(acc, a), 0) : [...Array(a)].reduce((acc) => adition(acc, b), 0);
	},
	"+": (a, b) => a + b,
	"-": (a, b) => a - b,
}

const juntarOperaciones = (resultadoAcumulado, i) => {
	if (i === -1) return resultadoAcumulado;
	const resultado = operacionesBasicas[resultadoAcumulado[i]](+resultadoAcumulado[i-1], +resultadoAcumulado[i+1]);
	return resultadoAcumulado.map((item, j) => i - 1 === j ? resultado : item)
	.filter((item, j) => j < i || j > i + 1);
}

const siguienteOperador = resultadoAcumulado => {
	const nextIndex = resultadoAcumulado.findIndex(operator => ["*", "/"].includes(operator));
	return nextIndex !== -1 ? 
	nextIndex : 
	resultadoAcumulado.findIndex(operator => ["+", "-"].includes(operator));
}

const calcular = (resultadoAcumulado) => {
	if (resultadoAcumulado.length === 1) return resultadoAcumulado[0];
	return calcular(juntarOperaciones(resultadoAcumulado, siguienteOperador(resultadoAcumulado)))
}


const formatearOperaciones = (stringOperaciones, arr = "") => {
	if (!stringOperaciones) return arr.split(" ");
	return formatearOperaciones(
		stringOperaciones.slice(1),
		arr.concat(isOperador(firstChar) ? ` ${stringOperaciones[0]} ` : stringOperaciones[0])
	)
}

/* takes a calculation string and returns a result */
const calculate = calculationString => {
	const calculation = formatearOperaciones(calculationString)
	return calcular(calculation, siguienteOperador(calculation));
}

console.log(calculate("13+6*2"));