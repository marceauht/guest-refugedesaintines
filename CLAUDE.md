# CLAUDE.md — Portail voyageurs du Refuge de Saintines

## Contexte
- Intranet des voyageurs du **Refuge de Saintines** (studio en location courte durée) : arrivée, départ, parking, règlement, tutoriels des équipements.
- Domaine : https://guest.gite-refugedesaintines.com (fichier `CNAME`). Pages en `noindex, nofollow`.
- Propriétaire : Marceau. **Il n'est pas développeur** : réponds en français, explique simplement, propose des alternatives et dis-le quand une idée est risquée ou trop complexe.
- Site jumeau : le site vitrine (`marceauht/gite-refugedesaintines`). La charte graphique est alignée sur lui.

## Stack
- HTML / CSS / un seul petit JS, statiques. **Pas de build, pas de npm, pas de framework.**
- Pas de formulaire ni d'appel serveur : tout est du contenu statique.
- `js/guest.js` : header qui change au scroll + apparition progressive (`.reveal`). Script classique (pas un module).

## Structure
- `index.html` : accueil avec les liens vers chaque page.
- `arrivee.html`, `checkout.html`, `parking.html`, `reglement.html`.
- `tutoriels.html` + `tuto-buanderie.html`, `tuto-canape-lit.html`, `tuto-clim-chauffage.html`, `tuto-micro-onde.html`.
- `css/base/` (00-tokens = couleurs et polices, 01-reset, 02-typo, 03-layout), `css/components/`, `css/pages/` (un fichier par page).
- `images/` en `.webp` (acces, parking, tutoriels) ; vidéos `.mp4` dans `images/tutoriels/`.

## Conventions
- Chaque page HTML liste ses feuilles de style une par une dans le `<head>` (pas de fichier CSS central). Une nouvelle page = copier le `<head>` d'une page existante et ajouter sa CSS dans `css/pages/`.
- Les couleurs viennent de `css/base/00-tokens.css`. Si elles changent sur le site vitrine, les reporter ici (et inversement).
- Textes, commentaires et messages de commit en français.
- Vidéos : garder des fichiers légers (les voyageurs les ouvrent souvent en 4G).

## Pièges connus
- **Le repo est public** et le site est accessible sans mot de passe (le `noindex` empêche seulement Google de l'afficher). Tout ce qui est écrit ici est lisible par n'importe qui, y compris dans l'historique Git.
- Le **code de la boîte à clés** est écrit en clair dans `arrivee.html` (`.arrivee-code`) et `checkout.html` dit « Le code est inchangé ». Quand le code change, modifier `arrivee.html`. Ne jamais ajouter d'autres secrets (Wi-Fi, alarme…) sans en parler à Marceau.
- Le numéro de téléphone est écrit en dur dans plusieurs pages.

## Déploiement
- Hébergement : **GitHub Pages** (branche `main`, domaine via `CNAME`).
- **Fusionner sur `main` = mettre en ligne** (en quelques minutes).
- Habitude de Marceau quand il travaille seul : `git add .` → `git commit -m "MàJ XXX"` → `git push`, directement sur `main` (donc en ligne tout de suite). Avec Claude, on passe par une branche + PR.
- Après la fusion d'une PR sur GitHub, Marceau doit faire `git pull` dans VS Code **avant** de modifier quoi que ce soit, sinon son prochain `git push` sera refusé. Le lui rappeler.
- `git add .` ajoute tout le dossier : vérifier qu'aucun fichier perso ou secret n'y traîne avant de pousser.
- **Travailler sur une branche + PR, et demander l'accord de Marceau avant tout push, merge ou mise en ligne.**

## Tester en local
- Marceau travaille sous **Windows avec VS Code**. Rendu en direct, depuis le dossier du projet :
  - terminal 1 : `npx serve . -p 8080` (site sur http://localhost:8080)
  - terminal 2 : `ngrok http 8080` (adresse publique temporaire, pratique pour tester sur téléphone)
- Ici, ouvrir `index.html` directement dans le navigateur marche aussi (pas de modules JS).
- Quand tu donnes des commandes à Marceau, donne-les pour PowerShell, pas pour Linux/Mac.
- **Toute modif doit marcher sur ordinateur ET sur mobile** (le mobile est l'usage principal des voyageurs). Le portail est pensé mobile d'abord, avec peu de règles `@media` (paliers 420 et 360 px) : tester au moins à 360 px, 375 px, 768 px et 1280 px avant de proposer un changement.
