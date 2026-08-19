# MateCode - Proyecto Integrador 4

Aplicación web para la gestión de tareas personales desarrollada con React, TypeScript y Firebase.

El sistema permite que cada usuario cree una cuenta, inicie sesión y administre sus propias tareas. Además, permite enviar por correo electrónico un resumen del estado de las tareas mediante Amazon SES.

## Funcionalidades

- Registro de usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante Firebase Authentication.
- Creación de tareas.
- Edición de tareas.
- Eliminación de tareas.
- Marcado de tareas como pendientes o completadas.
- Persistencia de datos mediante Cloud Firestore.
- Tareas asociadas al usuario autenticado.
- Actualización de tareas en tiempo real.
- Envío de resumen de tareas por correo electrónico.
- Interfaz responsive.
- Rutas protegidas para usuarios autenticados.
- Manejo de estados de carga y errores.

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router

### Backend y servicios

- Firebase Authentication
- Cloud Firestore
- Amazon Simple Email Service (SES)
- Vercel Functions

### Testing y calidad

- Vitest
- React Testing Library
- ESLint

### Deploy

- Vercel

## Arquitectura del envío de emails

Las credenciales de AWS no se utilizan directamente desde React.

El envío sigue este flujo:

```text
Frontend React
      |
      v
/api/sendTaskSummary
      |
      v
Vercel Function
      |
      v
Amazon SES
      |
      v
Correo del usuario
```

De esta forma, las credenciales de AWS permanecen únicamente en el entorno del servidor y no quedan expuestas en el navegador.

## Estructura principal

```text
api/
  sendTaskSummary.ts

src/
  components/
  features/
  hooks/
  pages/
  routes/
  services/
  types/

tests/
  components/
  setup.ts
```

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/roanbupa/Proyecto-Integrador-4.git
```

Ingresar al proyecto:

```bash
cd Proyecto-Integrador-4
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Variables necesarias:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

AWS_REGION=
AWS_SES_FROM_EMAIL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Las credenciales reales no deben subirse al repositorio.

El archivo `.env` se encuentra incluido en `.gitignore`.

## Ejecutar en desarrollo

Para ejecutar únicamente el frontend con Vite:

```bash
npm run dev
```

Para ejecutar el proyecto junto con las Vercel Functions:

```bash
vercel dev
```

## Tests

Ejecutar todos los tests:

```bash
npm run test
```

Actualmente el proyecto cuenta con tests para:

- `TodoForm`
- `TodoList`
- `TodoItem`

## ESLint

Para comprobar la calidad del código:

```bash
npm run lint
```

## Build

Para generar y verificar el build de producción:

```bash
npm run build
```

## Seguridad

- Las variables privadas se almacenan mediante variables de entorno.
- `.env` no se versiona con Git.
- Las credenciales de AWS SES permanecen del lado del servidor.
- El frontend nunca accede directamente a las credenciales de AWS.
- Las tareas se encuentran asociadas al usuario autenticado.

## Aplicación publicada

La versión de producción se encuentra disponible en:

https://proyecto-integrador-4.vercel.app

## Repositorio

Código fuente:

https://github.com/roanbupa/Proyecto-Integrador-4