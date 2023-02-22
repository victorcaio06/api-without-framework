const { createDecipheriv } = require("crypto");

const decryptPassword = (encryptedPassword, iv) => {
  const originalData = Buffer.from(iv, "base64");

  const decipher = createDecipheriv(
    process.env.ALGORITHM,
    process.env.KEY,
    originalData
  );
  let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf-8");
  decryptedPassword += decipher.final("utf8");

  return decryptedPassword;
};

module.exports = decryptPassword;
