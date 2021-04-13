# Examen Mercadolibre 

Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar contra los X-Men.

Te ha contratado a ti para que desarrolles un proyecto que detecte si un humano es mutante basándose en su secuencia de ADN.

Para eso te ha pedido crear un programa con un método o función con la siguiente firma (En alguno de los siguiente lenguajes: Java / Golang / C-C++ / Javascript (node) / Python / Ruby):

``boolean isMutant(String[] dna); //Ejemplo Java``

En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las cuales representa cada base nitrogenada del ADN. 


| A | T | G | C | G | A |
| ------ | ------ | ------ | ------ |  ------ | ------ |
| C | A | G | T | G | C | 
| T | T | A | T | T | T |
| A | G | A | A | G | G |
| G | C | A | T | C | A |
| T | C | A | C | T | G |


| A | T | G | C | G | A |
| ------ | ------ | ------ | ------ |  ------ | ------ |
| C | A | G | T | G | C |
| T | T | A | T | G | T |
| A | G | A | A | G | G |
| C | C | C | C | T | A |
| T | C | A | C | T | G |



##### No-Mutante Mutante 
Sabrás si un humano es mutante, si encuentras **más de una secuencia de cuatro letras iguales**, de forma oblicua, horizontal o vertical. 
**Ejemplo (Caso mutante):**

``String[] dna = {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"};``

En este caso el llamado a la función isMutant(dna) devuelve "true". 

Desarrolla el algoritmo de la manera más eficiente posible. 

### Desafíos:

**Nivel 1**: Programa (en cualquier lenguaje de programación) que cumpla con el método pedido por Magneto. 

**Nivel 2**: Crear una API REST, hostear esa API en un cloud computing libre (Google App Engine, Amazon AWS, etc), crear el servicio “/mutant/” en donde se pueda detectar si un humano es mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el siguiente formato: 

`` POST → /mutant/ { “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] } ``

En caso de verificar un mutante, debería devolver un **HTTP** **200-OK**, en caso contrario un **403-Forbidden** 

**Nivel 3**: Anexar una base de datos, la cual guarde los ADN’s verificados con la API. Solo 1 registro por ADN. Exponer un servicio extra "/stats" que devuelva un Json con las estadísticas de las verificaciones de ADN: {“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4} 

Tener en cuenta que la API puede recibir fluctuaciones agresivas de tráfico (Entre 100 y 1 millón de peticiones por segundo). 

Test-Automáticos, Code coverage > 80%, Diagrama de Secuencia / Arquitectura del sistema. 

#### Entregar: 
- Código Fuente (Para Nivel 2 y 3: En repositorio github). (CHECK)
- Instrucciones de cómo ejecutar el programa o la API. (Para Nivel 2 y 3: En README de github). (CHECK)
- URL de la API (Nivel 2 y 3). (CHECK)
- Formato PDF para documentos (Nivel 3). (CHECK)


# HASTA AQUÍ...
Se tiene como criterios adicionales asumidos y/o entendidos.
- Deben existir dos o más secuencias para considerar que es mutante.
- En casos de contener caracateres diferentes a ATGC ej: XYZ se contará como no mutante.
- Una secuencia de más de 4 caracteres similares será tomada como diferente, ejemplo AAAAA serán dos secuencias.
- Si la secuencia no se de NXN devolverá que no es mutante.


# ARQUITECTURA

Patrón a 3 Capas, con NodeJs (expres)

# COMPONENTES USADOS

Se deben tener ejecutados los siguientes servicios cloud

- SQL DB
- Redis Cache
- GAE (Google App Engine)

(Al usar google, es necesario realizar un proxy reverso para depurar la ejecución de redis, en producción, crear el respectivo VPC)


# COMO DESPLEGAR EL PROYECTO LOCAL


Clonar el repositorio

``$ git clone https://github.com/dragonclaw/magnetoTest.git`` 


Se uso `node` version `14.9.0`

```
nvm install 14.9.0
```

```
nvm use 14.9.0
```

En la primera ejecución es necesario

```
npm install
```

