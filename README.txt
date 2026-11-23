LESLOY VISUALS — THE DIGITAL EXPERIENCE (V2)

Dit is de nieuwe Colorful Surreal websiteversie. De homepage gebruikt de goedgekeurde Lesloy Universe-compositie als openingsbeeld. De tekst en navigatie in dat beeld worden op desktop bediend met onzichtbare, echte klikvlakken; op mobiel is er een apart menu en een duidelijke Explore-knop.

INHOUD
- Homepage met goedgekeurde LESLOY VISUALS hero-artwork, navigatie-hotspots en portfolio-sectie
- Portfolio, Diensten, Duo, Over mij, Prijzen, Reviews en Contact
- Werkende contact- en reviewformulieren via FormSubmit (eerste gebruik kan e-mailverificatie door FormSubmit vereisen)
- Interactieve Three.js-omgeving op de services-wereld wanneer WebGL en CDN beschikbaar zijn; zonder die onderdelen blijven de CSS-visuals zichtbaar
- Responsieve mobiele navigatie, hoverdiepte, lightbox, formulieren en reduced-motion ondersteuning
- Vercel clean URL-configuratie, robots.txt en sitemap.xml

UPLOADEN NAAR GITHUB / VERCEL
1. Pak deze ZIP uit.
2. Open de uitgepakte map. Selecteer ALLE bestanden en de map images binnen die map.
3. Upload de inhoud naar de hoofdmap (root) van het GitHub-project. Upload dus niet de bovenliggende map en niet alleen het ZIP-bestand.
4. Commit de wijzigingen. Vercel start daarna automatisch een deployment.
5. Controleer eerst de Vercel-preview voordat je de productieomgeving gebruikt.

LET OP
- Behoud de map images en vercel.json in de root.
- De Three.js-scene wordt van cdnjs geladen. Als een bezoeker de CDN niet kan bereiken, blijft de rest van de website werken.
- De homepage-compositie is een geoptimaliseerd WebP-bestand. De originele PNG is ook opgenomen als bronbestand.
