## 🔨 Clôner le repo

### 🔧 Ce projet est développé avec VueJS, NodeJS, Express, Sequelize et Mysql

#### 🚩 BACKEND :

- Ouvrir votre terminal
- Allez dans le dossier backend : cd backend
- npm install
- npm install nodemon
- Démarrez l'application: nodemon server

#### 🚩 FRONTEND :

- Ouvrir votre terminal
- Allez dans le dossier frontend : cd frontend
- npm install
- Démarrez l'application: npm run serve
- Rendez-vous sur :
  ( Local: http://localhost:8080/
  Network: http://192.168.1.64:8080/ )

#### 💾 BASE DE DONNÉES :

- Installation de la base de données Entrez: - npm i sequelize - sequelize init
- Dans le dossier backend modifer le mot de passe dans config/config.json
- Installer mysql dans le backend => npm i mysql ( User = root et il n'y a pas de mot de passe)
- Créer une base de données, Commande : CREATE DATABASE groupomania;
- Pour finaliser la base de données, Commande : "sequelize db:migrate"
- Puis lancer le serveur avec "npm start"
- Installer le logiciel WAMP

#### 👷 ADMIN :

- Utilisateur par defaut: niveau d'accès 0.
- Admin le niveau d'accès doit être modifié à 1.
- Après modification du niveau d'accès, se reconnecter pour mettre à jour.
