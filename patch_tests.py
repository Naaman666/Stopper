import re

with open('tests/timer.spec.js', 'r') as f:
    content = f.read()

content = re.sub(
    r"    // Select a preset button first, so duration > 0\n    await page.locator\('\.preset-btn:first-child'\)\.click\(\);\n",
    "",
    content
)

with open('tests/timer.spec.js', 'w') as f:
    f.write(content)
