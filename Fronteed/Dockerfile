# Etapa 1: Construcción
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir app Angular con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/Tienda /usr/share/nginx/html