Es necesario actualizar el archivo **.env**
```
#Ambiente de despliegue
ENVIRONMENT=production

#Paramentros de conección a DB
DB_USER=xxxx
DB_PASSWORD=xxxx
DB_HOST=xxx
DB_DATABASE=xxxx

#Configuración de Redis
CACHE_HOST=localhost
CACHE_PORT=6379

#Parametros de algoritmo de dección mutante
MINSEQUENCES=2
SEQUENCELENGTH=4
SEQUENCECHARS=["A","T","G","C"]

#Puerto de despliegue
PORT=3002
```

Luego iniciar compilar e iniciar el servicio

```
npm run build

npm run start
```


Ir a la url [http://localhost:3000](http://localhost:3000)

Si la respuesta del servidor es:

```
{"user":"ok"}
```
El servidor esta funcionando correctamente.

# HOST CLOUD

El host de la API se encuentra en la siguiente URL:

[https://yamid-mercadolibre.ue.r.appspot.com/status](https://yamid-mercadolibre.ue.r.appspot.com/status)


# CONSUMO DE LOS SERVICIOS


Servicio de estadísticas, responde a un GET, la relación (ratio) redondeada a 2 decimales

[https://yamid-mercadolibre.ue.r.appspot.com/stats](https://yamid-mercadolibre.ue.r.appspot.com/stats)


GET → /stats/
```
Respuesta:
{
	count_mutant_dna:  40,
	count_human_dna:  100,
	ratio:  0.4
}
```

POST → /mutant/
request body
```
{
"dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}
```
Respuesta vacía, para disminuír tráfico, En caso de verificar un mutante devuelve HTTP 200-OK, en caso contrario un
403-Forbidden

### CODE-COVERAGE & TESTING

Las pruebas unitarias se realizaron mediante el comando

``` npm run test ```

Utilizando **Jest y Supertest**


```
------------------------|---------|----------|---------|---------|---------------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------|---------|----------|---------|---------|---------------------------
All files               |   87.35 |    70.83 |   79.03 |   87.07 | 
 src                    |   81.82 |      100 |   66.67 |   81.82 | 
  app.ts                |   81.82 |      100 |   66.67 |   81.82 | 27-28
 src/api                |     100 |       50 |     100 |     100 | 
  index.ts              |     100 |       50 |     100 |     100 | 18
 src/api/routes         |   85.71 |    66.67 |    87.5 |   85.71 | 
  availability.ts       |      80 |      100 |      50 |      80 | 7
  documentationRoute.ts |     100 |      100 |     100 |     100 | 
  mutantRoute.ts        |   85.25 |    66.67 |     100 |   85.25 | 41-42,65-68,92-95,112-116
 src/config             |   83.33 |    58.33 |     100 |   83.33 | 
  index.ts              |   83.33 |    58.33 |     100 |   83.33 | 10
 src/config/swagger     |     100 |      100 |     100 |     100 | 
  swagger.ts            |     100 |      100 |     100 |     100 | 
 src/controllers        |    87.5 |      100 |      80 |    87.5 | 
  DnaController.ts      |     100 |      100 |     100 |     100 | 
  RedisController.ts    |      50 |      100 |   33.33 |      50 | 19-23
  SQLController.ts      |     100 |      100 |     100 |     100 | 
 src/loaders            |    92.5 |       50 |   85.71 |    92.5 | 
  express.ts            |   91.67 |       50 |   83.33 |   91.67 | 18,52
  index.ts              |     100 |      100 |     100 |     100 |
  loggerLoader.ts       |    87.5 |       50 |     100 |    87.5 | 6
  swaggerDocLoader.ts   |     100 |      100 |     100 |     100 |
 src/models             |   95.45 |    88.89 |   93.33 |   95.06 |
  dnaModel.ts           |   95.45 |    88.89 |   93.33 |   95.06 | 11,63,86,134
 src/services           |      75 |       75 |   61.11 |      75 |
  DnaService.ts         |     100 |      100 |     100 |     100 |
  RedisService.ts       |   43.48 |      100 |       0 |   43.48 | 20-24,28-32,37-38,44
  SQLService.ts         |      85 |       75 |      75 |      85 | 34-35,59-60,90-91
------------------------|---------|----------|---------|---------|---------------------------
```

