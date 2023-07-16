import fs from "node:fs";
import { fileURLToPath } from "url";
import path, { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
let PIString = "";
let ready = false;
fs.readFile(path.resolve(__dirname, "pi.txt"), "utf8", (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	PIString = data;
	ready = true;
});

const charCode = (c) => c.charCodeAt();

function until(cond) {
	const wt = (resolve) => {
		if (cond()) resolve();
		else setTimeout((_) => wt(resolve), 100);
	};

	return new Promise(wt);
}

async function encrypt(string) {
	await until((_) => ready == true);
	const charMap = {};
	let result = "";
	let endResult = "";
	let indexResult = "";
	for (let char of string) {
		//map
		let index = charMap[char]
			? charMap[char]
			: getIndexNumber(PIString, charCode(char).toString());

		result += index.toString();
		endResult += `${charCode(char)}`.length;
		indexResult += `${index}`.length;

		//map
		if (!charMap[char]) charMap[char] = index.toString();
	}
	return result + "." + endResult + "." + indexResult;
}

async function decrypt(string) {
	await until((_) => ready == true);
	let numbers = string.split(".")[0];
	let lengths = string.split(".")[1];
	let searchLengths = string.split(".")[2];
	let indexCumulative = 0;
	const charMap = {};
	let result = "";
	for (let c = 0; c < lengths.split("").length; c++) {
		const codeLength = lengths[c];
		let searchLength = searchLengths[c];
		let num = numbers.substr(indexCumulative, searchLength);
		await until((_) => ready == true);
		indexCumulative += parseInt(searchLength);

		let char = await getNumber(PIString, num, codeLength);

		result += String.fromCharCode(char);
	}

	return result;
}

async function getNumber(txt, index, length) {
	await until((_) => ready == true);
	return txt.substr(index, length);
}
function getIndexNumber(txt, search) {
	const start = search.charAt(0);
	for (let i = 0; i < txt.length; i++) {
		if (txt.charAt(i) === start) {
			let found = true;
			for (let j = 1; j < search.length; j++) {
				if (txt.charAt(i + j) !== search.charAt(j)) {
					found = false;
					break;
				}
			}
			if (found) {
				return i;
			}
		}
	}

	return -1;
}

export { encrypt, decrypt };
export default encrypt;
