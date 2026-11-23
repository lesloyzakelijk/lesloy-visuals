LESLOY VISUALS — THE UNIVERSE V2.1 (BLANK SCREEN FIX)

Deze versie lost een foutbestendige weergave op voor de homepage. De goedgekeurde LESLOY UNIVERSE-compositie is rechtstreeks in index.html opgenomen, zodat de hero niet afhankelijk is van het apart uploaden van het grote afbeeldingsbestand. Daarnaast blijft de overige inhoud standaard zichtbaar wanneer JavaScript of animaties niet beschikbaar zijn. Animaties worden alleen als progressive enhancement ingeschakeld.

INHOUD
- Homepage met de goedgekeurde LESLOY VISUALS hero-compositie en klikvlakken
- Portfolio, Diensten, Duo, Over mij, Prijzen, Reviews en Contact
- Contact- en reviewformulieren (FormSubmit kan bij eerste gebruik e-mailverificatie vragen)
- Interactieve Three.js-omgeving op de services-wereld wanneer WebGL en de CDN beschikbaar zijn
- Responsieve mobiele navigatie, lightbox, hoverdiepte en reduced-motion ondersteuning
- Vercel clean URL-configuratie, robots.txt en sitemap.xml
- Cache-busting voor de homepage CSS- en JS-bestanden

BELANGRIJK — UPLOADEN
1. Download deze ZIP en pak hem eerst uit op je computer.
2. Open de uitgepakte map. Je moet daar direct index.html, style.css, script.js, vercel.json en de map images zien.
3. Open de hoofdmap (root) van je GitHub-repository. Upload de inhoud van de uitgepakte map, niet de bovenliggende map en niet de ZIP zelf.
4. Vervang de bestaande index.html, style.css, script.js en vercel.json. Upload ook de volledige map images.
5. Commit de wijzigingen en controleer in Vercel of de nieuwste deployment op Ready staat.
6. Open daarna lesloyvisuals.nl en doe een harde refresh met Ctrl + Shift + R.

Als de website nog leeg blijft, controleer dan in GitHub of index.html en style.css direct op repository-niveau staan. Ze mogen niet in een extra map zoals lesloy_universe_v2/ staan.

De homepage-hero is ingebed in index.html als extra beveiliging tegen een ontbrekende afbeelding. Voor portfoliofoto's en overige beeldbestanden blijft de map images nodig.


V2.2 MOTION UPDATE
- Added animated ambient particle layer over the hero artwork.
- Added a moving aurora/light-sweep overlay and gentle exposure breathing.
- Increased desktop pointer parallax.
- Honors prefers-reduced-motion and pauses particles when the hero is offscreen or the tab is hidden.
- Note: hero artwork remains a single composite image; independent character/planet/camera animation requires separately layered assets or a dedicated 3D model.
