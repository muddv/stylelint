"use strict";

const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: ["unix"],
  fix: true,

  accept: [
    {
      code: "a {}\nb {}",
      description: "single unix newline between rules"
    },
    {
      code: "a {}\n\nb{}",
      description: "two unix newlines between rules"
    },
    {
      code: "/** horse */\n\nb{}",
      description: "two unix newlines after a comment"
    },
    {
      code: "a{}\n\n/** horse */\n\nb{}",
      description: "multiple unix newlines with a comment between rules"
    },
    {
      code: "\n\na {}\n\nb{}\n\n\n\n\n\n",
      description: "multiple unix newlines"
    },
    {
      code: "a { border: 1px\n solid \nred; }",
      description: "newlines between property values"
    },
    {
      code: ".foo\n .bar { }",
      description: "newline between selectors"
    },
    {
      code: "a {\n}",
      description: "newline after open curly brackets"
    },
    {
      code: "a {}\n b {}",
      description: "newline after close curly brackets"
    }
  ],

  reject: [
    {
      code: "a {}\r\nb {}",
      fixed: "a {}\nb {}",
      message: messages.expected("unix"),
      description: "CRLF in the first line after a rule",
      line: 1,
      column: 5
    },
    {
      code: "a {}\n\r\nb{}",
      fixed: "a {}\n\nb{}",
      message: messages.expected("unix"),
      description: "Blank line with CRLF",
      line: 2,
      column: 1
    },
    {
      code: "/** horse */\r\n\nb{}",
      fixed: "/** horse */\n\nb{}",
      message: messages.expected("unix"),
      description: "CRLF after a comment in the first line",
      line: 1,
      column: 13
    },
    {
      code: "a{}\n\n/** horse */\r\n\nb{}",
      fixed: "a{}\n\n/** horse */\n\nb{}",
      message: messages.expected("unix"),
      description: "CRLF after a comment in the third line",
      line: 3,
      column: 13
    },
    {
      code: "\n\na {}\r\n\nb{}",
      fixed: "\n\na {}\n\nb{}",
      message: messages.expected("unix"),
      description: "CRLF after a rule in the third line",
      line: 3,
      column: 5
    },

    {
      code: "/* This is a\r\ncomment*/\na {}",
      fixed: "/* This is a\ncomment*/\na {}",
      message: messages.expected("unix"),
      description: "CRLF inside a comment string in the second line",
      line: 1,
      column: 13
    },
    {
      code: "/*    This is a\r\ncomment*/\na {}",
      fixed: "/*    This is a\ncomment*/\na {}",
      message: messages.expected("unix"),
      description:
        "CRLF inside a comment string with several spaces in the beginning in the first line",
      line: 1,
      column: 16
    },
    {
      code: "/*This is a\r\ncomment*/\na {}",
      fixed: "/*This is a\ncomment*/\na {}",
      message: messages.expected("unix"),
      description:
        "CRLF inside a comment string without spaces in the beggining in the first line",
      line: 1,
      column: 12
    },
    {
      code: "\n\n/* This is\na\r\ncomment*/\na {}",
      fixed: "\n\n/* This is\na\ncomment*/\na {}",
      message: messages.expected("unix"),
      description: "CRLF inside a comment string in the fourth line",
      line: 4,
      column: 2
    },
    {
      code: "/* This is\na comment*/\r\na {}",
      fixed: "/* This is\na comment*/\na {}",
      message: messages.expected("unix"),
      description: "CRLF after a comment in the second line",
      line: 2,
      column: 12
    },
    {
      code: "\r\n\n\n\n\n/* This is\na comment*/",
      fixed: "\n\n\n\n\n/* This is\na comment*/",
      message: messages.expected("unix"),
      description: "CRLF before a comment at the beginning of the file",
      line: 1,
      column: 1
    },
    {
      code: "\n\r\n\n\n\n/* This is\na comment*/",
      fixed: "\n\n\n\n\n/* This is\na comment*/",
      message: messages.expected("unix"),
      description:
        "CRLF before a comment in one of the first empty lines of the file",
      line: 2,
      column: 1
    },
    {
      code: "\r\n\n\n\n\n\n\n\n\n\n\na {}",
      fixed: "\n\n\n\n\n\n\n\n\n\n\na {}",
      message: messages.expected("unix"),
      description: "CRLF before a rule at the beginning of the file",
      line: 1,
      column: 1
    },
    {
      code: "\n\n\n\n\n\n\n\r\n\n\n\na {}",
      fixed: "\n\n\n\n\n\n\n\n\n\n\na {}",
      message: messages.expected("unix"),
      description:
        "CRLF before a rule in one of the first empty lines of the file",
      line: 8,
      column: 1
    },
    {
      code: "a {}\n\n\r\n\n\n",
      fixed: "a {}\n\n\n\n\n",
      message: messages.expected("unix"),
      description: "CRLF in one of the last empty lines of the file",
      line: 3,
      column: 1
    },
    {
      code: "a {}\n\n\r\n",
      fixed: "a {}\n\n\n",
      message: messages.expected("unix"),
      description: "CRLF in the last line of the file",
      line: 3,
      column: 1
    },
    {
      code: ".foo\r\n .bar {}",
      fixed: ".foo\n .bar {}",
      message: messages.expected("unix"),
      description: "CRLF between selectors in the first line",
      line: 1,
      column: 5
    },
    {
      code: "\n\n\n.foo\r\n .bar {}",
      fixed: "\n\n\n.foo\n .bar {}",
      message: messages.expected("unix"),
      description: "CRLF between selectors in the fourth line",
      line: 4,
      column: 5
    },
    {
      code: "\n\n\n.foo\n .bar\r\n .baz {}",
      fixed: "\n\n\n.foo\n .bar\n .baz {}",
      message: messages.expected("unix"),
      description: "CRLF between selectors, additional test",
      line: 5,
      column: 6
    },
    {
      code: "a { border: 1px\r\n solid red; }",
      fixed: "a { border: 1px\n solid red; }",
      message: messages.expected("unix"),
      description: "CRLF between property values in the first line",
      line: 1,
      column: 16
    },
    {
      code: "\n\n\na { border: 1px\r\n solid red; }",
      fixed: "\n\n\na { border: 1px\n solid red; }",
      message: messages.expected("unix"),
      description: "CRLF between property values in the fourth line",
      line: 4,
      column: 16
    },
    {
      code: "\n\n\na { border: 1px\n solid \r\nred; }",
      fixed: "\n\n\na { border: 1px\n solid \nred; }",
      message: messages.expected("unix"),
      description: "CRLF between property values, additional test",
      line: 5,
      column: 8
    },
    {
      code: "\n\na {\r\n}",
      fixed: "\n\na {\n}",
      message: messages.expected("unix"),
      description: "CRLF after open curly brackets",
      line: 3,
      column: 4
    },
    {
      code: "\n\na {\n}\r\nb {\n}",
      fixed: "\n\na {\n}\nb {\n}",
      message: messages.expected("unix"),
      description: "CRLF after close curly brackets",
      line: 4,
      column: 2
    },
    {
      code: "\r\na {color:red;}",
      fixed: "\na {color:red;}",
      message: messages.expected("unix"),
      line: 1,
      column: 1
    }
  ]
});

