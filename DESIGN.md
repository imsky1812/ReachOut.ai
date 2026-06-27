# Design System Strategy: Liquid Glass

## 1. Overview & Brand Personality
The brand personality is **avant-garde, visionary, and luminous**. ReachOut.ai helps users craft precise, personalized messages using advanced AI. The design system matches this intelligence with a deep, immersive space-like environment. The core concept is **"Liquid Glass"**—a mixture of obsidian glass surfaces, soft backdrop blurs, and organic glowing blobs of light that flow smoothly, creating a feeling of infinite depth and modern technical luxury.

---

## 2. Colors: Obsidian & Glowing Emissions
The palette centers around nocturnal dark surfaces and vibrant, soft light-emitting colors.

### Base Canvas
*   `background`: #07080e (Deep midnight void)
*   `surface`: #0c0d16 (Frosted dark obsidian)
*   `surface-container`: rgba(255, 255, 255, 0.03) (Obsidian glass layer)

### Liquid Accent Gradients
*   `primary`: #a78bfa (Soft glowing violet)
*   `primary-dim`: #7c3aed (Deep violet)
*   `secondary`: #22d3ee (Luminous cyan)
*   `tertiary`: #f43f5e (Neon rose)
*   `success`: #10b981 (Emerald accent)

### Borders & Reflections
*   `outline`: rgba(255, 255, 255, 0.06) (Thin light reflection edge)
*   `outline-variant`: rgba(255, 255, 255, 0.12) (Slightly stronger hover reflection)

---

## 3. Typography: Sora & Inter font pairing
*   **Headlines & Display (Sora)**: Wide apertures, bold geometric letterforms. Large display text should use letter-spacing: -0.02em to maintain a tight, designed feel.
*   **Body & Descriptions (Inter)**: Excellent legibility, 1.6 line height for prose, ensuring zero cognitive fatigue.
*   **Labels & Metadata (JetBrains Mono)**: Used for status tags, system indicators, and uppercase tracked-out captions.

---

## 4. Depth & Elevation
No dark shadows are used. Depth is achieved via **Luminance, Blurs, and Inner Glows**:
*   **Level 1 (Glass Cards)**: `background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.06);`
*   **Level 2 (Active elements)**: Glass fill with a soft radial glow matching `primary` or `secondary` colors at 10% opacity.

---

## 5. Components & Interactions
*   **Segmented Control**: An organic glass capsule. The active segment has a subtle white glass fill (`rgba(255, 255, 255, 0.08)`) and shifts position with a spring-like ease.
*   **Glass Inputs**: Obsidian background with standard border at `outline` opacity. On focus, the border changes to the glowing primary color, and the input gets a subtle back-glow.
*   **Buttons**: Luminous pill shapes with gradients (`primary` to `secondary`). On hover, they lift (`transform: translateY(-2px)`) and increase their outer glow.
