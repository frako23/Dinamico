# Dinámico: Manejo de Gastos en Venezuela

## Descripción

**Dinámico** es una aplicación de gestión de gastos personales diseñada para el contexto económico de Venezuela. Permite a los usuarios registrar transacciones en múltiples divisas (Bolívares, Dólares, etc.), categorizar sus gastos e ingresos, y monitorear sus finanzas de manera sencilla. La aplicación se construye con **Next.js** para una experiencia de usuario rápida y moderna, y utiliza **IndexedDB** a través de la librería **Dexie.js** para almacenar todos los datos directamente en el navegador del usuario, garantizando privacidad y funcionamiento offline.

## Características

* **Registro de Transacciones:** Agrega fácilmente tus gastos e ingresos.
* **Almacenamiento Local:** Todos tus datos se guardan de forma segura en tu propio dispositivo.
* **Categorización:** Organiza tus movimientos financieros con categorías personalizadas.
* **Control de Divisas:** Maneja múltiples monedas y realiza seguimiento de sus valores.
* **Gráficos y Reportes:** Visualiza tus finanzas a través de reportes y gráficos claros.
* **Interfaz Intuitiva:** Diseño limpio y fácil de usar para todos los usuarios.

## Tecnologías Utilizadas

* **Frontend:**
    * Next.js 14
    * React
    * Tailwind CSS
* **Base de Datos Local:**
    * IndexedDB
    * Dexie.js

## Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  Clona este repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## Tareas Pendientes

### Interfaz

- [ ] Crear la interfaz para cargar gastos o ingresos.
- [ ] Integrar API de tasa de cambio (ej. BCV).
- [ ] Crear componente para elegir icono para una categoría
- [ ] Crear componente para elegir el color de la categoría

### Base de Datos (Dexie.js)

- [ ] **Definir el esquema de la base de datos:** Configurar las "stores" (similares a tablas) en Dexie.js para `transactions`, `categories` y `exchange_rates`.
- [ ] **Implementar lógica CRUD:** Desarrollar las funciones para Crear, Leer, Actualizar y Eliminar (CRUD) transacciones y categorías utilizando Dexie.js.
- [ ] **Conectar la UI con la base de datos:** Integrar las funciones de Dexie.js con los componentes de React para que los datos se guarden y se lean desde IndexedDB.

### Frontend

- [ ] Desarrollar componentes para visualizar reportes y gráficos a partir de los datos locales.
- [ ] Implementar la lógica para manejar y almacenar las tasas de cambio de forma dinámica en IndexedDB.
- [ ] Añadir funcionalidad para importar y exportar los datos del usuario (ej. en formato JSON).

## Contribución

¡Cualquier ayuda es bienvenida! Si deseas contribuir, por favor, abre un "pull request" con tus cambios.