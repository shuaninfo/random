// src/index.ts
import {promisify} from "util";
import crypto from "crypto";
var randomBytesAsync = promisify(crypto.randomBytes);
var urlSafeCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~".split("");
var numericCharacters = "0123456789".split("");
var distinguishableCharacters = "CDEHKMPRTUWXY012458".split("");
var asciiPrintableCharacters = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".split("");
var alphanumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
var generateForCustomCharacters = (length, characters) => {
  const characterCount = characters.length;
  const maxValidSelector = Math.floor(65536 / characterCount) * characterCount - 1;
  const entropyLength = 2 * Math.ceil(1.1 * length);
  let string = "";
  let stringLength = 0;
  while (stringLength < length) {
    const entropy = crypto.randomBytes(entropyLength);
    let entropyPosition = 0;
    while (entropyPosition < entropyLength && stringLength < length) {
      const entropyValue = entropy.readUInt16LE(entropyPosition);
      entropyPosition += 2;
      if (entropyValue > maxValidSelector) {
        continue;
      }
      string += characters[entropyValue % characterCount];
      stringLength++;
    }
  }
  return string;
};
var generateForCustomCharactersAsync = async (length, characters) => {
  const characterCount = characters.length;
  const maxValidSelector = Math.floor(65536 / characterCount) * characterCount - 1;
  const entropyLength = 2 * Math.ceil(1.1 * length);
  let string = "";
  let stringLength = 0;
  while (stringLength < length) {
    const entropy = await randomBytesAsync(entropyLength);
    let entropyPosition = 0;
    while (entropyPosition < entropyLength && stringLength < length) {
      const entropyValue = entropy.readUInt16LE(entropyPosition);
      entropyPosition += 2;
      if (entropyValue > maxValidSelector) {
        continue;
      }
      string += characters[entropyValue % characterCount];
      stringLength++;
    }
  }
  return string;
};
var generateRandomBytes = (byteLength, type, length) => crypto.randomBytes(byteLength).toString(type).slice(0, length);
var generateRandomBytesAsync = async (byteLength, type, length) => {
  const buffer = await randomBytesAsync(byteLength);
  return buffer.toString(type).slice(0, length);
};
var allowedTypes = new Set([
  void 0,
  "hex",
  "base64",
  "url-safe",
  "numeric",
  "distinguishable",
  "ascii-printable",
  "alphanumeric"
]);
var createGenerator = (generateForCustomCharacters2, generateRandomBytes2) => {
  return ({length, type, characters}) => {
    if (!(length >= 0 && Number.isFinite(length))) {
      throw new TypeError("Expected a `length` to be a non-negative finite number");
    }
    if (type !== void 0 && characters !== void 0) {
      throw new TypeError("Expected either `type` or `characters`");
    }
    if (characters !== void 0 && typeof characters !== "string") {
      throw new TypeError("Expected `characters` to be string");
    }
    if (!allowedTypes.has(type)) {
      throw new TypeError(`Unknown type: ${type}`);
    }
    if (type === void 0 && characters === void 0) {
      type = "hex";
    }
    if (type === "hex" || type === void 0 && characters === void 0) {
      return generateRandomBytes2(Math.ceil(length * 0.5), "hex", length);
    }
    if (type === "base64") {
      return generateRandomBytes2(Math.ceil(length * 0.75), "base64", length);
    }
    if (type === "url-safe") {
      return generateForCustomCharacters2(length, urlSafeCharacters);
    }
    if (type === "numeric") {
      return generateForCustomCharacters2(length, numericCharacters);
    }
    if (type === "distinguishable") {
      return generateForCustomCharacters2(length, distinguishableCharacters);
    }
    if (type === "ascii-printable") {
      return generateForCustomCharacters2(length, asciiPrintableCharacters);
    }
    if (type === "alphanumeric") {
      return generateForCustomCharacters2(length, alphanumericCharacters);
    }
    if (characters.length === 0) {
      throw new TypeError("Expected `characters` string length to be greater than or equal to 1");
    }
    if (characters.length > 65536) {
      throw new TypeError("Expected `characters` string length to be less or equal to 65536");
    }
    return generateForCustomCharacters2(length, characters.split(""));
  };
};
var random = createGenerator(generateForCustomCharacters, generateRandomBytes);
random.async = createGenerator(generateForCustomCharactersAsync, generateRandomBytesAsync);
var src_default = random;
export {
  src_default as default
};
