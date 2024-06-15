# Utilisez l'image officielle Node.js comme image de base
FROM node:20 AS build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste du code de l'application dans le répertoire de travail
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
