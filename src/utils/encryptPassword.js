const { createCipheriv, randomBytes } = require("crypto");

const iv = randomBytes(16);

const encryptPassword = (password) => {
  const cipher = createCipheriv(process.env.ALGORITHM, process.env.KEY, iv);

  let encryptedPassword = cipher.update(password, "utf-8", "hex");
  encryptedPassword += cipher.final("hex");

  const base64data = Buffer.from(iv, "binary").toString("base64");

  return {
    iv: base64data,
    encryptedPassword,
  };
};

module.exports = encryptPassword;
