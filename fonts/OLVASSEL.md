# Webfont csomag — Satoshi + Paralucent

## Mit tartalmaz
- 13 db `.woff2` fájl (az OTF-ekből konvertálva, ~60–65%-kal kisebbek, minden modern böngésző támogatja)
- `fonts.css` — a teljes @font-face definíció, egységesített családnevekkel:
  - **Satoshi**: 300 / 400 / 500 / 700 / 900 + mindegyik dőlt változata
  - **Paralucent**: 300 (Light) / 500 (Medium) / 600 (DemiBold)

## Telepítés a szerverre (Sybell)
1. Fájlkezelő → `/home/modernep/tervezesiprogram.tothtamasepitesz.hu/`
2. Hozzon létre egy `fonts` mappát, és töltse fel bele MIND a 13 woff2 fájlt + a `fonts.css`-t
3. Az `index.html` `<head>` részébe, a többi stylesheet ELÉ:
   ```html
   <link rel="stylesheet" href="fonts/fonts.css">
   ```
4. Az `index.html`-ben a font-változók cseréje:
   ```js
   const FONT_DISPLAY = "'Paralucent', 'Satoshi', system-ui, sans-serif";
   const FONT_BODY    = "'Satoshi', system-ui, sans-serif";
   ```
5. A Manrope-ra mutató Google Fonts `<link>` sor törölhető (már nem kell)
6. Böngészőben: Ctrl+Shift+R

## Használat CSS-ben
```css
body        { font-family: 'Satoshi', system-ui, sans-serif; font-weight: 400; }
h1          { font-family: 'Paralucent', sans-serif; font-weight: 300; } /* Light */
h2, h3      { font-family: 'Paralucent', sans-serif; font-weight: 500; } /* Medium */
strong címek{ font-family: 'Paralucent', sans-serif; font-weight: 600; } /* DemiBold */
```

## Licenc megjegyzés
A Paralucent kereskedelmi font (Device Fonts) — csak a saját, licencelt
domainjein használja (tothtamasepitesz.hu és aldomainjei).
