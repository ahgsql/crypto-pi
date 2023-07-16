import test from "ava";
import { encrypt, decrypt } from "./index.js";

test("encrypt", async (t) => {
	t.is(
		await encrypt("pi is awesome"),
		"7105016509221613495853922154207853.3323322333333.3222322333333"
	);
});
test("decrypt", async (t) => {
	t.is(
		await decrypt(
			"7105016509221613495853922154207853.3323322333333.3222322333333"
		),
		"pi is awesome"
	);
});
