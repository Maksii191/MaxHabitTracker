# MaxHabitTracker

Aplikacja do nawyków (PWA): nawyki z serią i XP, nawyki negatywne („Dni bez…"), Second Brain, fiszki
(Fiszki, Ucz się, Test, Dopasuj, Powtórki), statystyki (4 tryby), wyzwania tygodnia, odliczanie do matury,
zakładki Matura (plan godzin) i Arkusze (lista arkuszy z wynikami w %), własne kategorie nawyków, tagi w notatkach
i eksport terminów do kalendarza (.ics).

## Publikacja na GitHub Pages
1. Wrzuć wszystkie pliki z tego folderu do repozytorium (index.html musi być w głównym katalogu).
2. Settings → Pages → Source: „Deploy from a branch", branch `main`, folder `/ (root)`.
3. Po minucie strona jest pod adresem `https://TWOJ-LOGIN.github.io/NAZWA-REPO/`.

## Synchronizacja (Supabase)
- Tabela z danymi musi mieć włączone Row Level Security (każdy użytkownik widzi tylko swój wiersz).
- W Supabase: Authentication → URL Configuration → Site URL wpisz adres strony z GitHub Pages
  (potrzebne do resetu hasła).

## Pliki
- `index.html`: główna aplikacja, `extras.js` / `extras.css`: menu boczne, fiszki, statystyki, zakładka Dziś.
- `sw.js`: cache offline. Przy każdej zmianie plików podbij wersję `maxhabittracker-vN` w `sw.js`.
- `tests/`: testy w przeglądarce (`helpers.py`, `smoke.py`, `test_formularze.py`, `test_pauza_plan.py`, `test_matura.py`, `test_arkusze_tagi_ics.py`, `test_kategorie.py`). Wymagają: `pip install playwright && playwright install chromium`.

## Dane
Wszystko zapisuje się lokalnie w przeglądarce, dlatego warto robić eksport kopii (przycisk w aplikacji).
