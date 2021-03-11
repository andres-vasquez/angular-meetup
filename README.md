# Angular Meetup Marzo

Bienvenid@ al Meetup de Angular Bolivia de Marzo, en esta ocasión veremos NestJS y un poco de Angular con Serverless y NestJS.

## El ejercicio

Tiene dos proyectos: `front` con una app sencilla CRUD en Angular 11 y `back` con NestJS 7 que se integrará con FireStore para almacenar comentarios de los usuarios.

## Comencemos

Para configurar ambas app vamos a requerir:
1. NPM instalado en tu computadora. (10.16.x o superior).
2. angular-cli y nest-cli instalados globalmente (`npm i -g @angular/cli` y `npm i -g @nestjs/cli`)
3. Una cuenta de Firebase con un proyecto previamente creado.
4. Tarjeta de crédito/débito para habiliar los planes de pago de Firebase (necesario para correr Node 10 o superior). [Si solo sī, quieres publicarlo].
5. Como 30 minutos para probar la app y jugar un poco con el còdigo.

### Preparemos el Backend

Ingresamos a la carpeta `backend` y lo primero que realizamos es instalar las dependencias, para eso ejecutamos:
```
npm install
```

La aplicación de NestJS no tiene las credenciales para acceder al servicio de almacenamiento de datos, en este caso será `FireStore` por lo tanto vamos a preparar Firebase para este propósito:

1. Vamos a configuraciones del proyecto.
2. Vamos a cuentas de servicio
3. Seleccionamos la opción de NodeJS (es la por defecto).
4. Generamos una clave, la cual nos descargará ua archivo JSON.
5. Copiamos el archivo .json y lo renombramos a firebase.json en la ruta: `backend/secrets/firebase.json`
6. Listo! Con eso ya tenemos nuestro servicio de almacenamiento de datos conectada.

Para probar que todo este bien ejecutamos: `npm run serve`, este levantará un servidor en localhost en el puerto 5000 en una dirección similar a: `http://localhost:5000/angular-meetup-10dbb/us-central1/api`

La parte: `angular-meetup-10dbb` corresponde al ID de tu proyecto en Firebase.
Tu backend local está listo, puedes probar ir a la dirección `/comments` para recibir los datos:
E.g. `http://localhost:5000/angular-meetup-10dbb/us-central1/api/comments`

### Métodos del servicio web
Como cualquier RESTFul API, la aplicación expondrá los siguientes métodos:
1. GET /comments
2. GET /comments/{uuid}
3. POST /comments
4. PATCH /comments/{uuid}
5. DELETE /comments/{uuid}

## Importante!
Esta aplicación es para fines educativos, no tienen ningún mecanismo de seguridad. NO USAR EN PRODUCCION!. Para más info revisa:
1. CORS
2. Passport https://docs.nestjs.com/security/authentication

### Preparemos el FrontEnd
Una vez que el backend functiona, ingresamos a la carpeta `front` y lo primero que realizamos es instalar las dependencias, para eso ejecutamos:
```
npm install
```

Inmediatamente después debemos realizar el Link con nuestro backend, para eso modificaremos el archivo: `src/environment/environment.ts` y modificamos la variable de api con la URL de nuestro backend, en mi caso: `http://localhost:5000/angular-meetup-10dbb/us-central1/api`
```
export const environment = {
  production: false,
  api: 'http://localhost:5000/angular-meetup-10dbb/us-central1/api'
};
```

Y listo! Nuestra app está lista para funcionar en la dirección `http://localhost:4200` entonces ejectumos el comando:
```
ng serve
```
### Deployment en firebase
Para el deployment seguiremos la guía publicada aca:

Firebase functions:
https://fireship.io/snippets/setup-nestjs-on-cloud-functions/


En nuestra app, dentro de `front` y dentro de `backend` tenemos un archivo llamado `deploy.sh` una vez configurado firebase en tu equipo ejecuta:
```
bash deploy.sh
```

Y Listo!

Nota: Próximamente actuaizaré este archivo con las capturas y la guía para configurar Firebase para deployment.