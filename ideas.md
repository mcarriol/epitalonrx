# Aurelius Health Group — Design Brainstorm

## Chosen Approach: Editorial Medical Luxury

**Design Movement:** Medical-Luxury Editorial (Forma × Vogue × clinical precision)

**Core Principles:**
1. Cinematic full-bleed photography as the primary design medium — skin, texture, warmth
2. Strict typographic hierarchy: Playfair Display serif for display, Inter for UI
3. Warm earth palette — Aurelius Black, Gold, Cream — never cold or clinical
4. Asymmetric layouts that feel editorial, not templated

**Color Philosophy:**
- Aurelius Black (#0D0D0D): authority, depth, premium
- Aurelius Gold (#C9A96E): warmth, aspiration, medical precision
- Aurelius Cream (#F5F0E8): approachability, cleanliness, luxury
- Warm Stone (#8C7B6B): human, grounded, secondary text

**Layout Paradigm:**
- Hero: full-bleed cinematic portrait with left-anchored text
- Sections alternate: dark (black bg) → light (cream bg) → dark
- Product cards: dark background grid with gold accent borders
- Asymmetric two-column splits for feature sections

**Signature Elements:**
- Gold "A" icon mark with caduceus staff descender
- Thin gold horizontal rules as section dividers
- Circular numbered steps with gold ring borders

**Interaction Philosophy:**
- Nav becomes glass-dark on scroll
- Cards lift on hover with border glow
- Accordion sections expand with smooth height transitions
- Buttons darken on hover, never change shape

**Animation:**
- Entrance: subtle fade-up on scroll (framer-motion)
- Nav: opacity + backdrop-blur transition on scroll
- Cards: translateY(-4px) on hover
- No spinning loaders or distracting motion

**Typography System:**
- Display/H1/H2: Playfair Display (serif authority)
- H3/Body/UI: Inter (humanist clarity)
- Labels: Inter 500, uppercase, wide letter-spacing, gold color
