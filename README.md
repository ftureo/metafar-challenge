
# Pokémon BFF API

Una API Backend for Frontend (BFF) que sirve como intermediario para consumir datos de la [PokéAPI](https://pokeapi.co/). Ofrece funcionalidades específicas para obtener información de Pokémon.

---

## 🚀 **Cómo Ejecutar el Proyecto Localmente**

### **1. Clonar este repositorio**

```bash
git clone 
cd 
```

### **2. Instalar las dependencias**

Asegurarse de tener las versiones LTS de **Node.js** y **npm** instalados. Luego, ejecutar:

```bash
npm install
```

### **3. Configurar las variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
BASE_URL=https://pokeapi.co/api
POKEAPI_VERSION_PATH=/v2
```

### **4. Ejecutar el servidor**

Para iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

El servidor estará disponible en **http://localhost:3000**.

### **5. Acceder a la documentación**

Swagger está disponible en **http://localhost:3000/api**. Aquí se encuentran todos los endpoints documentados con ejemplos de uso.

---

## 📚 **Descripción de los Endpoints**

### **1. Obtener información de un Pokémon por nombre**

- **URL**: `/pokemon/:name`
- **Método**: `GET`
- **Descripción**: Devuelve información básica sobre un Pokémon específico.
- **Parámetros**:
  - `name` (string): Nombre del Pokémon (por ejemplo: `pikachu`).
- **Respuesta Ejemplo**:
  ```json
  {
    "id": 25,
    "name": "pikachu",
    "types": ["electric"],
    "abilities": ["static", "lightning-rod"],
    "numberOfAbilities": 2
  }
  ```

---

### **2. Listar Pokémon por tipo**

- **URL**: `/pokemon/type/:type`
- **Método**: `GET`
- **Descripción**: Devuelve una lista de todos los Pokémon de un tipo específico.
- **Parámetros**:
  - `type` (string): Tipo del Pokémon (por ejemplo: `fire`, `water`).
- **Respuesta Ejemplo**:
  ```json
  {
    "0": {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    "1": {
      "name": "charmeleon",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    "metadata": {
      "total": 2
    }
  }
  ```

---

### **3. Obtener un Pokémon aleatorio**

- **URL**: `/pokemon/random`
- **Método**: `GET`
- **Descripción**: Devuelve información sobre un Pokémon aleatorio.
- **Respuesta Ejemplo**:
  ```json
  {
    "id": 150,
    "name": "mewtwo",
    "types": ["psychic"],
    "abilities": ["pressure", "unnerve"],
    "numberOfAbilities": 2
  }
  ```

---

## 🧪 **Ejecutar las Pruebas**

### **1. Pruebas Unitarias**

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```bash
npm test
```

### **2. Generar informe de cobertura**

Para generar un informe detallado de la cobertura del código:

```bash
npm run test:coverage
```

---

## 🛠️ **Dependencias Principales**

- **[@nestjs/axios](https://docs.nestjs.com/techniques/http-module)**: Para realizar solicitudes HTTP.
- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)**: Para la gestión de variables de entorno.
- **[@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)**: Para generar documentación de la API.

---

## 📝 **Notas Adicionales**

1. Verificar que el endpoint de la PokéAPI esté disponible durante las pruebas. Verificar la última versión disponible y/o asegurarse de generar las correctas migraciones o solicitar los cambios pertinentes.
2. Este proyecto utiliza Jest para las pruebas unitarias y Swagger para la documentación.

---

## 📝 **Feedback**

Este repositorio admite todo tipo de correcciones, sugerencias y optimizaciones para su análisis.
