# Claude Code Handoff: Exoskeleton Comparison Table → exolab.llc

**Date:** 2026-05-24  
**Requested by:** Greg Klassen  
**Project:** ExoLab (exolab.llc)  
**Task:** Integrate the exoskeleton market comparison table into the exolab.llc website

---

## What Was Built

A self-contained HTML comparison table (`exoskeleton_comparison.html`) covering 12 current lower-limb exoskeleton products across two categories:

- **Consumer / Fitness** (Hypershell X series, DNSYS X1, AstroShell Alpha 1)
- **Medical / Clinical** (Lifeward ReWalk 7, Ekso Indego Personal, EksoNR)

### Features of the artifact
- Dark industrial aesthetic (matches typical robotics/tech site palettes)
- Filterable by category (All / Consumer / Medical) via JavaScript buttons
- Columns: Company, Model, Price, Motor Count, Peak Power, Max Torque, Weight, Battery Range, Modes/AI, App/Interface, Use Case, Notes
- Color-coded rows: cyan = consumer, green = medical; FDA-cleared badge on medical devices
- Fully self-contained HTML/CSS/JS — no external dependencies except Google Fonts

---

## Your Task

Integrate this table into the exolab.llc website as a **"Market Landscape"** or **"Competitive Context"** section/page. The table positions ExoLab's control-layer R&D in context of what existing hardware it can sit on top of.

---

## Integration Instructions

### Step 1 — Understand the current site

Before writing any code, examine the exolab.llc site structure:

```bash
# If the site repo is local, find it:
find ~ -name "*.html" -path "*/exolab*" 2>/dev/null | head -20
ls ~/sites/exolab/ 2>/dev/null || ls ~/exolab/ 2>/dev/null

# Or check if it's a GitHub Pages or static host:
# Look for package.json, _config.yml, or index.html at root
```

Identify:
- **Stack**: Is it plain HTML/CSS, Jekyll, Hugo, Next.js, WordPress, or other?
- **Existing nav structure**: What pages/sections already exist?
- **CSS approach**: Global stylesheet, CSS modules, Tailwind, inline styles?
- **Color palette / font choices**: Match the table's aesthetic to the site's existing design tokens, or retheme the table to match.

---

### Step 2 — Choose the integration approach

**Option A — New standalone page** *(recommended if site has nav)*  
Create `/market-landscape.html` (or equivalent route) and link from the main nav.

**Option B — Section on existing page**  
Embed the table as a collapsible or scrollable section within an existing page (e.g., the "About" or "Research" page).

**Option C — Iframe embed** *(quick and dirty, not preferred)*  
Drop the HTML file into the server and iframe it. Avoid if possible.

---

### Step 3 — The source file

The comparison table artifact is at:
```
/mnt/user-data/outputs/exoskeleton_comparison.html
```

Copy it to the project:
```bash
cp /mnt/user-data/outputs/exoskeleton_comparison.html ~/[your-site-repo]/market-landscape.html
```

---

### Step 4 — Adapt the styling to the site

The artifact uses these CSS variables — override them to match exolab.llc's palette:

```css
:root {
  --bg: #0a0c10;          /* page background */
  --panel: #11151c;       /* card/panel background */
  --border: #1e2730;      /* border color */
  --accent: #00e5ff;      /* primary accent (cyan) */
  --accent2: #ff6b35;     /* secondary accent (orange) — "NEW 2026" badges */
  --medical: #39ff8f;     /* medical row color (green) */
  --consumer: #00e5ff;    /* consumer row color (cyan) */
  --text: #d4dce8;        /* body text */
  --muted: #5a6a7e;       /* secondary/label text */
  --head-bg: #0d1117;     /* table header background */
}
```

If the site has a light theme, you'll want to invert most of these.

---

### Step 5 — Add site navigation link

Add a nav item pointing to the new page. Example text options:
- "Market Landscape"
- "Exoskeleton Market"
- "Hardware Context"
- "Competitive Analysis"

---

### Step 6 — Add an intro paragraph above the table

The table needs context explaining *why it exists on ExoLab's site*. Suggested framing (adjust tone to match the site's voice):

