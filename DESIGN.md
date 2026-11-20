---
name: Abfahrt
description: Giancarlo Fedolfi's portfolio set as a German station split-flap departures board; every project and job is a departure whose destination flips in on identical modules.
colors:
  housing: "#141618"
  panel: "#1b1e21"
  module: "#262a2e"
  module-top: "#2e3337"
  split: "#08090a"
  row-open: "#23282c"
  rule: "#2c3135"
  paper: "#f3f1ea"
  dim: "#a9afb4"
  yellow: "#ffd200"
  timetable-ink: "#4a3f00"
  navy: "#0c2a5c"
  navy-module-top: "#22324c"
  navy-module: "#1b2a42"
  navy-ink: "#c3cee0"
  error: "#ff9b8a"
typography:
  flap-name:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "calc(clamp(40px, 4.5vw, 68px) * 0.8)"
    fontWeight: 700
    lineHeight: 1
  flap-destination:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "calc(clamp(26px, calc((100vw - 600px) / 17.4), 56px) * 0.8)"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 3vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
  title:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.02em"
  gloss:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "0.5em"
    fontWeight: 500
    letterSpacing: "0.04em"
  label:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    letterSpacing: "0.04em"
  column-head:
    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    letterSpacing: "0.06em"
  lede:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
  stop: "50%"
spacing:
  gutter: "clamp(16px, 4.4vw, 64px)"
  gap: "clamp(28px, 4vw, 56px)"
  section: "clamp(56px, 7vw, 96px)"
  cell-gap: "calc(var(--h) * 0.08)"
components:
  flap-cell:
    backgroundColor: "{colors.module}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "calc(var(--h) * 0.7)"
    height: "var(--h)"
  flap-cell-navy:
    backgroundColor: "{colors.navy-module}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  button:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 22px"
  button-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.housing}"
  button-go:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.housing}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 22px"
  button-go-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.housing}"
  button-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.housing}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 22px"
  button-ink-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.housing}"
  platform-badge:
    backgroundColor: "transparent"
    textColor: "{colors.yellow}"
    rounded: "{rounded.none}"
    size: "2.25rem"
  platform-badge-open:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.housing}"
  input-where:
    backgroundColor: "{colors.split}"
    textColor: "{colors.yellow}"
    rounded: "{rounded.none}"
    padding: "10px 14px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "7px 14px"
  tab-active:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.housing}"
  timetable-sheet:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.housing}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 44px)"
---

# Design System: Abfahrt

## Overview

**Creative North Star: "The Hauptbahnhof Departures Board"**

The page is a station board in an anthracite housing. Every project, job and research post is a departure: a row with a time, a train code, a destination spelled out in split-flap modules, a platform number and a status. The destination run is the focal scale of the page; identical modules shoulder to shoulder, filled or blank, read as one ruler down the board. A deep navy header strip carries the name in its own flap modules and a live Hamburg clock in yellow.

Density is board density: rows sit close, separated by black split lines, and open in place to show the detail beneath. Everything on the board is set in Barlow Condensed uppercase; everything meant to be read at length is Barlow. Signal yellow is the board's only accent and marks what a traveller needs: platform numbers, train codes, live statuses, the Resume ticket, the primary action and focus. Off the board, the Resume hangs as the yellow printed timetable sheet (Abfahrtsplan) beside it.

Motion is the flap itself: on load, on filter and on open, each module turns forward through the drum (space, A to Z, umlauts, digits, punctuation) until it reaches its letter, staggered left to right, with a top leaf falling about the split on each step. Reduced motion sets the letters directly.

**Key Characteristics:**
- Anthracite housing, flap modules split by a black hairline, warm white letters.
- One accent, signal yellow, reserved for wayfinding and action.
- Barlow Condensed uppercase on the board, Barlow for prose.
- Square corners everywhere; the only round shape is the route-stop dot.
- Flat: depth comes from tonal steps between housing, panel and module, never from shadows.

## Colors

A dark, near-neutral station palette with one signal yellow and one navy header strip.

### Primary
- **Signal Yellow** (`yellow`): platform badges, train-code flaps, live statuses (Live, Running), the clock digits, the Resume ticket and `go` buttons, active tabs, link underlines, the focus ring, text selection, and the full field of the Resume timetable sheet.

