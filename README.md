# 🐾 Veterinaria App — Angular

Aplicación Angular para una clínica veterinaria. Permite registrar mascotas y dueños, agendar citas y consultar el historial de atención.

## 🧱 Stack

- **Angular 17+** (standalone false — usando NgModules para cumplir con la rúbrica de "arquitectura modular")
- **TypeScript** (strict mode)
- **Bootstrap 5** + Bootstrap Icons
- **ReactiveForms** para validación
- Persistencia en `localStorage` (no requiere backend)

## 🚀 Instalación

```bash
# 1. Crear proyecto base
npm install -g @angular/cli
ng new veterinaria --routing --style=scss --standalone=false
cd veterinaria

# 2. Instalar Bootstrap
npm install bootstrap bootstrap-icons

# 3. Copiar los archivos de este repositorio sobre src/
# (reemplaza src/app por la carpeta src/app proporcionada)

# 4. Registrar Bootstrap en angular.json -> projects.veterinaria.architect.build.options
#    "styles": [
#      "node_modules/bootstrap/dist/css/bootstrap.min.css",
#      "node_modules/bootstrap-icons/font/bootstrap-icons.css",
#      "src/styles.scss"
#    ],
#    "scripts": [
#      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
#    ]

# 5. Ejecutar
ng serve -o
```

## 🗂 Estructura

```
src/app/
├── app.module.ts
├── app-routing.module.ts
├── app.component.{ts,html,scss}
├── core/
│   └── layout/navbar.component.{ts,html}
├── shared/
│   ├── shared.module.ts
│   ├── models/         # interfaces y clases (POO)
│   │   ├── persona.model.ts
│   │   ├── dueno.model.ts
│   │   ├── mascota.model.ts
│   │   ├── cita.model.ts
│   │   └── historial.model.ts
│   ├── pipes/
│   │   ├── estado-cita.pipe.ts
│   │   └── edad-mascota.pipe.ts
│   ├── directives/
│   │   └── resaltar-cita.directive.ts
│   └── services/
│       └── storage.service.ts
├── mascotas/
│   ├── mascotas.module.ts
│   ├── mascotas-routing.module.ts
│   ├── services/mascotas.service.ts
│   └── pages/
│       ├── lista-mascotas/lista-mascotas.component.{ts,html}
│       └── form-mascota/form-mascota.component.{ts,html}
├── citas/
│   ├── citas.module.ts
│   ├── citas-routing.module.ts
│   ├── services/citas.service.ts
│   └── pages/
│       ├── agenda-citas/agenda-citas.component.{ts,html}
│       └── form-cita/form-cita.component.{ts,html}
└── historial/
    ├── historial.module.ts
    ├── historial-routing.module.ts
    ├── services/historial.service.ts
    └── pages/historial-mascota/historial-mascota.component.{ts,html}
```

## ✅ Cobertura de la rúbrica

| Criterio | Dónde se ve |
|---|---|
| Tipos, funciones tipadas, POO (clases, interfaces, herencia, encapsulamiento) | `shared/models/*` — `Persona` (clase base), `Dueno extends Persona`, `Mascota`, `Cita`, interfaces tipadas |
| Arquitectura modular | Módulos por dominio: `mascotas`, `citas`, `historial`, `shared`, `core` con lazy loading |
| Componentes reutilizables (@Input/@Output) | `shared` exporta componentes y formularios; `form-mascota` y `form-cita` emiten eventos |
| Pipes personalizados | `EstadoCitaPipe`, `EdadMascotaPipe` |
| Directivas personalizadas | `ResaltarCitaDirective` (resalta citas próximas en ≤ 24h) |
| ReactiveForms con validaciones | `form-mascota`, `form-cita` |
| Bootstrap | Navbar, cards, tablas, modales, formularios |
| Responsive | Grid de Bootstrap |

## 🧪 Pruebas manuales

1. Registrar un dueño + mascota en `/mascotas/nueva`.
2. Crear una cita desde `/citas/nueva`.
3. Ver agenda en `/citas`. Las citas próximas se resaltan en amarillo (directiva).
4. Consultar `/historial/:mascotaId` para ver el historial.

## 👥 Integrantes

- Integrante 1
- Integrante 2
- Integrante 3