> ExoLab's Layer 1/2 control systems are designed to run on top of commercial exoskeleton hardware — not replace it. The table below surveys the current market: consumer hip-assist devices and FDA-cleared medical exoskeletons. ExoLab's terrain detection and intent inference stack can, in principle, augment or replace the proprietary AI layers in several of these platforms.

---

### Step 7 — Data maintenance note

The table data was compiled **May 2026** from manufacturer specs, Amazon listings, and CMS/Medicare documentation. It is **static HTML** — not database-driven. To update it in the future, either:
- Edit the HTML table rows directly, or
- Convert to a JSON data file + template render (see Optional Enhancement below)

---

## Optional Enhancements (flag for future session)

1. **JSON data source**: Extract table rows to `data/exoskeletons.json`; render via JS or a site templating engine. Makes updates much easier.

2. **"ExoLab relevance" column**: Add a column noting which consumer platforms are candidates for ExoLab's control stack integration (based on motor/sensor accessibility).

3. **Sort by column**: Add clickable column headers to sort by price, torque, weight, etc.

4. **Link to ExoLab research page**: Each medical device row could link to the corresponding Medicare/Letter of Medical Necessity context that Greg has been tracking.

5. **Mobile responsiveness**: The table currently uses `min-width: 1100px` and horizontal scroll on mobile. For a better mobile experience, consider a card-flip layout for small screens.

---

## Data Sources (for verification / future updates)

| Ascentiz H1 Pro / K1 Pro / H+K | ascentizexo.com, PR Newswire CES 2026, The SCJ Journal, Exoskeleton Report |
| Product | Source |
|---|---|
| Hypershell X series (all) | hypershell.tech + PR Newswire May 2026 |
| Hypershell X Pro S / Max S / Ultra S | Road Trail Run preview, Gizmodo review, May 2026 |
| DNSYS X1 Carbon / Carbon Pro | dnsys.ai, New Atlas review, Notebookcheck review |
| AstroShell Alpha 1 | astroshell.ai product page |
| Lifeward ReWalk 7 | golifeward.com, Globe Newswire April 2025, CMS Medicare data |
| Ekso Indego Personal / EksoNR | eksobionics.com, Sheltering Arms, Christopher Reeve Foundation |
| Medicare pricing ($94,617) | CMS finalized reimbursement policy, 2024 |

---

6. **Ascentiz BodyOS integration note**: Ascentiz's open-source BodyOS SDK is the only consumer platform explicitly inviting third-party control layer development — making it the most direct ExoLab hardware integration candidate. Consider a dedicated callout box or "ExoLab Relevance" badge on that row in the site version.

## Known Gaps / Caveats

- **Ascentiz battery range in km** not published — only battery capacity (78 Wh) listed; range estimate pending shipping units
- **Ascentiz shipping status**: Kickstarter campaign shipped Feb 2026 per plan; production unit reviews not yet widely available
- **ReWalk 7 torque/motor specs** not publicly published — listed as N/A
- **AstroShell motor count** estimated (2) based on form factor; not confirmed by manufacturer
- **Ekso Indego torque** described as "limited" in clinical literature due to BLDC flat motor design — exact N·m not published
- **Medical device pricing** is reimbursement-level; actual street price may differ by configuration and coverage
- **DNSYS actual weight**: manufacturer claims 1.6 kg; independent review measured 2.2 kg — table notes this discrepancy

---

The table now covers **15 products** across 5 brands (Hypershell, DNSYS, AstroShell, Ascentiz, Lifeward, Ekso Bionics). Ascentiz rows include a gold "Open-Source BodyOS" badge flagging ExoLab integration relevance.

## Files Delivered

| File | Description |
|---|---|
| `exoskeleton_comparison.html` | Self-contained comparison table artifact |
| `HANDOFF_exoskeleton_table.md` | This document |

---

*Prepared in Claude.ai conversation, May 24 2026. Pick this up in Claude Code with: "Read HANDOFF_exoskeleton_table.md and integrate the comparison table into exolab.llc."*
