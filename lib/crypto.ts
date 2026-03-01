import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

export const encryptData = (text: string, pass?: string): string => {
  if (!text) return "";

  if (!pass) return text;

  try {
    const encrypted = AES.encrypt(text, pass).toString();
    return encrypted;
  } catch (e) {
    console.error("Encryption failed", e);
    return "";
  }
};

export const decryptData = (
  ciphertext: string,
  pass: string,
): string | null => {
  try {
    const bytes = AES.decrypt(ciphertext, pass);
    const originalText = bytes.toString(encUtf8);

    return originalText || null;
  } catch (_) {
    return null;
  }
};
