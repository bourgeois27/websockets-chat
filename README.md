# Laboratoire \#9

## But :
Se familiariser avec les **WebSockets**.

## Travail :
Réaliser une application de **chat** en temps réel en utilisant NodeJS et SocketIO.

## Consignes :
* L'application doit permettre à plusieurs usagers de se connecter et d’envoyer des messages dans une chatroom globale.
* Tous les usagers doivent donc voir les messages des autres en temps réel. (pas de pooling)
* L’usager doit d’abord entrer son nom dans l’application et les messages doivent être identifiés par le nom de
l’usager.

## Bref :
Il faut donc faire :
* Un serveur NodeJS/SocketIO supportant le chat
* Un petit UI très simple par-dessus
* Pas de persistence requise.

## Procédure :
S'assurer d'avoir npm installé :

`npm -v`

Installer les dépendances :

`npm install`

Exécuter l'API:

`npm run dev`

Visiter le `http://localhost:3000/` avec un navigateur web.