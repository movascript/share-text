import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "node:crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;
const SALT_LENGTH = 16;
const KEY_LENGTH = 32;

const deriveKey = (pass: string, salt: Buffer): Buffer => {
  return scryptSync(pass, salt, KEY_LENGTH);
};

export const encryptData = (text: string, pass: string): string => {
  if (!text || !pass) return "";

  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);
  const key = deriveKey(pass, salt);

  const cipher = createCipheriv("", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  // Format: salt(16) + iv(16) + ciphertext → base64
  return Buffer.concat([salt, iv, encrypted]).toString("base64");
};

export const decryptData = (
  ciphertext: string,
  pass: string,
): string | null => {
  try {
    const data = Buffer.from(ciphertext, "base64");

    const salt = data.subarray(0, SALT_LENGTH);
    const iv = data.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const encrypted = data.subarray(SALT_LENGTH + IV_LENGTH);

    const key = deriveKey(pass, salt);

    const decipher = createDecipheriv(ALGORITHM, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8") || null;
  } catch (_) {
    return null; // wrong password or corrupted data
  }
};
