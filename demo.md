```
const code = "import sys\n\ndef process_input():\n    x = int(input())\n    y = int(input())\n    result = x + y\n    print(result)\n\nwhile True:\n    try:\n        process_input()\n    except EOFError:\n        break"

```