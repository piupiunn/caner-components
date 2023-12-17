function findLongestWord(sentence) {
  // Split the input sentence into an array of words using space as a delimiter
  const words = sentence.split(" ");
  let longestWord = ""; // Variable to store the longest word
  let maxVowels = 0; // Variable to store the maximum number of vowels found

  // Iterate through each word in the array
  for (const word of words) {
    // Remove non-alphabet characters and convert to lowercase
    const cleanedWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const vowels = cleanedWord.match(/[aeiou]/g); // Count vowels in the word

    // Check if the current word is longer than the longest word found so far
    if (cleanedWord.length > longestWord.length) {
      longestWord = cleanedWord; // Update the longest word
      maxVowels = vowels ? vowels.length : 0; // Update the maximum vowel count
    } else if (cleanedWord.length === longestWord.length) {
      // If the current word has the same length as the longest word
      if (vowels && vowels.length > maxVowels) {
        longestWord = cleanedWord; // Update the longest word
        maxVowels = vowels.length; // Update the maximum vowel count
      }
    }
  }

  return longestWord; // Return the longest word found
}

// Test cases
const testCases = [
  "I learn everything and I have more experience.", // "experience" has the most vowels.
  "Gyms, cry, hmmm", // Two matched word.
  "A gym", // All vowel one word and without vowel one word.
  "12345 67890", // No valid words, only numbers and spaces.
];

for (const input of testCases) {
  const longestWord = findLongestWord(input);
  console.log(`Input: "${input}"\nLongest Word: "${longestWord}"\n`);
}
