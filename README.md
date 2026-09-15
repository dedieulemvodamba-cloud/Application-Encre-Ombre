<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/44bec10b-060c-4d78-89fc-c465869157ea

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Notifications e-mail des abonnements et paiements

Le projet contient maintenant un endpoint serveur `/api/notify-subscription`.
Il envoie une notification à `dedieulemvodamba@gmail.com` lorsqu'un visiteur :
- s'abonne à la communauté VIP (y compris le soutien gratuit) ;
- valide une commande/paiement Mobile Money.

### Configuration dans Google AI Studio

Ajoutez ces secrets/variables côté serveur :

- `RESEND_API_KEY` : clé API Resend (ne jamais la mettre dans le code client).
- `MAIL_FROM` : expéditeur autorisé par Resend, par exemple `Encre & Ombre <onboarding@resend.dev>` pour un test lorsque Resend l'autorise, ou une adresse de votre domaine vérifié.

Le serveur utilise `npm start` après le build (`npm run build`).

> Important : le code actuel confirme les paiements Mobile Money à partir de la référence saisie par l'utilisateur. Cette notification e-mail ne remplace pas une vérification de paiement côté opérateur. Pour un paiement réellement automatique et sécurisé, il faudra brancher l'API/webhook du prestataire Mobile Money utilisé.


## Écran de lancement Encre & Ombre

À l'ouverture de l'application, le logo officiel apparaît pendant **3,4 secondes**.
La phrase « Bienvenue dans l'univers de la lecture. » est également affichée et
prononcée avec la voix française disponible sur l'appareil. Le code privilégie une
voix identifiée comme féminine lorsque le navigateur/OS fournit cette information.

> Selon le navigateur et les réglages de l'appareil, la synthèse vocale peut être
> bloquée ou la voix féminine disponible peut varier. Le lancement visuel fonctionne
> même lorsque la voix n'est pas disponible.


## Voix d'accueil

Le fichier `src/assets/bienvenue-lecture.mp3` contient la phrase d'accueil
« Bienvenue dans l'univers de la lecture. » avec une voix féminine synthétisée.
L'écran de lancement tente de lire ce fichier automatiquement au démarrage.

Important : les navigateurs peuvent bloquer la lecture automatique avec le son.
Dans ce cas, le code réessaie au premier clic/toucher du visiteur. Une application
mobile native/PWA peut avoir des règles d'autoplay différentes.
