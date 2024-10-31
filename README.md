<h1 align="center"># TODO APP BACKEND </h1>

# Instrucciones de Configuración
1. Al mometo de clonar le repositorio ejecutar el comando npm install la cual va a permitir la instalacion de las dependencias del proyecto.
2. configura las variables de entorno: crea un archivo .env en el directorio del proyecto y agregales las credenciales de tu base de datos, secret key etc.
  Ejemplo:
  JWT_SECRET=secret_key
  JWT_EXPIRATION=3600s
  DB_HOST=localhost
  DB_PORT=3306
  DB_USERNAME=root
  DB_PASSWORD=root
  DB_DATABASE=todo_app
en este caso el motor de base de datos que se utiliza es mysql

# Explicación Técnica
**API RESTful para gestión de tareas**
- Se utilizó Nest.js para estructurar el backend en módulos y servicios, con controladores específicos para manejar las rutas y la lógica de negocio. Este framework modular facilita la organización del código y el manejo de dependencias.
  
- Autenticación y Autorización:
  .Se implementó la autenticación basada en tokens JWT. Los usuarios deben autenticarse con su usuario y contraseña, obteniendo un token JWT que es almacenado en el cliente.
  .La estrategia JWT valida que las solicitudes incluyan un token válido, asegurando que solo usuarios autenticados puedan acceder a ciertas rutas.
  .En el backend, las rutas protegidas utilizan JwtAuthGuard para limitar el acceso a usuarios autenticados.

- Se crearon métodos de creación, lectura, actualización y eliminación de tareas en el controlador TasksController. Estos métodos reciben solicitudes HTTP y utilizan TasksService para interactuar con la base de datos.  Las tareas están asociadas a usuarios específicos, por lo que el TasksService utiliza userId para asegurar que cada usuario solo pueda gestionar sus propias tareas.
- Se habilitó el CORS (Cross-Origin Resource Sharing) en Nest.js para permitir peticiones desde el frontend en Next.js.
