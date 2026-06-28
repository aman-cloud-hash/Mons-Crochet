# Project-Scoped Rules for Mons Crochet

## Vite and CSS Loading Order
- **CSS Code Splitting**: Always keep `build.cssCodeSplit: false` configured in `vite.config.js`. 
- **Rationale**: Vite's default CSS code-splitting separates shared CSS files (like `responsive.css`) and page-specific CSS files (like `hero.css`) into separate chunks. During deployment on Vercel, this changes the loading order in HTML, causing base desktop styles in page-specific chunks to load after the responsive styles chunk, thereby overriding mobile media queries and breaking the layout. Disabling CSS code-splitting bundles all stylesheets in the exact order they are declared in the HTML files.
