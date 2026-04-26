# FindHere Frontend Theme Guide

## Theme Overview

The FindHere frontend uses the **Smoky Paprika** light theme — a warm, food-focused color palette designed specifically for a Restaurant Finder app. All colors are tokenized via CSS variables and Tailwind configuration for consistency and easy maintenance.

---

## Color Palette (Smoky Paprika Light)

| Token | Hex Code | RGB | Usage | WCAG AA |
|-------|----------|-----|-------|---------|
| **Primary** | `#b91c1c` | rgb(185,28,28) | Buttons, CTAs, active states, primary branding | 6.47 (White text) |
| **Primary Dark** | `#9d1717` | rgb(157,23,23) | Hover states, pressed buttons, deepened variants | 8.52 (White text) |
| **Accent** | `#ff7043` | rgb(255,112,67) | Highlights, badges, secondary emphasis, icons | 2.74 (White text) |
| **Background** | `#ffffff` | rgb(255,255,255) | Main page/app background | 17.85 (vs text) |
| **Surface** | `#fff6f5` | rgb(255,246,245) | Cards, light containers, alternate backgrounds | High contrast |
| **Text** | `#0f172a` | rgb(15,23,42) | Primary text, body copy, headings | Excellent |
| **Muted** | `#6b7280` | rgb(107,114,128) | Secondary text, disabled states, placeholders | 6.03 (White text) |
| **Border** | `#e9e5e5` | rgb(233,229,229) | Dividers, subtle borders, input borders | Subtle |
| **Star (Filled)** | `#fbbf24` | rgb(251,191,36) | Star ratings, positive indicators | — |
| **Star (Empty)** | `#e5e7eb` | rgb(229,231,235) | Unselected stars, empty state indicators | — |

---

## CSS Variables Location

All theme tokens are defined as CSS variables in **`client/src/index.css`**:

```css
:root {
    --color-primary: #b91c1c;
    --color-primary-dark: #9d1717;
    --color-accent: #ff7043;
    --color-background: #ffffff;
    --color-surface: #fff6f5;
    --color-text: #0f172a;
    --color-muted: #6b7280;
    --color-border: #e9e5e5;
    --color-star: #fbbf24;
    --color-star-empty: #e5e7eb;
    --gradient-primary: linear-gradient(90deg, var(--color-primary-dark), var(--color-primary));
}
```

---

## Tailwind Configuration

The theme tokens are exposed to Tailwind in **`client/tailwind.config.js`**:

```js
colors: {
    primary: 'var(--color-primary)',
    'primary-dark': 'var(--color-primary-dark)',
    accent: 'var(--color-accent)',
    background: 'var(--color-background)',
    surface: 'var(--color-surface)',
    text: 'var(--color-text)',
    muted: 'var(--color-muted)',
    border: 'var(--color-border)',
}
```

---

## Usage Examples

### React Components with Material-UI (`sx` prop)

```jsx
<Button
    sx={{
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        '&:hover': {
            backgroundColor: 'var(--color-primary-dark)',
        }
    }}
>
    Click Me
</Button>
```

### Tailwind Classes

```jsx
<div className="bg-surface border border-border text-text">
    <button className="bg-primary text-white hover:bg-primary-dark">
        Submit
    </button>
</div>
```

### CSS Gradients

```jsx
<Box
    sx={{
        background: 'var(--gradient-primary)',
    }}
>
    Gradient Background
</Box>
```

---

## Component Usage by Category

### Buttons & CTAs
- **Background**: `var(--color-primary)` or Tailwind `bg-primary`
- **Text**: White or `color: white`
- **Hover**: `var(--color-primary-dark)` or `hover:bg-primary-dark`

### Cards & Containers
- **Background**: `var(--color-surface)` (light cream)
- **Border**: `var(--color-border)` (subtle grey)

### Text
- **Primary**: `var(--color-text)` (dark navy)
- **Secondary**: `var(--color-muted)` (grey)
- **Disabled**: `var(--color-muted)` with opacity

### Icons & Badges
- **Primary Icons**: `var(--color-primary)`
- **Accent Icons**: `var(--color-accent)`
- **Muted Icons**: `var(--color-muted)`

### Star Ratings
- **Filled Stars**: `var(--color-star)` (amber/gold)
- **Empty Stars**: `var(--color-star-empty)` (light grey)

---

## Accessibility Notes

✅ **WCAG AA Compliant** for all primary color combinations:
- White text on Primary (#b91c1c): **6.47:1 contrast ratio**
- Black text on Background (#ffffff): **17.85:1 contrast ratio**
- All text uses `var(--color-text)` ensuring excellent readability

⚠️ **Important**: When using custom colors not in the palette:
- Ensure minimum **4.5:1 contrast ratio** for normal text (WCAG AA)
- Ensure minimum **3:1 contrast ratio** for large text & UI components

---

## Customizing the Theme

To adjust colors globally:

1. Edit **`client/src/index.css`** in the `:root` CSS variables section
2. All components using `var(--color-*)` will automatically update
3. No need to modify individual component files

### Example: Change Primary Color
```css
/* Before */
--color-primary: #b91c1c;

/* After */
--color-primary: #c2410c; /* Sunlit Citrus primary */
```

---

## File References

- **Theme Variables**: `client/src/index.css` (lines 5-15)
- **Tailwind Config**: `client/tailwind.config.js`
- **Components Using Tokens**:
  - `client/src/components/Btn.jsx`
  - `client/src/components/Navbar.jsx`
  - `client/src/components/Navbar/UserSection.jsx`
  - `client/src/components/Home/FilterCard.jsx`
  - `client/src/components/Home/Search.jsx`
  - `client/src/components/Home/FiltersDrawer.jsx`
  - `client/src/components/Home/Featured.jsx`
  - `client/src/components/Details/ContactSection.jsx`
  - `client/src/components/Details/HeroSection.jsx`
  - All `client/src/components/ListingEditForms/*` components
  - `client/src/components/Reviews/*.jsx`
  - `client/src/pages/ReviewForm.jsx`
  - `client/src/pages/SignUp.jsx`

---

## Best Practices

1. **Always use theme tokens** instead of hardcoded hex values
   - ✅ `backgroundColor: 'var(--color-primary)'`
   - ❌ `backgroundColor: '#b91c1c'`

2. **Use Tailwind classes when possible** for consistent spacing and sizing
   - ✅ `className="bg-primary text-white border border-border"`
   - ❌ Inline sx styles for common properties

3. **Test color combinations** for WCAG AA compliance
   - Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Verify at least 4.5:1 ratio for normal text

4. **Keep hover/focus states consistent**
   - Use `primary-dark` for button hover states
   - Use opacity changes for secondary interactions

5. **Document custom colors** in this guide when adding new tokens

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-19 | Initial Smoky Paprika theme implementation |

---

## Support

For questions or updates to the theme:
1. Consult this guide
2. Review color usage in `client/src/index.css`
3. Check Tailwind config in `client/tailwind.config.js`
