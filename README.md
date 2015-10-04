# Practica_Curso_Node_Js
API NODEPOP

*Inicializar la DB Mongo

*Cargar un script,con el comando "npm run installDB", que añadira anuncios a la DB

*Ejecutar el comando "npm run dev",para empezar a probar el API

*Para registrar un usuario ,hacer un POST a la ruta :
  localhost:3000/apiv1/registro
  Se pedira nombre ,mail y pass

*Una vez registrados podemos acceder con un POST a la ruta:
localhost:3000/apiv1/login
para loguearnos, recibimos un Token que sera el que utilizemos para listar los anuncios

*Para acceder a la lista de anuncios podemos hacer un GET a al ruta:
localhost:3000/apiv1/anuncios
tendremos que mandar el token que nos han pasado

*El token puede ser enviado en el Body,en la query o en el header de la peticion

*Los anuncios pueden ser filtrados por nombre,tag,precio,venta, se enviaran en la query string
