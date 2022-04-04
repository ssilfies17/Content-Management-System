# Content-Management-System

## Description

A go-to command-line application to help a business manage it's employee database. This application makes use of Node.js, MySQL, and Inquirer as its primary technologies.

>Check out this video demo for a better insight to how this baby works!

** Demonstration Link: [DEMO](https://www.awesomescreenshot.com/video/8213909?key=738b0b3b93f9c19239523a1cee951682) **

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

1. First things first, the user should first ensure that they have the ability to run a Node environment and have access to MySQL.

2. Open an intergrated terminal in the root directory. Input the following command:

```bash 
npm install
```

3. Open an integrated terminal on the `db` directory. Enter your MySQL credientials.

4. In the same terminal as the previous step, input the following command:

```bash
source schema.sql
```

5. In the same terminal as the previous step, input the following command:

```bash
source seeds.sql
```

## Usage

1. Open a new terminal in the root directory. Input the following command:

```bash
node index.js
```

2. Follow along with the prompts in your terminal. 

3. Have fun managing your employees!

## Credits

Created by: Sawyer Silfies

GitHub: [Ssilfies17](https://github.com/ssilfies17)


## License

MIT License

Copyright (c) [2022][Sawyer Silfies]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.