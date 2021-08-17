# chat

### Tech Stack
Node - JavaScript runtime

Vite - Build tool

Tailwind - CSS framework

Firebase - Baas

## Setup

#### Node https://nodejs.org
1. Download and install LTS version

#### Vite https://vitejs.dev

1. npm init vite@latest
2. select vanilla framework
3. select vanilla variant
4. open project with code editor
5. run in terminal npm install, then npm run dev
6. remove everything from main.js and style.css
7. add style.css to index.html

#### Tailwind https://tailwindcss.com

1. npm install -D tailwindcss@latest autoprefixer@latest
2. npx tailwindcss init -p
3. add to style.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Firebase https://firebase.google.com

1. npm install --save firebase@9.0.0-beta.7
2. add import { initializeApp } from 'firebase/app'; to main.js
3. create new project in Firebase
4. create new web app
5. add firebaseConfig to main.js

