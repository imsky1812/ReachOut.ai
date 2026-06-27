# Design System Strategy: Dark Cyber-Neo-Brutalism

## 1. Overview & Brand Personality
The brand personality is **raw, high-contrast, technical, and unapologetic**. ReachOut.ai helps users craft precise, personalized messages using advanced AI. The design system reinforces this with a **Dark Cyber-Neo-Brutalist** theme. The core concept uses flat surfaces, thick borders, sharp corners, tactile active offsets, and solid high-contrast neon drop shadows over a retro-tech dot-grid canvas.

---

## 2. Colors: High-Contrast Cyber Nocturnal
The palette centers around deep dark backgrounds and vibrant, saturated neon elements.

### Base Canvas
*   `background`: #07080e (Midnight void)
*   `surface`: #0c0d16 (Deep space container)
*   `surface-brutal`: #121324 (Flat brutalist surface)

### Brutalist Accents & Shadows
*   `primary`: #a78bfa (Vibrant violet)
*   `secondary`: #22d3ee (Neon cyan)
*   `tertiary`: #f43f5e (Neon rose)
*   `success`: #10b981 (Retro green)
*   `border-white`: #ffffff (Solid white border)
*   `border-cyan`: #22d3ee (Solid cyan border)
*   `border-violet`: #a78bfa (Solid violet border)

---

## 3. Typography: Sora & Inter Font Pairing
*   **Headlines & Display (Sora)**: Bold, wide, geometric letterforms. Neo-brutalist titles use uppercase, thick borders, or flat text offset styling.
*   **Body & Descriptions (Inter)**: Clean, high-legibility sans-serif with a comfortable line height.
*   **Labels & Metadata (JetBrains Mono)**: Used for status tags, system indicators, and uppercase tracked-out captions.

---

## 4. Layout, Borders & Shadows
Instead of soft blurs or organic glows, depth is simulated using physical offsets and hard shadows:
*   **Borders**: Solid, thick borders (`2px`) in white or neon accents on all containers, inputs, and buttons.
*   **Shadows**: Pitch-black or vibrant neon flat shadows offset by `5px` or `6px` with zero blur:
    *   Example: `box-shadow: 5px 5px 0px 0px var(--color-cyan-glow);`
*   **Tactile Animation**: Hovering or clicking translates the element downward and rightward by `5px`, reducing the offset shadow to `0px` to simulate a physical push-button press:
    *   `transform: translate(5px, 5px); box-shadow: 0px 0px 0px 0px transparent;`

---

## 5. Components & Interactions
*   **Segmented Control**: Flat rectangles with thick white borders. The active segment is a solid white or primary color block with sharp corners.
*   **Brutalist Inputs**: Flat background with a `2px` white border. On focus, they slide into their neon offset shadow.
*   **Tactile Buttons**: Rectangular buttons with bold text, solid colors, thick borders, and hard offset shadows. On hover/active, they press down.
*   **Postmark Stamp**: Styled like a retro physical stamp with a thick border, rotated slightly, and showing a solid neon background.
