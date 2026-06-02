"""
Structural tests for index.html — verifies sections added/removed this session.
Uses only stdlib; no external dependencies required.
"""
import sys
import re

HTML_PATH = "index.html"

with open(HTML_PATH, encoding="utf-8") as f:
    html = f.read()

passed = 0
failed = 0

def test(name, condition, detail=""):
    global passed, failed
    if condition:
        print(f"  ✓  {name}")
        passed += 1
    else:
        print(f"  ✗  {name}" + (f"\n     {detail}" if detail else ""))
        failed += 1

print("\nindex.html structural tests\n")

# ── Sections removed ──────────────────────────────────────────
test("Gallery section removed",
     'id="gallery"' not in html)

test("Lab Plan section removed",
     'id="labdoc"' not in html)

test("DSP skills section removed",
     'id="skills"' not in html)

test("Stat bar removed",
     'class="stat-bar"' not in html)

test("DSP mapping card removed",
     'DSP → Exo Control Mapping' not in html)

# ── Track A / B references removed ───────────────────────────
test("Track A label removed",
     'Track A' not in html)

test("Track B label removed",
     'Track B' not in html)

test("exo-tracks widget removed",
     'class="exo-tracks"' not in html)

test("exo-badge CSS removed",
     '.exo-badge' not in html)

test("exo-track CSS removed",
     '.exo-track {' not in html)

# ── Nav links cleaned up ──────────────────────────────────────
test("Gallery nav link removed",
     'href="#gallery"' not in html)

test("Lab Plan nav link removed from header",
     html.count('href="#labdoc"') == 0,
     f"Found {html.count('href=\"#labdoc\"')} occurrences")

test("DSP Skills nav link removed",
     'href="#skills"' not in html)

# ── New entries added ─────────────────────────────────────────
test("Wandercraft Atalante X in roadmap device table",
     'Atalante X' in html and 'Wandercraft' in html)

test("Eve added to roadmap device table",
     re.search(r'exo-device-name[^>]*>Eve<', html) is not None)

test("Wandercraft section in market landscape table",
     'Wandercraft — FDA-Cleared Medical' in html)

test("Eve row in market landscape table",
     re.search(r'ml-model[^>]*>Eve<', html) is not None)

test("Wandercraft Atalante X row in market landscape table",
     re.search(r'ml-model[^>]*>Atalante X<', html) is not None)

# ── Hero CTA updated ──────────────────────────────────────────
test("Hero CTA points to #roadmap (not dead #labdoc)",
     'href="#roadmap" class="btn-primary"' in html or
     'href="#roadmap"' in html and 'View Roadmap' in html)

# ── Core sections still present ──────────────────────────────
test("About section still present",    'id="about"'    in html)
test("Roadmap section still present",  'id="roadmap"'  in html)
test("Market section still present",   'id="market"'   in html)
test("Contact section still present",  'id="contact"'  in html)
test("Resources section still present",'id="resources"' in html)

# ── summary ───────────────────────────────────────────────────
print(f"\nResults: {passed} passed, {failed} failed\n")
sys.exit(1 if failed else 0)
