FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

# Instalación más predecible
RUN npm ci

COPY . .

# Debug opcional: verifica que react-scripts está instalado
# RUN npm list react-scripts

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