### Secondary
- **Station Navy** (`navy`): the header strip only. Its flap modules use **Navy Module** (`navy-module-top` over `navy-module`) and its secondary text **Navy Ink** (`navy-ink`).

### Neutral
- **Housing** (`housing`): page background and the dark ink on yellow and paper surfaces.
- **Board Panel** (`panel`): the frame behind the departures rows.
- **Module** (`module-top` over `module`): the two halves of every flap cell, hard-stopped at 50%.
- **Split Black** (`split`): the hairline across each flap, the rule between rows, and the inset field of inputs.
- **Open Row** (`row-open`): an opened departure and its detail panel.
- **Rule** (`rule`): section and list dividers off the board.
- **Paper** (`paper`): flap letters, body text, outline buttons.
- **Dim** (`dim`): column heads, via lines, metadata, quiet statuses, colophon.
- **Timetable Ink** (`timetable-ink`): secondary text on the yellow timetable sheet.
- **Error Coral** (`error`): form error text only.

### Named Rules
**The Signal Rule.** Yellow marks wayfinding and action only: where to go (platform, train), what is live, what to press, where focus is. It is never decoration.

**The One Field Rule.** The Resume is the one surface that inverts to a full yellow field with housing ink. No other section gets a coloured field.

## Typography

**Display Font:** Barlow Condensed 500/700 (with 'Arial Narrow', sans-serif)
**Body Font:** Barlow 400/600 (with system-ui, sans-serif)

**Character:** Barlow Condensed is the board's lettering, narrow and uppercase like station signage; Barlow is the printed notice beside it, open and calm for reading.

### Hierarchy
- **Flap Name** (700, module height clamp(40px, 4.5vw, 68px), glyph at 0.8 of the module): the name in the navy header, in modules.
- **Flap Destination** (700, module height clamp(26px, (100vw - 600px) / 17.4, 56px)): the destination run of each departure; 22 modules, sized to fit the column, capped at 56px (about 48px at 1440). Time and train flaps sit at 24px (22px from 900 to 1279px, 20px below 900px).
- **Headline** (700, clamp(2rem, 3vw, 2.75rem), 1, uppercase): section heads, followed inline by the **Gloss** (500, 0.5em, yellow) in German: Departures Abfahrt, Resume Lebenslauf, Off hours Feierabend, Contact Kontakt.
- **Title** (700, 1.5rem, 1.15, uppercase; 1.75rem on the timetable sheet): sub-heads such as degree, Books, Track, Hamburg.
- **Label** (700, 1.1875rem, 0.04em, uppercase): buttons, header links, form labels (1.0625rem), skill terms (1.125rem).
- **Column Head** (500, 0.9375rem, 0.06em, uppercase, dim): board column heads and detail metadata (1rem).
- **Lede** (400, clamp(1.125rem, 1.5vw, 1.3125rem), 1.45, max 46ch): the station line under the name.
- **Body** (400, 1.0625rem, 1.55): prose, max 54 to 62ch; detail body at 1.1875rem.
- **Small** (400, 0.875rem): via lines, status text, colophon.

### Named Rules
**The Board Lettering Rule.** Anything that is part of the board (flaps, column heads, platforms, statuses, labels, buttons) is Barlow Condensed uppercase. Sentences are Barlow in sentence case.

**The Gloss Rule.** A section head is plain Barlow Condensed uppercase, with its German name set inline after it in yellow at half size. The gloss sits on the same line as the head, never above it.

## Layout

One column of full-width bands with a fluid gutter (`gutter`) and a fluid gap (`gap`). Sections open with `section` top padding; the board sits tighter under the header. The departures board is a five-column grid: Time (5.75rem), Train (4rem), Destination (fluid), Platform (2.75rem), Status (5.75rem), with the via line set small above the destination inside its column. Every destination occupies the same 22-module run so the board reads as one ruler; empty modules stay visible.

Between 900 and 1279px the time and train flaps shrink so the destination keeps the focal scale. Below 900px the header stacks, the column heads hide, and each row stacks time, train, status and platform over the via line over the destination run (modules clamp(28px, 8vw, 36px), wrapping between words, never inside one). An opened departure's detail is a two-column panel aligned to the destination column, single column below 900px. Resume, Off hours and Contact use two-column grids that collapse to one below 900px.

