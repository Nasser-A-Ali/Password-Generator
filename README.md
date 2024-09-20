# Password Generator App

A password generator created using Node.js. A user can generate a password with a custom length and can choose to include uppercase letters, lowercase letters, numbers, and special characters via flags. If the user does not choose a custom length, the password will be generated with a default length of 8 characters. If the user does not choose any flags, the password will be generated with lowercase letters only.

## Valid Flags

- `--length`: The length of the password to generate. Followed by a number to indicate the length of the password. Example: `--length 12`.
- `--uppercase`: Include uppercase letters in the password.
- `--numbers`: Include numbers in the password.
- `--symbols`: Include special characters in the password.
- `--greek`: Include Greek letters in the password.
- `--help` `--h` `help`: Display the help menu.
