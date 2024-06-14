# MIAGE-gpt 🌟🤖

MiageGPT est une application de chat basée sur GPT-3.5-turbo, capable de générer des réponses textuelles et des images. L'application permet également de sauvegarder et de charger des conversations, ainsi que de créer et de sélectionner différentes conversations.

## 👥 Membres du groupe

- **Andréa LARBOULLET-MARIN**
- **Thomas CHOUBRAC**
- **Jarod ACLOQUE**

## Fonctionnalités 🚀

- 🗣️ Gestion de chat classique avec historique des conversations
- 🎨 Commandes spéciales pour :
    - Générer des images avec Dall-E (`/image`)
    - Générer des réponses vocalisées (`/speech`)
- 📚 Créer et gérer plusieurs conversations

## Prérequis 📋

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [MongoDB](https://www.mongodb.com/) (pour stocker les conversations)
- [Docker](https://www.docker.com/) (optionnel, pour exécuter l'application dans des conteneurs)

## Installation 🛠️

### Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/miage-gpt.git
cd miage-gpt
```

### Backend

1. Aller dans le répertoire `backend` :

```bash
cd backend
```

2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` et ajouter votre clé API OpenAI et l'URI MongoDB :

```plaintext
API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://localhost:27017/miage-gpt # ou l'URI de votre base de données MongoDB
```

4. Démarrer le serveur backend :

```bash
npm start
```

### Frontend

1. Aller dans le répertoire `frontend` :

```bash
cd ../frontend
```

2. Installer les dépendances :

```bash
npm install
```

3. Démarrer le serveur frontend :

```bash
ng serve
```

4. Accéder à l'application via le navigateur à l'adresse [http://localhost:4200](http://localhost:4200).

## Utilisation 💬

### Commandes Spéciales

- le chat basique est disponible en tapant du texte dans la zone de texte et en appuyant sur `Entrée`.
- `!help` : Afficher la liste des commandes spéciales.
- `/image <description>` : Générer une image basée sur la description fournie.
- `/speech <texte>` : Générer une réponse vocalisée basée sur le texte fourni.

### Gestion des Conversations

- Créer une nouvelle conversation en cliquant sur "New chat" et en entrant un titre pour la conversation.
- Sélectionner une conversation dans la barre latérale pour la charger et continuer à discuter.

## Utilisation avec Docker 🐳

### Docker Compose

1. Créer un fichier `.env` à la racine du projet et ajouter votre clé API OpenAI et l'URI MongoDB :

```plaintext
API_KEY=your_openai_api_key_here
MONGODB_URI=mongodb://mongodb:27017/miage-gpt # ou l'URI de votre base de données MongoDB
```

2. Lancer les services avec Docker Compose :

```bash
docker-compose up --build
```

3. Accéder à l'application via le navigateur à l'adresse [http://localhost](http://localhost).