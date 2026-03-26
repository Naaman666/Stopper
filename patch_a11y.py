import re

with open("index.html", "r") as f:
    content = f.read()

# Hozzáadjuk az ARIA attribútumokat a megerősítő dialoghoz és a gombokhoz
new_html = """    overlay.innerHTML = `<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="confirm-msg">
      <p id="confirm-msg">Visszaállítod az alapértelmezett beállításokat?</p>
      <div class="confirm-btns">
        <button class="confirm-yes" aria-label="Igen, alapértelmezések visszaállítása">Igen</button>
        <button class="confirm-no" aria-label="Nem, mégse">Nem</button>
      </div>
    </div>`;"""

old_html = """    overlay.innerHTML = `<div class="confirm-box">
      <p>Visszaállítod az alapértelmezett beállításokat?</p>
      <div class="confirm-btns">
        <button class="confirm-yes">Igen</button>
        <button class="confirm-no">Nem</button>
      </div>
    </div>`;"""

content = content.replace(old_html, new_html)

with open("index.html", "w") as f:
    f.write(content)

print("Patch applied")
