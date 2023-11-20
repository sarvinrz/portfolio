function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Convert number to string and split it into an array of digits
  const digitsArray = n.toString().split("");

  // Reverse the array for easier insertion of commas from right to left
  digitsArray.reverse();

  // Use map to convert each digit to its Farsi equivalent
  const farsiArray = digitsArray.map((digit, index) => {
    if (index > 0 && (index + 1) % 4 === 0) {
      // Insert a comma after every three digits (except for the first group)
      return farsiDigits[digit] + ",";
    } else {
      return farsiDigits[digit];
    }
  });

  // Reverse the array again to get the correct order
  farsiArray.reverse();

  // Join the array into a string
  return farsiArray.join("");
}

export default toFarsiNumber;
