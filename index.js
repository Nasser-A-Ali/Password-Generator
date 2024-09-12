#!/usr/bin/env node

const process = require("node:process");

const lowercase_letters = "abcdefghijklmnopqrstuvwxyz";
const uppercase_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const userArguments = process.argv.slice(2);

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

let length = 8;
let modifiers = [];

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

function setCharacterList() {
  let character_list = lowercase_letters;

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

function generatePassword(length, character_list) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const random_character =
      character_list[Math.floor(Math.random() * character_list.length)];
    password += random_character;
  }
  return password;
}

function printPassword() {
  console.log(`
        Requested password length: ${length}
        Selected modifiers: ${modifiers.join(", ")}
        Generated password: ${generatePassword(passwordLength, character_list)}
        `);
}

// if (userArguments.includes("--length")) {
//   const lengthIndex = process.argv.indexOf("--length");
//   if (!isNaN(userArguments[lengthIndex + 1])) {
//     if (userArguments[lengthIndex + 1] < 1) {
//       console.log(
//         "The length of the password must be either blank (defaulting to 8 characters) or at least 1."
//       );
//     } else {
//       length = process.argv[lengthIndex + 1];
//     }
//   }
// }

const passwordLength = length;

// console.log(userArguments);
// console.log(passwordLength);
// console.log(character_list);
// console.log(generatePassword(passwordLength, character_list));

printPassword(passwordLength);
