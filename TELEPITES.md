# Telepítési útmutató — tothtamasepitesz.hu (v2, galériákkal)

Statikus weboldal, nincs build lépés. A ZIP tartalmát a webszerver gyökerébe
(Sybell: `public_html`) másolva azonnal működik.

## 1. Feltöltés Sybell tárhelyre (fájlkezelővel)
1. Sybell ügyfélfiók → a domain **Tárhely / Fájlkezelő**.
2. Nyisd meg a **`public_html`** mappát.
3. Töltsd fel a ZIP-et és **csomagold ki** a `public_html`-be, hogy az elérési út
   `public_html/index.html`, `public_html/images/...`, `public_html/csaladi-haz-csomor-1/...` legyen
   (NE egy extra almappába).
4. Csere előtt érdemes a régi tartalomról biztonsági másolatot készíteni.

Ellenőrzés: https://tothtamasepitesz.hu/ , /munkak.html , /csaladi-haz-csomor-1/ ,
/llms.txt , /robots.txt , /sitemap.xml

## 2. FTP-vel (alternatíva)
FileZilla → Sybell FTP-adatok → a ZIP tartalma a `public_html` gyökerébe.

## 3. GitHub (verziókövetés / deploy)
Hozz létre egy üres repót a github.com-on, majd a kicsomagolt mappában:
```
git init && git add -A && git commit -m "weboldal v2"
git branch -M main
git remote add origin https://github.com/<fiok>/<repo>.git
git push -u origin main
```
GitHub Pages: Settings → Pages → main / root.

## Mi új ebben a verzióban (v2)
- **Galériás projektoldalak** 5 kiemelt projekthez (kattintható a Munkák oldalon és a főoldalon):
  Csömör (6 kép), Budapest XVIII. kerület (6), Mogyoród (6), Klimex irodaház+gyár (6), Iskolabővítés (5).
  Beépített **lightbox** (nagyítás, nyilak, ESC).
- A **prezentációs képek** (főoldal hero, szolgáltatások, kiemelt projektek) mostantól saját domaines,
  SEO-optimalizált WebP fotók (leíró fájlnév + alt).
- `munkak.html`: mind az 51 referenciaprojekt, 4 kategóriába rendezve.
- **AI-SEO**: `llms.txt`, AI-crawlereket engedő `robots.txt`, bővített JSON-LD
  (ProfessionalService/ArchitecturalService, Person, WebSite, szolgáltatás-katalógus,
  ItemList, ImageGallery a projektoldalakon, FAQ, breadcrumb), image sitemap.
- 37 optimalizált projektfotó a `images/projects/` mappában.

## Megjegyzés a képekről
Néhány kártya (pl. Merész formák, Minimalista életérzés) még a régi
modernepiteszet.hu képeire mutat — ezek a te élő oldaladról töltődnek be és működnek.
Igény szerint ezeket is lecserélhetjük saját domaines, letöltött fotókra.
