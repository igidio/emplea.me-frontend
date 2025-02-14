import CryptoJS from "crypto-js";

export const js_decrypt = (encrypted: string, key: string) => {
	return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
};