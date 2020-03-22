// References:
//   - https://blog.cryptographyengineering.com/2012/12/28/the-anatomy-of-bad-idea/
//   - http://qnimate.com/asymmetric-encryption-using-web-cryptography-api/

export default async function encryptPayload(payload) {
  const crypto = window.crypto || window.msCrypto;

  if (!crypto) {
    throw new Error("Browser crypto engine not available");
  }

  const subtle = crypto.subtle || crypto.webkitSubtle;
  if (!subtle) {
    throw new Error("Browser crypto engine not available");
  }

  console.log("Input data:", payload);

  //Parameters:
  //1. Asymmetric Encryption algorithm name and its requirements
  //2. Boolean indicating extractable. which indicates whether or not the raw keying material may be exported by the application (http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey-slot-extractable)
  //3. Usage of the keys. (http://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-types)
  const key = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: {
        name: "SHA-256",
      },
    },
    true,
    ["encrypt", "decrypt"]
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    key.publicKey,
    convertStringToArrayBufferView(payload)
  );

  console.log("My encrypted data:", encrypted);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    key.privateKey,
    encrypted
  );

  const decryptedArray = new Uint8Array(decrypted);
  console.log("Decrypted data, raw:", decrypted);
  console.log("Decrypted data:", convertArrayBufferViewtoString(decryptedArray));
}

function convertStringToArrayBufferView(str) {
  const bytes = new Uint8Array(str.length);
  for (let iii = 0; iii < str.length; iii++) {
    bytes[iii] = str.charCodeAt(iii);
  }

  return bytes;
}

function convertArrayBufferViewtoString(buffer) {
  let str = "";
  for (let iii = 0; iii < buffer.byteLength; iii++) {
    str += String.fromCharCode(buffer[iii]);
  }
  return str;
}
