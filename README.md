# ExoLab.LLC — Website

Marketing and documentation site for **[ExoLab](https://exolab.llc)**, a solo R&D lab building open exoskeleton control systems for neurological mobility conditions (SCA3 / spinocerebellar ataxia).

## Hosting Information
The site is hosted at name cheap.com. By going to the left side panel and clicking on the "Hosting List" you can see eolab,llc in a list;Click on that and a "Renew" button pops up.  Click on that to brinng up a pull down men where you can select "go top cPanel".  Once on cPanel search for "file manager"" clicking on that will bring up a directory - the public_html sub directory is where the index.html file lives.
"

## About the Project
ExoLab is run by Greg Klassen — a 30-year DSP engineer, retired CEO, and SCA3 patient — working from Leesburg, Virginia. The goal: design and build a wearable powered exoskeleton for cerebellar ataxia, where the challenge is balance and gait variability, not paralysis.

The site covers:
- The five-phase build plan (benchtop motor control → bilateral hip + knee system)
- DSP-to-exoskeleton control skill mapping
- Hardware documentation (CubeMars AK80-9 actuators, MIT Mini Cheetah CAN protocol)
- Roadmap from Spring 2026 → 2028
- Resources: key papers, open-source repos, and industry trackers
- Contact / collaboration form

## Tech

Single-file static site (`index.html`). No framework, no build step, no dependencies.

- **Fonts**: Orbitron, DM Mono, Syne (Google Fonts)
- **JS**: Vanilla — scroll reveal, stat counters, phase tabs, custom cursor
- **Hosting**: exolab.llc

To preview locally:

```bash
python -m http.server 8080
```

## Status

Active. Phase 1 hardware on order. CubeMars AK80-9 actuators inbound. Software stack under development.

---

© 2026 Greg Klassen · Leesburg, Virginia
