# Proyecto de Backend
Este es un proyecto de backend desarrollado con TypeScript y Node.js. A continuación, se detallan los pasos para instalar, construir y ejecutar el proyecto, así como los comandos disponibles y sus explicaciones.

# Requisitos
Node.js (v16.20.1)

PostgreSQL (o el motor de base de datos de tu elección)
Instalación
Para instalar las dependencias del proyecto, asegúrate de tener Node.js instalado en tu sistema. Luego, ejecuta el siguiente comando en tu terminal:

```
npm install
```
Se debe de tener creada la base de datos 'avance-ingenieros' en el motor de postgresql

# Construcción
Para compilar el proyecto TypeScript, puedes ejecutar el siguiente comando:

```
npm run build
```
Este comando compilará el código TypeScript en JavaScript y generará los archivos en la carpeta dist.

# Configuracion

Para setear los valores para la conexion a la base de datos se tiene que ser en el ruta 
``` src/config/config.ts ```

# Ejecución
Para iniciar el servidor, ejecuta el siguiente comando:

```
npm run dev
```

Este comando ejecutará el servidor Node.js y lo hará accesible en http://localhost:3000/.

Comandos disponibles
A continuación se detallan los comandos disponibles en este proyecto:

- npm run dev: Inicia el servidor en modo de desarrollo, con reinicio automático en caso de cambios en los archivos fuente.

- npm run build : Compila el proyecto TypeScript en JavaScript.

- npm run start: Inicia el servidor Node.js después de la compilación.

- npm run seed: Ejecuta el script de carga inicial de la base de datos.

- npm run typeorm: Ejecuta el CLI de TypeORM.

- npm run typeorm:run-migrations: Ejecuta las migraciones de la base de datos.

- npm run typeorm:generate-migration: Genera un nuevo archivo de migración de la base de datos.

- npm run typeorm:create-migration: Crea una nueva migración de la base de datos.

- npm run typeorm:revert-migration: Revierte la última migración de la base de datos.


SE RECOMIENDA CORRER EL ``` npm run seed ``` antes de ejecutar o levantar el proyecto

# FUNCIONALIDADES
- CRUD DE USUARIOS
- LOGICA PARA ROLES 
- LOGICA PARA TOKENS

# BASE DE DATOS

Se adjunta Diagrama Entidad Relacion en carpeta
``` ./bd_docs ```
