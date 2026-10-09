# Alternance Mathis

Outil personnel de recherche d'alternance (banque-assurance, Lyon), derrière une page de connexion (identifiant + mot de passe).

L'application suit un **parcours en quatre étapes**, dans l'ordre : on ne cherche pas d'offre avant d'avoir posé ses alertes, et on n'analyse pas une annonce avant d'en avoir trouvé une.

## Les onglets

| Onglet | Ce qu'on y fait |
| --- | --- |
| **Par où commencer** | Les quatre étapes avec leur avancement (« 3/7 plateformes inscrites », « 12/40 entreprises contactées »), une barre de progression, et un bouton vers l'étape en cours. Les compteurs de suivi — statuts, relances à J+7, jours restants avant la date limite de signature — sont juste en dessous. |
| **1. S'inscrire** | Les plateformes qui méritent un compte (★★★ et ★★) : pourquoi, quoi remplir, quelle alerte créer, et une case « Inscrit » pour savoir où on en est. |
| **2. Candidater** | Les 40 entreprises lyonnaises ciblées. Chacune porte son **lien d'action vérifié** (offre filtrée, moteur d'offres, page carrières, ou localisateur d'agences pour les réseaux d'agents généraux), son type d'action, son statut et une note libre. Filtres par catégorie, priorité, ou candidatures en cours. |
| **3. Trouver des offres** | Les sources secondaires, le kit de profil à recopier partout, les mots-clés à chercher et une requête LinkedIn prête à l'emploi. |
| **4. Analyser & rédiger** | Colle une annonce : l'IA note l'adéquation sur 10, liste les points à mettre en avant, les mots-clés, les incompatibilités, et rédige l'e-mail de candidature, la lettre et la note LinkedIn. **L’analyse est conservée** : elle se réaffiche en revenant sur l’onglet ou en rechargeant la page, et les 50 dernières restent accessibles sous le formulaire — un clic réouvre l’une d’elles avec ses champs, donc son prompt à copier. « Nouvelle analyse » vide le formulaire sans toucher à l’historique. |
| **Mon suivi** | Les offres enregistrées : statut, date d'envoi, relances, analyse dépliable. |
| **Profil** | Le profil et la lettre type utilisés par l'IA, la fiche recruteur à copier, l'export et l'import des données. |

## Le bouton « Copier le prompt pour Claude »

L'analyse intégrée passe par l'API OpenAI et coûte quelques centimes. Pour un résultat meilleur et sans coût d'API, ce bouton copie un **prompt complet** à coller dans son propre Claude (claude.ai). Il existe en deux versions :

- **sur une annonce** (étape 4 et chaque offre enregistrée) : profil, lettre type, texte de l'annonce, et l'analyse déjà faite s'il y en a une — présentée comme un premier avis à vérifier. Le prompt demande un avis franc, une lettre de 250 à 350 mots, un e-mail court, une note LinkedIn sous 300 caractères et trois questions d'entretien avec une piste de réponse ;
- **sur une entreprise** (étape 2) : sans annonce, le prompt ne s'appuie que sur l'entreprise, son secteur et l'angle d'approche repéré, et interdit explicitement d'inventer un besoin qu'on lui supposerait.

Dans les deux cas, les règles sont dans le prompt : ne rien inventer hors du profil, pas de superlatif invérifiable, vouvoiement, ton sobre.

Les données restent dans le navigateur (localStorage). Exporter régulièrement depuis « Profil ».

## Le drapeau rouge

À droite de la navigation, sur toutes les pages, un bouton **🚩 Signaler**. Il ouvre une petite fenêtre : la remarque, la page en cours pré-remplie, et « Envoyer ». La remarque part vers `/api/feedback`, qui exige une session.

Côté serveur, le modèle range la remarque en fiche courte — type (bug / idée / UX / contenu), page, priorité, résumé, action proposée — puis un **POST JSON vers un workflow n8n** l’enregistre et la met en file chez l’agent qui code. Le corps envoyé porte la fiche **et** le texte brut : la fiche aide à trier, les mots exacts sont ce qu’il faut lire pour corriger.

Si le modèle ne répond pas, la remarque part quand même, en « non classé » : une remarque perdue est pire qu’une remarque mal rangée. En cas d’échec du webhook (non-2xx ou délai de 10 s dépassé), le message est explicite et **le texte reste dans la zone de saisie**. Plafond de 20 envois par jour, 2 000 caractères par remarque.

## Variables d'environnement

Aucune valeur n'est versionnée : `.env.example` donne la liste, les valeurs vivent dans `.env.local` en local et dans Vercel en production.

| Variable | Rôle |
| --- | --- |
| `APP_USER` | Identifiant de la page de connexion. |
| `APP_PASSWORD` | Mot de passe de la page de connexion. |
| `SESSION_SECRET` | Longue chaîne aléatoire qui signe le cookie de session (HMAC SHA-256, 30 jours). À défaut, la signature retombe sur `APP_USER:APP_PASSWORD` — moins bien. |
| `OPENAI_API_KEY` | Clé dédiée à cet outil. Mettre une limite de dépense sur le projet OpenAI. |
| `OPENAI_MODEL` | Modèle de l'analyse ; `gpt-4o-mini` par défaut. |
| `FEEDBACK_WEBHOOK_URL` | URL du workflow n8n qui reçoit les remarques du drapeau rouge. **Jamais dans le code** : une URL de webhook connue laisse n’importe qui y poster, et le dépôt est public. |
| `FEEDBACK_WEBHOOK_SECRET` | Secret envoyé en en-tête `x-feedback-secret`, pour que le workflow n’accepte que les remarques de cette application. |
| `TARGET_CONTACTS` | Contacts des petites structures sans portail de recrutement, en JSON : `{"<id d'entreprise>":[{"email":"...","role":"...","source":"..."}]}`. **Le dépôt est public** : ces adresses ne sont jamais dans le code. La variable est lue côté serveur par `/api/contacts`, qui est derrière le middleware — sans session valide, la réponse est un 401. Variable absente ou illisible : l'application fonctionne sans, les contacts ne s'affichent simplement pas. |

## Déployer sur Vercel (gratuit)

1. Pousser ce dépôt sur GitHub.
2. Sur vercel.com : Add New → Project → importer le dépôt (Next.js détecté tout seul).
3. Settings → Environment Variables, portée Production : renseigner les variables du tableau ci-dessus.
4. Deploy. Une analyse coûte de l'ordre d'un centime.

## Développement

```
npm install
cp .env.example .env.local   # remplir les variables
npm run dev
```

Vérifications avant de pousser : `npm run lint` (TypeScript) puis `npm run build`.
