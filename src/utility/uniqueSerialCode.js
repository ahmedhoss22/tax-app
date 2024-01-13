const generateSerialCode=async()=> {
  // Generate a random 3-digit number
  const randomNumber = Math.floor(Math.random() * 900) + 100;

  // Generate a random alphanumeric part (6 characters)
  const randomAlphanumericPart = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  // Combine the parts to create the serial code
  const serialCode = `#${randomNumber}-${randomAlphanumericPart}`;

  return serialCode;
}

module.exports = { generateSerialCode };
