const { BASE_URL } = process.env;

const createVerifyEmail = (verificationToken, email) => {
  const verificationLink = `${BASE_URL}/users/verify/${verificationToken}`;
  const verificationEmail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blanc" href="${verificationLink}">Click to confirm your email</a>`,
  };

  return verificationEmail;
};

module.exports = createVerifyEmail;
