# Dinámico: Manejo de Gastos en Venezuela

## Descripción

**Dinámico** es una aplicación de gestión de gastos personales diseñada para el contexto económico de Venezuela. Permite a los usuarios registrar transacciones en múltiples divisas (Bolívares, Dólares, etc.), categorizar sus gastos e ingresos, y monitorear sus finanzas de manera sencilla. La aplicación se construye con **Next.js** para una experiencia de usuario rápida y moderna, y **Supabase** como backend de código abierto para autenticación y base de datos en tiempo real.

## Características

- **Registro de Transacciones:** Agrega fácilmente tus gastos e ingresos.

- **Categorización:** Organiza tus movimientos financieros con categorías personalizadas.

- **Control de Divisas:** Maneja múltiples monedas y realiza seguimiento de sus valores.

- **Gráficos y Reportes:** Visualiza tus finanzas a través de reportes y gráficos claros.

- **Interfaz Intuitiva:** Diseño limpio y fácil de usar para todos los usuarios.

## Tecnologías Utilizadas

- **Frontend:**

  - Next.js 14

  - React

  - Tailwind CSS

- **Backend:**

  - Supabase

  - PostgreSQL

  - Edge Functions (para lógica de negocio en el servidor)

## Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio:
   `git clone [URL_DEL_REPOSITORIO]`

2. Instala las dependencias:
   `npm install`

3. Configura las variables de entorno en un archivo `.env.local` con tus claves de Supabase y Google.
   Aquí tienes el código Markdown que compone el README.md que creé para ti. Es el mismo contenido que se muestra en el panel de la derecha.

# Dinámico: Manejo de Gastos en Venezuela

## Descripción

**Dinámico** es una aplicación de gestión de gastos personales diseñada para el contexto económico de Venezuela. Permite a los usuarios registrar transacciones en múltiples divisas (Bolívares, Dólares, etc.), categorizar sus gastos e ingresos, y monitorear sus finanzas de manera sencilla. La aplicación se construye con **Next.js** para una experiencia de usuario rápida y moderna, y **Supabase** como backend de código abierto para autenticación y base de datos en tiempo real.

## Características

- **Registro de Transacciones:** Agrega fácilmente tus gastos e ingresos.

- **Categorización:** Organiza tus movimientos financieros con categorías personalizadas.

- **Control de Divisas:** Maneja múltiples monedas y realiza seguimiento de sus valores.

- **Gráficos y Reportes:** Visualiza tus finanzas a través de reportes y gráficos claros.

- **Interfaz Intuitiva:** Diseño limpio y fácil de usar para todos los usuarios.

## Tecnologías Utilizadas

- **Frontend:**

  - Next.js 14

  - React

  - Tailwind CSS

- **Backend:**

  - Supabase

  - PostgreSQL

  - Edge Functions (para lógica de negocio en el servidor)

## Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio:
   `git clone [URL_DEL_REPOSITORIO]`

2. Instala las dependencias:
   `npm install`

3. Configura las variables de entorno en un archivo `.env.local` con tus claves de Supabase y Google.

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_client_id_de_google
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=tu_client_secret_de_google

4. Inicia el servidor de desarrollo:
   `npm run dev`

## Tareas Pendientes

### ✅ **Autenticación**

- Implementar autenticación con Google One Tap.

### ⏳ **Backend (Supabase)**

- **Corregir error de envío errado de `nonce`:** Asegurar que el `nonce` enviado por el cliente coincida con el que espera la validación de Supabase para prevenir ataques de repetición.

- **Registrar usuario en Supabase:** Implementar la lógica para que el inicio de sesión con Google One Tap cree o identifique un usuario existente en la tabla `auth.users` de Supabase.

- **Crear tablas de transacciones, categorías y tasas de cambio:**

- `transactions`: para almacenar todos los gastos e ingresos.

- `categories`: para permitir la categorización de las transacciones.

- `exchange_rates`: para gestionar las tasas de cambio de diferentes divisas.

### ⬜ **Frontend**

- Crear la interfaz de usuario para el registro de transacciones.

- Desarrollar componentes para visualizar reportes y gráficos.

- Implementar la lógica para manejar las tasas de cambio de forma dinámica.

## Contribución

¡Cualquier ayuda es bienvenida! Si deseas contribuir, por favor, abre un "pull request" con tus cambios.
