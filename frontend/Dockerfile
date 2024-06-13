# Utilisez l'image officielle Node.js comme image de base pour la construction
FROM node:20 AS build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste du code de l'application dans le répertoire de travail
COPY . .

# Construisez l'application Angular
RUN npm run build --prod

# Utilisez une image Nginx légère pour servir les fichiers statiques
FROM nginx:alpine

# Copiez les fichiers construits depuis l'étape de build
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Exposez le port sur lequel l'application s'exécute
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
