# EwkaSQL — strona produktowa

Profesjonalna, statyczna strona HTML5/CSS/JS dla systemu finansowo-księgowego **EwkaSQL**.
Projekt przygotowany pod deployment na **Netlify Free** z zachowaniem wymaganych linków i rewritów dla dokumentacji WebHelp.

## Stack

- HTML5
- CSS3 (vanilla)
- JavaScript (vanilla)
- Netlify (`_redirects`, `netlify.toml`)

## Struktura projektu

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   ├── favicon.svg
│   ├── icon.svg
│   └── og-ewkasql.svg
├── _redirects
├── netlify.toml
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── README.md
```

## Wymagane linki (krytyczne)

- https://odl.com.pl
- https://www.mkj.com.pl
- https://www.ewkasql.pl/webhelp/index.html

## Netlify — rewrite/proxy WebHelp

W projekcie skonfigurowany jest reverse proxy do zewnętrznej dokumentacji:

- `/webhelp/`
- `/webhelp/index.html`
- `/webhelp/*`

Źródło treści:

- `http://9e168db1-b44b-42b0-8e36-4be31b5ab1f7.ewkasql.pl/webhelp/`

Jeśli po deployu pojawi się 404 na `/webhelp/*`, wykonaj:

1. **Clear cache and deploy site** w Netlify,
2. sprawdzenie, czy `_redirects` jest w katalogu publish (root projektu),
3. ponowny test URL:
   - `https://www.ewkasql.pl/webhelp/`
   - `https://www.ewkasql.pl/webhelp/index.html`

## Uruchomienie lokalne

```bash
cd ~/projects/www.ewkasql.pl
python3 -m http.server 9742
```

Następnie otwórz:

- http://localhost:9742

## SEO i jakość

Projekt zawiera:

- meta SEO (description/keywords/robots/canonical/hreflang),
- Open Graph + Twitter Cards,
- structured data JSON-LD (`SoftwareApplication`, `Organization`),
- pliki `robots.txt`, `sitemap.xml`, `site.webmanifest`,
- sekcje E-A-T (zaufanie, zgodność, partnerzy).

## Konwencja zmian

- małe, czytelne commity,
- brak frameworków frontendowych bez uzgodnienia,
- zachowanie kompatybilności z deployem statycznym Netlify.
