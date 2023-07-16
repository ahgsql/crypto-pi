# crypto-pi

[![npm version](https://badge.fury.io/js/crypto-pi.svg)](https://badge.fury.io/js/crypto-pi)

crypto-pi is an npm module that provides text encryption and decryption based on the positions of character codes within the mathematical constant π (pi). It uses the char codes index inside the π number to crypt the text and then can be decrypted back to its original form.

## Installation

To use crypto-pi in your Node.js project, you can install it using npm:

```bash
npm install crypto-pi
```

## Usage

Import the module and use the provided functions to encrypt and decrypt your text.

```javascript
import { encrypt, decrypt } from "crypto-pi";

(async () => {
	const text = "Hello, world!";
	const encryptedText = await encrypt(text);
	console.log("Encrypted:", encryptedText);

	let result = await decrypt(encryptedText); // This will log "Hello, world!" to the console
	console.log(result);
})();
```

## How it works

The module knows the first million chars of π (pi) from a local file called `pi.txt`, which should contain the digits of π (pi). The functions `crypt` and `decrypt` use this information to perform the encryption and decryption processes.

### Encryption process

1. For each character in the input text, the module finds the index of its char code within the π (pi) digits.
2. It concatenates the found indexes into a single string, separating each index with a dot (`.`).
3. It also appends two more dot-separated strings to the result string. The first string contains the length of each char code, and the second string contains the length of each index string.

### Decryption process

1. The decryption process begins by splitting the input string into three parts using the dots (`.`) as separators.
2. The first part contains the concatenated indexes of the char codes within the π (pi) digits.
3. The second part contains the length of each char code in the original text.
4. The third part contains the length of each index in the first part.
5. The module then iterates over the lengths in the second part to extract each char code index and its length from the first part.
6. It looks up the corresponding char code from the π (pi) digits using the extracted index and length.
7. The decrypted char codes are then converted back to characters, resulting in the original text.

## Limitations

Please note that this encryption method is not intended for strong security purposes. It is primarily a fun and creative approach to encrypting text based on the position of character codes in the π (pi) number.

## Contributing

Contributions to the crypto-pi module are welcome! If you find any issues or want to add new features, please feel free to create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
