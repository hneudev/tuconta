# tuConta Landing Page

Una landing page moderna y responsiva para "tuConta - Tu Contador en línea" construida con Next.js 14, TypeScript, Tailwind CSS y Ant Design.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos responsivos
- **Ant Design** para componentes UI
- **Redux Toolkit + RTK Query** para manejo de estado y API
- **Diseño responsivo** para móvil, tablet y desktop
- **Accesibilidad** con ARIA labels y semantic HTML

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd tuconta
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env.local` en la raíz del proyecto:

   ```env
   NEXT_PUBLIC_PACKAGES_API=https://tu-api-endpoint.com/packages
   ```

   Si no configuras esta variable, se usará el endpoint por defecto:
   `https://mockapi.io/your-endpoint/packages`

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
tuconta/
├── app/
│   ├── globals.css          # Estilos globales con Tailwind
│   ├── layout.tsx           # Layout principal con providers
│   └── page.tsx             # Página principal
├── components/
│   ├── Header.tsx           # Header con logo y subtítulo
│   ├── FeatureCard.tsx      # Tarjetas de características
│   ├── VideoEmbed.tsx       # Video de YouTube embebido
│   ├── BenefitsList.tsx     # Lista de beneficios
│   ├── StepsBand.tsx        # Banda de pasos (fondo azul)
│   ├── PackagesModal.tsx    # Modal de paquetes
│   └── Providers.tsx        # Provider de Redux
├── store/
│   ├── index.ts             # Configuración de Redux store
│   └── services/
│       └── packagesApi.ts   # RTK Query para API de paquetes
├── lib/
│   └── env.ts               # Helper para variables de entorno
└── public/                  # Assets estáticos
```

## 🎨 Componentes Principales

### Header

- Logo "tuConta" con branding
- Subtítulo descriptivo
- Icono de cierre (no funcional)

### Feature Cards (4)

- Hacemos tu contabilidad mensual
- Calculamos tus impuestos
- Presentamos tus declaraciones SAT
- Cálculo, timbrado y envío de nómina

### Video + Benefits

- Video de YouTube responsivo (16:9)
- Lista de 4 beneficios con iconos de check

### Steps Band

- 3 pasos con iconos y descripciones
- Fondo azul con texto blanco

### CTA Section

- Texto de ayuda
- Botón "Ver paquetes" (abre modal)
- Botón "Agenda una cita"

### Packages Modal

- Lista de paquetes desde API
- Estados de carga y error
- Botón de reintento

## 🔧 Configuración de API

El modal de paquetes consume datos de una API REST. Para configurar:

1. **Variable de entorno:**

   ```env
   NEXT_PUBLIC_PACKAGES_API=https://tu-api.com/packages
   ```

2. **Formato de respuesta esperado:**
   ```json
   [
   	{
   		"id": "1",
   		"name": "Paquete Básico",
   		"price": "1000.00",
   		"description": "Incluye acceso a funciones esenciales."
   	},
   	{
   		"id": "2",
   		"name": "Paquete Premium",
   		"price": "2000.00",
   		"description": "Incluye acceso a todas las funciones avanzadas."
   	}
   ]
   ```

## 📱 Responsividad

- **Desktop:** Layout de 4 columnas para feature cards
- **Tablet:** Layout de 2 columnas para feature cards
- **Mobile:** Layout de 1 columna, video arriba de beneficios
- **Steps Band:** Vertical en móvil, horizontal en desktop
- **Botones:** Stack vertical en móvil, horizontal en desktop

## 🎯 Funcionalidades

- ✅ Feature cards con hover effects
- ✅ Modal de paquetes con RTK Query
- ✅ Video de YouTube responsivo
- ✅ Diseño completamente responsivo
- ✅ Accesibilidad con ARIA labels
- ✅ Estados de carga y error
- ✅ TypeScript para type safety

## 🚀 Scripts Disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## 🎨 Paleta de Colores

- **Primary:** #176BFF (Azul principal)
- **Accent:** #2ecc71 (Verde de éxito)
- **Dark:** #1f2937 (Texto oscuro)

## 📝 Notas de Desarrollo

- Todos los componentes usan `'use client'` para interactividad
- RTK Query maneja automáticamente el cache y re-fetch
- Tailwind CSS proporciona utilidades para responsive design
- Ant Design se integra con el tema personalizado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
