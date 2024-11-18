# Utilise une image de base pour Node.js
FROM node:20

# Crée un dossier de travail dans le conteneur
WORKDIR /app

# Copie le fichier package.json et yarn.lock (ou package-lock.json si tu utilises npm)
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste des fichiers du projet dans le conteneur
COPY . .

# Expose le port 5174 par défaut pour Vite
EXPOSE 3000

# Démarre l'application
CMD ["npm", "run","dev"]