testRule(rule, {
  ruleName,
  config: ["windows"],
  fix: true,

  accept: [
    {
      code: "a {}\r\nb {}",
      description: "single windows newline between rules"
    },
    {
      code: "a {}\r\n\r\nb{}",
      description: "two windows newlines between rules"
    },
    {
      code: "/** horse */\r\n\r\nb{}",
      description: "two windows newlines after a comment"
    },
    {
      code: "a{}\r\n\r\n/** horse */\r\n\r\nb{}",
      description: "multiple windows newlines with a comment between rules"
    },
    {
      code: "\r\n\r\na {}\r\n\r\nb{}\r\n\r\n\r\n\r\n\r\n\r\n",
      description: "multiple windows newlines"
    },
    {
      code: "a { border: 1px\r\n solid \r\nred; }",
      description: "newlines between property values"
    },
    {
      code: ".foo\r\n .bar { }",
      description: "newline between selectors"
    },
    {
      code: "a {\r\n}",
      description: "newline after open curly brackets"
    },
    {
      code: "a {}\r\n b {}",
      description: "newline after close curly brackets"
    }
  ],
  reject: [
    {
      code: "a {}\nb {}",
      fixed: "a {}\r\nb {}",
      message: messages.expected("windows"),
      description: "LF in the first line after a rule",
      line: 1,
      column: 5
    },
    {
      code: "a {}\r\n\nb{}",
      fixed: "a {}\r\n\r\nb{}",
      message: messages.expected("windows"),
      description: "Blank line with LF",
      line: 2,
      column: 1
    },
    {
      code: "/** horse */\n\r\nb{}",
      fixed: "/** horse */\r\n\r\nb{}",
      message: messages.expected("windows"),
      description: "LF after a comment in the first line",
      line: 1,
      column: 13
    },
    {
      code: "a{}\r\n\r\n/** horse */\n\r\nb{}",
      fixed: "a{}\r\n\r\n/** horse */\r\n\r\nb{}",
      message: messages.expected("windows"),
      description: "LF after a comment in the third line",
      line: 3,
      column: 13
    },
    {
      code: "\r\n\r\na {}\n\r\nb{}",
      fixed: "\r\n\r\na {}\r\n\r\nb{}",
      message: messages.expected("windows"),
      description: "LF after a rule in the third line",
      line: 3,
      column: 5
    },

    {
      code: "/* This is a\ncomment*/\r\na {}",
      fixed: "/* This is a\r\ncomment*/\r\na {}",
      message: messages.expected("windows"),
      description: "LF inside a comment string in the second line",
      line: 1,
      column: 13
    },
    {
      code: "/*    This is a\ncomment*/\r\na {}",
      fixed: "/*    This is a\r\ncomment*/\r\na {}",
      message: messages.expected("windows"),
      description:
        "LF inside a comment string with several spaces in the beginning in the first line",
      line: 1,
      column: 16
    },
    {
      code: "/*This is a\ncomment*/\r\na {}",
      fixed: "/*This is a\r\ncomment*/\r\na {}",
      message: messages.expected("windows"),
      description:
        "LF inside a comment string without spaces in the beggining in the first line",
      line: 1,
      column: 12
    },
    {
      code: "\r\n\r\n/* This is\r\na\ncomment*/\r\na {}",
      fixed: "\r\n\r\n/* This is\r\na\r\ncomment*/\r\na {}",
      message: messages.expected("windows"),
      description: "LF inside a comment string in the fourth line",
      line: 4,
      column: 2
    },
    {
      code: "/* This is\r\na comment*/\na {}",
      fixed: "/* This is\r\na comment*/\r\na {}",
      message: messages.expected("windows"),
      description: "LF after a comment in the second line",
      line: 2,
      column: 12
    },
    {
      code: "\n\r\n\r\n\r\n\r\n/* This is\r\na comment*/",
      fixed: "\r\n\r\n\r\n\r\n\r\n/* This is\r\na comment*/",
      message: messages.expected("windows"),
      description: "LF before a comment at the beginning of the file",
      line: 1,
      column: 1
    },
    {
      code: "\r\n\n\r\n\r\n\r\n/* This is\r\na comment*/",
      fixed: "\r\n\r\n\r\n\r\n\r\n/* This is\r\na comment*/",
      message: messages.expected("windows"),
      description:
        "LF before a comment in one of the first empty lines of the file",
      line: 2,
      column: 1
    },
    {
      code: "\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\na {}",
      fixed: "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\na {}",
      message: messages.expected("windows"),
      description: "LF before a rule at the beginning of the file",
      line: 1,
      column: 1
    },
    {
      code: "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\r\n\r\n\r\na {}",
      fixed: "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\na {}",
      message: messages.expected("windows"),
      description:
        "LF before a rule in one of the first empty lines of the file",
      line: 8,
      column: 1
    },
    {
      code: "a {}\r\n\r\n\n\r\n\r\n",
      fixed: "a {}\r\n\r\n\r\n\r\n\r\n",
      message: messages.expected("windows"),
      description: "LF in one of the last empty lines of the file",
      line: 3,
      column: 1
    },
    {
      code: "a {}\r\n\r\n\n",
      fixed: "a {}\r\n\r\n\r\n",
      message: messages.expected("windows"),
      description: "LF in the last line of the file",
      line: 3,
      column: 1
    },
    {
      code: ".foo\n .bar {}",
      fixed: ".foo\r\n .bar {}",
      message: messages.expected("windows"),
      description: "LF between selectors in the first line",
      line: 1,
      column: 5
    },
    {
      code: "\r\n\r\n\r\n.foo\n .bar {}",
      fixed: "\r\n\r\n\r\n.foo\r\n .bar {}",
      message: messages.expected("windows"),
      description: "LF between selectors in the fourth line",
      line: 4,
      column: 5
    },
    {
      code: "\r\n\r\n\r\n.foo\r\n .bar\n .baz {}",
      fixed: "\r\n\r\n\r\n.foo\r\n .bar\r\n .baz {}",
      message: messages.expected("windows"),
      description: "LF between selectors, additional test",
      line: 5,
      column: 6
    },
    {
      code: "a { border: 1px\n solid red; }",
      fixed: "a { border: 1px\r\n solid red; }",
      message: messages.expected("windows"),
      description: "LF between property values in the first line",
      line: 1,
      column: 16
    },
    {
      code: "\r\n\r\n\r\na { border: 1px\n solid red; }",
      fixed: "\r\n\r\n\r\na { border: 1px\r\n solid red; }",
      message: messages.expected("windows"),
      description: "LF between property values in the fourth line",
      line: 4,
      column: 16
    },
    {
      code: "\r\n\r\n\r\na { border: 1px\r\n solid \nred; }",
      fixed: "\r\n\r\n\r\na { border: 1px\r\n solid \r\nred; }",
      message: messages.expected("windows"),
      description: "LF between property values, additional test",
      line: 5,
      column: 8
    },
    {
      code: "\r\n\r\na {\n}",
      fixed: "\r\n\r\na {\r\n}",
      message: messages.expected("windows"),
      description: "LF after open curly brackets",
      line: 3,
      column: 4
    },
    {
      code: "\r\n\r\na {\r\n}\nb {\r\n}",
      fixed: "\r\n\r\na {\r\n}\r\nb {\r\n}",
      message: messages.expected("windows"),
      description: "LF after close curly brackets",
      line: 4,
      column: 2
    }
  ]
});