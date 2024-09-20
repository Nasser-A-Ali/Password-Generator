#!/usr/bin/env node

const process = require("node:process");

// Define character lists for the various modifiers
const lowercase_letters = "abcdefghijklmnopqrstuvwxyz";
const uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const greek = "αβγδεζηθικλμνξοπρστυφχψω";

// Define the valid flags that can be passed to the program
const validFlags = [
  "--length",
  "--uppercase",
  "--numbers",
  "--symbols",
  "--greek",
  "--help",
  "-h",
  "help",
  "--version",
];

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
    --greek            Use Greek letters in the password
    --help             Print this help message
Example:
    password-generator --length 12 --uppercase --numbers
Output:
    Requested password length: 12
    Selected modifiers: uppercase, numbers, greek
    Generated password: 1aβ2cD3eFφgλ
  `);
}

if (userArguments.includes("--help") || userArguments.includes("-h")) {
  printHelpMessage();
  return;
}

// Checks arguments for validity
for (let i = 0; i < userArguments.length; i++) {
  if (
    !validFlags.includes(userArguments[i]) &&
    isNaN(Number(userArguments[i]))
  ) {
    // Check if the user provided an invalid flag
    console.log(
      `Invalid flag: ${userArguments[i]}. Use --help for usage information.`
    );
    return;
  } else if (!isNaN(userArguments[i]) && userArguments[i - 1] !== "--length") {
    // Check if the user provided a number without the --length flag
    console.log(
      `Invalid argument: ${userArguments[i]}. Numbers must be preceded by --length flag. Use --help for usage information.`
    );
    return;
  } else if (userArguments.indexOf(userArguments[i]) !== i) {
    // Check for duplicate flags
    console.log(
      `Duplicate flag: ${userArguments[i]}. Use --help for usage information.`
    );
    return;
  }
}

if (userArguments.length === 0) {
  console.log(`
    No arguments provided. A password will be generated with the default settings.`);
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

  if (userArguments.includes("--greek")) {
    character_list += greek;
    modifiers.push("greek");
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
        Selected modifiers: ${
          modifiers.length === 0 ? "none" : modifiers.join(", ")
        }
        Generated password: ${generatePassword(length, character_list)}
        `);
}

// Call the printPassword function
printPassword(length);
