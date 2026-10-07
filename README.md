# Alternance Mathis

Outil personnel de recherche d'alternance (banque-assurance, Lyon), protégé par une page de connexion (identifiant + mot de passe) :
- **Analyser une offre** : colle une annonce, l'IA note l'adéquation /10, liste les points à mettre en avant, les mots-clés, les incompatibilités, et rédige l'e-mail de candidature et la note LinkedIn.
- **Mes offres** : offres analysées, statut, date d'envoi, relances.
- **Entreprises** : 35 cibles lyonnaises préchargées, filtres, statut, notes, ajout libre.
- **Tableau de bord** : compteurs, relances à J+7, jours restants avant la date limite de signature.
- **Profil & fiche** : profil utilisé par l'IA, fiche recruteur à copier, export/import des données.

Les données restent dans le navigateur (localStorage). Exporter régulièrement depuis « Profil & fiche ».

## Déployer sur Vercel (gratuit)
1. Créer un dépôt GitHub `alternance-mathis` et y pousser ce dossier.
2. Sur vercel.com : Add New → Project → importer le dépôt (framework Next.js détecté).
3. Variables d'environnement (Settings → Environment Variables, cocher Production) :
   - `APP_USER` et `APP_PASSWORD` : identifiant et mot de passe de la page de connexion.
   - `SESSION_SECRET` : longue chaîne aléatoire (signe les sessions, valables 30 jours).
   - `OPENAI_API_KEY` : clé dédiée, avec une limite de dépense sur le projet OpenAI.
   - `OPENAI_MODEL` : `gpt-4o-mini` par défaut, ou tout modèle rapide disponible sur le compte.
4. Deploy. Une analyse coûte de l'ordre d'un centime.

## Développement
```
npm install
cp .env.example .env.local   # remplir les variables
npm run dev
```
Vérifications : `npm run lint` (TypeScript) puis `npm run build`.
