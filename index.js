#!/usr/bin/env node

const process = require("node:process");

// Define character lists for the various modifiers
const lowercase_letters = "abcdefghijklmnopqrstuvwxyz";
const uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Get the user arguments
const userArguments = process.argv.slice(2);

// Print the help message
function printHelpMessage() {
  console.log(`
Usage:
    password-generator [modifiers]
Available modifiers:
    --length <number>  Set a custom length for the password (default is 8)
    --uppercase        Use uppercase letters in the password
    --numbers          Use numbers in the password
    --symbols          Use symbols in the password
    --help             Print this help message
Example:
    password-generator --length 12 --uppercase --numbers
Output:
    Requested password length: 12
    Selected modifiers: uppercase, numbers
    Generated password: 1A2B3C4D5E6
  `);
}

if (userArguments.includes("--help")) {
  printHelpMessage();
  return;
}

// Set the default length and modifiers
let length = 8;
let modifiers = [];

// Check if --length modifier is present and set the length accordingly
if (userArguments.includes("--length")) {
  const lengthIndex = userArguments.indexOf("--length");
  if (isNaN(userArguments[lengthIndex + 1])) {
    length = 8;
  } else if (userArguments[lengthIndex + 1] < 1) {
    console.log(
      "The length of the password must be either blank (defaulting to 8 characters) or at least 1."
    );
    return;
  } else {
    length = userArguments[lengthIndex + 1];
  }
}

// Set the character list based on the modifiers
function setCharacterList() {
  // Set the default character list to lowercase letters only
  let character_list = lowercase_letters;

  // Check for the presence of modifiers and add their respective character lists to the possible characters
  if (userArguments.includes("--uppercase")) {
    character_list += uppercase_letters;
    modifiers.push("uppercase");
  }

  if (userArguments.includes("--numbers")) {
    character_list += numbers;
    modifiers.push("numbers");
  }

  if (userArguments.includes("--symbols")) {
    character_list += symbols;
    modifiers.push("symbols");
  }

  return character_list;
}

const character_list = setCharacterList();

// Generate a password based on the character list and length
function generatePassword(length, character_list) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const random_character =
      character_list[Math.floor(Math.random() * character_list.length)];
    password += random_character;
  }
  return password;
}

// Print the user inputs and the generated password to the console
function printPassword() {
  console.log(`
        Requested password length: ${length}
        Selected modifiers: ${modifiers.join(", ")}
        Generated password: ${generatePassword(length, character_list)}
        `);
}

// Call the printPassword function
printPassword(length);
