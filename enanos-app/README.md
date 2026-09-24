# Enanos App

App en React Native (Expo / Snack) que consume el backend de Enanos: permite crear un Enano
(nombre y edad), verlos en una lista, y eliminarlos con confirmación previa.

Parte del trabajo práctico de la materia Aplicaciones Móviles.
Repositorio del backend: https://github.com/Edgardo0510/enanos-backend

## Cómo correrlo

1. Abrir el proyecto en [Expo Snack](https://snack.expo.dev) importando este repositorio,
   o copiar el contenido de `App.js` a un Snack nuevo.

2. Configurar la URL del backend: en `App.js`, al principio del archivo, editar la constante:
```js
   const BACKEND_URL = 'http://TU_IP_LOCAL:3000';
```
   Reemplazar `TU_IP_LOCAL` por la IP local de la compu donde corre el backend
   (se obtiene con `ipconfig` en Windows o `ifconfig` en Mac/Linux). El celular
   debe estar conectado a la misma red WiFi que esa compu.

3. Con el backend corriendo (`npm run dev` en el repo `enanos-backend`), abrir la app:
   - Escaneando el código QR desde Expo Go en el celular, o
   - Usando el simulador "My Device" de Snack.

   Nota: la vista previa "Web" de Snack no funciona porque bloquea pedidos `http`
   desde una página `https` (mixed content) — probar siempre desde el celular con Expo Go.
