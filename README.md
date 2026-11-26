 # Kesar Kitchen · Restaurant Website

A responsive restaurant landing page built with plain **HTML, CSS and JavaScript**, with no frameworks or build tools.

**Live demo:** https://govindmote.github.io/kesar-kitchen/

## Features

- **Hero banner** with a CSS-animated plate and rising steam
- **Menu cards** in four categories (Starters, Mains, Desserts, Beverages) with ₹ prices and veg / non-veg markers
- **Photo lightbox gallery** with previous / next navigation and keyboard support
- **Cart drawer** with quantity controls and a running total
- **Chef story** and **customer testimonials**
- **Reservation form** with validation, a guest stepper, time-slot selection and a confirmation message
- **Language toggle** for English, Hindi and Marathi
- **Map section** with a drawn street map and a directions link
- Sticky navigation with a mobile hamburger menu, dark-mode support and reduced-motion support

## Built with

| Area | What was used |
|---|---|
| Structure | Semantic HTML5 |
| Styling | CSS custom properties, Grid, Flexbox, media queries, `@keyframes` animations |
| Behaviour | Vanilla JavaScript (DOM manipulation, event delegation, form validation) |
| Fonts | Google Fonts: Young Serif, Hanken Grotesk, Rozha One, Hind |

## Project structure

```
kesar-kitchen/
├── index.html      # page structure
├── style.css       # all styling and animations
├── script.js       # menu, cart, lightbox, language toggle, reservation form
└── images/         # dish photos, named like butter-chicken.png
```

## Run it locally

1. Download or clone this repository.
2. Open a terminal in the project folder and run:
   ```
   python -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser.

You can also open `index.html` directly, though a local server is better for testing.

## Adding dish photos

Save each photo in the `images/` folder, named after the dish in lowercase with dashes, for example `paneer-tikka.png`. The page accepts `.jpg`, `.jpeg`, `.png` and `.webp`. A dish with no photo shows an emoji instead.

## Limitations

The cart and the reservation form work in the browser only. There is no backend, so orders and bookings are not saved.

## Author

**Govind Mote**: [GitHub](https://github.com/govindmote) · [LinkedIn](https://linkedin.com/in/govind-mote-b12924321)
