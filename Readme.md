Avant d'écrire npm run dev il faut lancer 'docker compose up -d'. S'il y a dèja d'autres components montées il faut faire 'docker ps' et après 'docker stop id du container'
npm run dev - lancement du backend
npx expo - lancement du frontend

Login : test@test.com
Pass : test

Pour build un volume et un container : (au démarage d'un projet, ou si on a effacé le volume) 
Le volume permet de garder la data de la DB même si on a étéint 
docker compose up -d --build
Pour lancer docker : 
docker compose up -d

Pour voir les containers lancés:
docker compose ps

Pour arrêter un container : 
docker compose stop

Pour entrer dans mon container : 'docker compose exec db sh' (Pour sortir exit + Enter) le 'db' ici c'est le container_name dans mon fichier docker-compose.yaml
Une fois cette commande lancée : on se connecte à la db : dans mon cas mysql -u adrianmark87 -p
Pass : 875875
Une fois entrées dans la db, ici on entre les données qui nous intéressent. Même si on sort de a db, ou on arrête le container, comme on a crée un volume les données vont restées sauvegardées (sauf si on efface le volume)
Pour sortir de mysql exit+Enter

Montrer les logs : 
docker compose logs

Pour l'envoi des mails : il faut changer par Mailtrap et Email JS, car MailJet a banni mon compte.

Si je n'arrive plus a faire tourner l'emulateur android et je dois élibérer de l'espace sur ma partition : 
Wipe android emulator data - Dans android studio
Dans le terminal : 
docker image ls 
docker image ps
Après j'efface tous les images et les volumes (voir sur chat gpt)

Dans le .env le port DB_PORT=3308 à utiliser c'est le port de gauche de mon docker-compose.yaml  ports:
      - 3308:3306 (C'est le port extérieur - d'exposition, le port de droite c'est le poet de ma machine)

Le user mysql et le mot de passe dans le fichier docker-compose.yaml et le .env doivent coïncider

Installation cypress dans le dossier backend: 
npm install cypress --save-dev

rajout au  package.json
 {
  "scripts": {
    "cy:open": "cypress open"
  }
}


A la racine du back crer un fichier jsconfig.json qui va contenir
{
    "include": [
      "./node_modules/cypress",
      "cypress/**/*.js"
    ]
  }

Pour initialiser le dossier cypress à l'intérieur du dossier :
npx cypress open


  Démarrer les tests : 
npm run cy:open

*Problème à regler: j'ai un fichier database.js et un index.js en doublon qui font la même chose. Le problème si j'efface le database.js il est relié avec d'autres fichiers.