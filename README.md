# tuConta Landing Page

Una landing page moderna y responsiva para "tuConta - Tu Contador en línea" construida con Next.js 14, TypeScript, Tailwind CSS y Ant Design. La aplicación presenta servicios de contabilidad en línea con un diseño profesional y funcionalidades interactivas.

## ✅ Cumplimiento de la Prueba Técnica (DDM)

- **Estructura (Next.js + componentes reutilizables)**: Código organizado en `app/` y `components/` con piezas reutilizables (`Header`, `FeatureCard`, `VideoEmbed`, `BenefitsList`, `StepsBand`, `PackagesModal`).
- **Librerías recomendadas**: Uso de **Ant Design** (Modal, Card, etc.) y **RTK Query** para consumo de API.
- **Estilos (Tailwind, Flexbox/Grid)**: Tailwind CSS para utilidades y responsive. Uso extensivo de **Grid** y **Flex** para layout.
- **Iconos/Logo**: Iconos e imágenes genéricos optimizados en WebP.
- **Responsive**: Diseño adaptativo para móvil, tablet y escritorio.
- **Interactividad**:
  - 4 cards con efecto hover (sombra y elevación).
  - Botón "Ver paquetes" abre un **modal centrado** con contenido dinámico.
  - Modal con **título "Lista de paquetes"**, lista con **nombre, precio y descripción**.
  - Incluye botón **"Cerrar"** explícito en el footer y cierre por `onCancel`.
  - Datos obtenidos dinámicamente desde **MockAPI** vía **RTK Query** al abrir el modal.
- **Video**: Embebido desde **YouTube** (privacy mode) con thumbnail y autoplay al reproducir.
- **Código y entrega**: Repositorio listo para GitHub/GitLab; deploy deseable (ver instrucciones de ejecución).

## 🚀 Características

- **Next.js 14** con App Router y Server Components
- **TypeScript** para type safety y mejor desarrollo
- **Tailwind CSS** para estilos responsivos y modernos
- **Ant Design** para componentes UI profesionales
- **Redux Toolkit + RTK Query** para manejo de estado y API
- **Vitest + Testing Library** para testing unitario e integración
- **Diseño responsivo** optimizado para móvil, tablet y desktop
- **Accesibilidad** con ARIA labels, semantic HTML y focus management
- **Modal interactivo** con paginación y gestión de estado persistente
- **Video embebido** de YouTube responsivo
- **Confirmación de salida** con redirección externa
- **Optimización de imágenes** con WebP para mejor rendimiento

## 🔧 Configuración de MockAPI

Por defecto, el proyecto apunta a una instancia de MockAPI. Puedes configurar tu propio endpoint:

1. Crea `.env.local` en la raíz con:

```env
NEXT_PUBLIC_PACKAGES_API=https://<tu-mockapi>.mockapi.io/api/v1/
```

2. El servicio construye la URL de consulta como `GET /lista-de-paquetes?page=<n>&limit=<m>`.
   - Asegúrate de exponer un recurso `lista-de-paquetes` que devuelva un arreglo de objetos con:
     - `id`, `name`, `price`, `description` (campos mínimos).

Ejemplo de respuesta válida:

```json
[
	{ "id": "1", "name": "Paquete Básico", "price": "1000.00", "description": "Incluye acceso a funciones esenciales." },
	{
		"id": "2",
		"name": "Paquete Premium",
		"price": "2000.00",
		"description": "Incluye acceso a todas las funciones avanzadas."
	}
]
```

Si tu API responde con otras formas comunes (`{ data: [...] }`, `{ items: [...] }` o `{ result: [...] }`), el transformador las normaliza automáticamente.

## 📚 Documentación adicional

- [Data Fetching (RTK Query)](docs/data-fetching.md)
- [Uso de Redux en el proyecto](docs/redux-usage.md)

## 🛠️ Instalación

1. Clonar repo

```bash
git clone <repository-url>
cd tuconta
```

2. Instalar deps

```bash
npm install
```

3. Variables de entorno

```env
NEXT_PUBLIC_PACKAGES_API=https://<tu-mockapi>.mockapi.io/api/v1/
```

4. Desarrollo

```bash
npm run dev
```

5. Abrir en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
tuconta/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── FeatureCard.tsx
│   ├── VideoEmbed.tsx
│   ├── BenefitsList.tsx
│   ├── StepsBand.tsx
│   ├── PackagesModal.tsx
│   ├── Providers.tsx
│   └── CacheCleanup.tsx
├── store/
│   ├── index.ts
│   ├── hooks.ts
│   ├── slices/
│   │   └── uiSlice.ts
│   └── services/
│       └── packagesApi.ts
├── lib/
│   ├── env.ts
│   ├── safeStorage.ts
│   └── cacheCleanup.ts
├── tests/
│   ├── setupTests.ts
│   ├── packagesApi.transformResponse.test.ts
│   ├── PackagesModal.integration.test.tsx
│   └── safeStorage.test.ts
└── public/
    └── images/
```

## 🎨 Componentes Principales

- Ver sección previa del README (detallado por componente).

## 📊 Performance Metrics

![Lighthouse Performance Score](/public/msc/Lighthouse.png)

## 🖼️ UI Comparison

![UI Comparison](/public/msc/UI_comparison.png)

## 🧪 Testing

```bash
npm run test
npm run test:watch
```

Incluye: parsing de API, integración del modal y utilidades de almacenamiento.

## 📝 Notas de Desarrollo

- Modal con botón "Cerrar" y cierre por `onCancel` (cumple requisito).
- Respuesta de API normalizada para múltiples formatos comunes.
- Accesibilidad: ARIA, focus management y navegación por teclado.
- Cache limpia al salir de la página (`beforeunload`).
- Imágenes WebP para rendimiento.

## 🚀 Deploy (deseable)

- Build de producción: `npm run build && npm run start`
- Puede desplegarse en Vercel, Netlify u otro PaaS.
