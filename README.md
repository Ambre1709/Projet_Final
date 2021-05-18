Ce projet est développé avec VueJS, NodeJS, Express, Sequelize et Mysql

1- Clôner le repo

BACKEND :

1- Ouvrir votre terminal
2- Allez dans le dossier backend : cd backend
3- npm install
4- npm install nodemon
5- Démarrez l'application: nodemon server

FRONTEND :

1- Ouvrir votre terminal
2- Allez dans le dossier frontend : cd frontend
3- npm install
2- Démarrez l'application: npm run serve
3- Rendez-vous sur :
Local: http://localhost:8080/
Network: http://192.168.1.64:8080/)

BASE DE DONNÉES :

1- Installation de la base de données Entrez: - npm i sequelize - sequelize init
2- Dans le dossier backend modifer le mot de passe dans config/config.json
3- Installer mysql dans le backend => npm i mysql ( User = root et il n'y a pas de mot de passe)
4- Créer une base de données, Commande : CREATE DATABASE groupomania;
5- Pour finaliser la base de données, Commande : "sequelize db:migrate"
6- Puis lancer le serveur avec "npm start"
7- Installer le logiciel WAMP

ADMIN :

Utilisateur par defaut: niveau d'accès 0.
Admin le niveau d'accès doit être modifié à 1.
Après modification du niveau d'accès, se reconnecter pour mettre à jour.