## Elevation & Depth

Flat. There are no box shadows. Depth is tonal: housing, then the board panel, then modules, each a step lighter, with the open row a step lighter again. The only line of depth is the flap split: a black hairline (2px; 1px on the small time and train flaps) across every module, over a hard 50% stop between the module's top and bottom halves.

### Named Rules
**The Split Is The Shadow Rule.** The flap split line is the system's one depth device. Do not add drop shadows, glows or blur.

## Shapes

Square corners throughout (0px): modules, buttons, inputs, tabs, the platform badge, the timetable sheet. Borders are 2px solid: outline buttons, platform badges, inputs and tabs. The one round shape is the route-stop marker in an opened departure: a 14px yellow ring on a 2px vertical line, read as stops on a line diagram (Zuglauf).

## Components

### Split-flap Module
The signature component. A cell 0.7 of its height wide, top half `module-top` and bottom half `module` with a hard stop, a split hairline across the middle, the glyph at 0.8 of the height. Cells sit 0.08 of the height apart, grouped by word. On change each cell steps through the drum every 34ms, two ticks of stagger per cell, with a 30ms falling top leaf; reduced motion shows the final text. Screen readers get the plain text. Variants: navy modules in the header; yellow letters for train codes and the clock.

### Departure Row
A full-width button (or link, for the off-hours rows) on the board grid. Rows are divided by a 2px split-black rule; hover lightens the row, open sets `row-open`, fills the platform badge yellow and unfolds the detail with a clip-path reveal (0.45s). Filtering dims non-matching rows to 0.32 opacity and blanks their destination modules.

### Platform Badge
A 2.25rem square with a 2px yellow border and yellow numeral; filled yellow with housing numeral when its row is open.

### Buttons
- **Shape:** square (0px), 2px border, 10px 22px padding, Label type.
- **Default:** paper outline on transparent; hover fills paper with housing text.
- **Go:** yellow field; hover turns paper. Used for the primary action of a context (Live demo, Send).
- **Ink:** paper field; hover turns yellow.
- **Ticket:** the header Resume link, a yellow field with no border.
- **On the timetable sheet:** outlines and text in housing ink; Ink is housing with yellow text.
- **Focus:** a 3px yellow outline at 3px offset (housing outline on the yellow sheet).

### Inputs / Fields
- **Where-to:** a split-black field with a 2px `module-top` border, yellow uppercase Barlow Condensed entry; the border turns yellow on focus.
- **Contact fields:** split-black field with a 2px mid-grey border, Barlow paper text, yellow border on focus. Errors in Error Coral.

### Tabs
Square 2px-bordered Barlow Condensed tabs; the active tab is a yellow field with housing text.

### Timetable Sheet (Resume)
The Resume section is a yellow field with generous padding and housing ink, laid out as education beside a skills definition list whose terms are Label type and whose rows are ruled in 25% housing.

### Book List
Rows of a 64px cover (2:3) beside title, meta and a three-line description, ruled in `rule`; ranks sit in a small yellow tag on the cover's corner.

### Navigation
The header carries the only navigation: the yellow Resume ticket and underlined GitHub, LinkedIn and Email links in Label type, underlines in translucent yellow.

## Do's and Don'ts

### Do:
- **Do** set every destination in the same 22-module run, sized to fit the column and capped at 56px.
- **Do** reserve yellow for platforms, train codes, live statuses, primary actions, the Resume ticket and sheet, and focus.
- **Do** set board text in Barlow Condensed uppercase and reading text in Barlow.
- **Do** follow each section head with its German gloss inline in yellow.
- **Do** keep corners square and borders 2px.
- **Do** let flaps turn through the drum on load, filter and open, and set them directly under reduced motion.

### Don't:
- **Don't** add drop shadows, glows or rounded corners; the flap split is the only depth.
- **Don't** use yellow as decoration or as a section background other than the Resume sheet.
- **Don't** put a label above a section head; the German name rides beside it.
- **Don't** let a destination wrap inside a word; modules wrap between words only.
