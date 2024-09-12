import CryptoJS from "crypto-js";
const key = "P455P0R7_J5_K3Y";

export const js_encrypt = (message: string) => {
	CryptoJS.AES.encrypt(message, key).toString();
};

export const js_decrypt = (encrypted: string) => {
	return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
};
