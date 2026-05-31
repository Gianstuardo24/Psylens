# Psylens — Pantallas secundarias y estados de sistema

## Flujos de autenticación

### Registro
1. Email + contraseña (mínimo 8 caracteres)
2. Verificación de email → pantalla de espera con ícono de sobre
3. Email verificado → ir a Onboarding

### Login
- Email + contraseña
- Link "Olvidé mi contraseña" → flujo de recuperación
- Si ya tiene sesión activa → ir directo a Dashboard

### Recuperar contraseña
- Paso 1: input de email → "Enviar instrucciones"
- Paso 2: pantalla de confirmación "Revisa tu correo"
- Paso 3: deep link desde email → input nueva contraseña × 2
- Paso 4: "Contraseña actualizada" → ir a Login

### Verificación de email
- Pantalla con ícono de sobre animado
- "Enviamos un enlace a [email]"
- Botón "Reenviar correo" (con cooldown de 60 segundos)
- Link "Cambiar email" → vuelve al registro

---

## Sub-pantallas de Configuración

### Editar perfil
- Input nombre (pre-llenado)
- Input email (pre-llenado)
- Avatar: inicial del nombre o foto (si se agrega foto en v2)
- Botón "Guardar cambios"
- Validación: nombre no vacío, email válido
- Estado de carga mientras guarda
- Confirmación: toast "Perfil actualizado"

### Selección de idioma
- Lista con dos opciones: Español / English
- Checkmark en el activo (color verde)
- Cambio inmediato al seleccionar — no requiere confirmar
- La app entera cambia de idioma al instante

### Selección de hora (recordatorio diario)
- Picker nativo de hora (HH:MM)
- Preview: "Recibirás tu recordatorio a las 9:00 AM"
- Botón "Guardar"
- Si las notificaciones no están activadas → mostrar prompt de permisos primero

### Cancelar suscripción
- Pantalla de confirmación antes de cancelar
- Título: "¿Seguro que quieres cancelar?"
- Texto: "Perderás el acceso a todos los bloques premium al final del período actual ([fecha])."
- CTA peligroso: "Sí, cancelar" (coral)
- CTA seguro: "Mantener Premium" (tinta/púrpura)

---

## Estados de error y vacío

### Sin conexión a internet
- Banner sticky en la parte superior de cualquier pantalla
- Ícono de wifi cortado + "Sin conexión"
- Color: superficie oscura con texto tinta4
- El contenido ya descargado sigue siendo accesible (AsyncStorage)
- Al recuperar conexión: el banner desaparece con animación

### Error de carga
- Cuando falla una petición al servidor
- Pantalla centrada con ícono simple
- Título: "Algo salió mal"
- Subtítulo: "No pudimos cargar el contenido. Inténtalo de nuevo."
- Botón: "Reintentar"

### Sesión expirada
- Modal sobre la pantalla actual
- "Tu sesión ha expirado"
- Botón: "Volver a iniciar sesión"
- Al confirmar → ir a Login, conservar el progreso local

---

## Estados de carga (loading)

### Splash de carga inicial
- Logo animado (pulse)
- Sin texto adicional
- Máximo 2 segundos — si tarda más, mostrar barra de progreso sutil

### Skeleton screens
- En lugar de spinners, usar skeleton placeholders del color de surface2
- AuthorCard skeleton: rectángulo 110px con círculo 64px a la izquierda
- ConceptCard skeleton: rectángulo 48px
- Animación shimmer: gradiente que se desplaza de izquierda a derecha

### Estados de botones
- Normal: color sólido
- Loading: spinner blanco centrado + color más oscuro, deshabilitado
- Success: check verde breve antes de navegar
- Error: shake animation + borde coral

---

## Flujos de compra (suscripción)

### Pantalla pre-paywall
Aparece al intentar acceder a contenido premium sin suscripción:
- Modal bottom sheet (no pantalla completa)
- Título: "Esto es contenido Premium"
- Descripción breve del bloque o capa bloqueada
- CTA: "Ver planes →"
- Link: "Ahora no"

### Proceso de compra
1. Usuario toca "Desbloquear Premium →"
2. Se abre el sistema de pagos nativo (Apple Pay / Google Pay / tarjeta)
3. Durante la transacción: pantalla de carga con logo animado
4. Éxito: pantalla de celebración
   - Lentes en púrpura con glow
   - "¡Ya eres Premium!"
   - "Tienes acceso a todo el camino"
   - CTA: "Continuar leyendo →"
5. Error de pago: mensaje de error + opción de reintentar

### Restaurar compras
- Opción en Configuración → Suscripción
- Botón: "Restaurar compras"
- Estados: cargando → éxito ("Compra restaurada") → error ("No encontramos compras anteriores")

---

## Notificaciones in-app

### Toast (notificación temporal)
- Aparece en la parte inferior, sobre la nav bar
- Duración: 3 segundos
- Tipos:
  - Success (borde verde): "Concepto desbloqueado", "Perfil actualizado"
  - Info (borde púrpura): "Racha de 7 días"
  - Error (borde coral): "Error al guardar"

### Modal de logro desbloqueado
Aparece automáticamente al desbloquear un logro:
- Overlay oscuro semitransparente
- Card centrada con:
  - Ícono del logro animado (scale pop)
  - "Logro desbloqueado"
  - Nombre del logro
  - Descripción breve
- Se cierra solo después de 3 segundos o al tocar

---

## Gestos y navegación

### Swipe back
- En todas las pantallas con ← en el top bar
- Swipe desde el borde izquierdo vuelve a la pantalla anterior
- Animación nativa de iOS/Android

### Pull to refresh
- En Dashboard, Glosario y Perfil
- Indicador nativo de carga
- Recarga los datos del servidor

### Scroll behavior
- Top bar se oculta al hacer scroll hacia abajo en pantallas de autor
- Vuelve a aparecer al hacer scroll hacia arriba
- Animación suave, no brusca

### Long press en AuthorCard
- Vibración háptica
- Muestra un preview rápido del primer concepto del autor
- Al soltar: navega a la pantalla del autor

---

## Permisos del sistema

### Notificaciones push
- Se piden después del Onboarding, no antes
- Pantalla intermedia antes del prompt del sistema:
  - Ícono de campana
  - "No pierdas tu racha"
  - "Te avisamos una vez al día para que sigas tu camino."
  - Botón: "Activar recordatorios"
  - Link: "Ahora no"
- Si el usuario rechaza: no volver a pedir hasta que lo active manualmente en Configuración

---

## Accesibilidad

- Todos los textos tienen accessibilityLabel
- Contraste mínimo WCAG AA en ambos modos
- Los botones tienen tamaño mínimo de toque 44x44px
- El modo oscuro/claro respeta la preferencia del sistema por defecto
- Dynamic Type: los textos escalan con la configuración de accesibilidad del dispositivo

---

## Persistencia de datos (AsyncStorage)

```typescript
// Claves de almacenamiento local
const STORAGE_KEYS = {
  USER_NAME: 'psylens_user_name',
  USER_EMAIL: 'psylens_user_email',
  THEME: 'psylens_theme', // 'dark' | 'light' | 'system'
  LANGUAGE: 'psylens_language', // 'es' | 'en'
  ONBOARDING_DONE: 'psylens_onboarding_done',
  STREAK: 'psylens_streak',
  LAST_ACTIVE: 'psylens_last_active',
  PROGRESS: 'psylens_progress', // objeto con progreso por autor
  UNLOCKED_CONCEPTS: 'psylens_concepts',
  NOTIFICATION_TIME: 'psylens_notif_time',
  IS_PREMIUM: 'psylens_is_premium',
  MOTIVATION: 'psylens_motivation', // respuesta del onboarding paso 2
};
```

---

## Lógica de racha (streak)

- Se guarda la fecha del último día activo en LAST_ACTIVE
- Al abrir la app: comparar fecha actual con LAST_ACTIVE
  - Mismo día → racha se mantiene, no suma
  - Día siguiente → racha +1
  - Pasaron 2+ días → racha se resetea a 0
- La racha se considera "activa" si el usuario completó al menos una capa ese día
- Notificación de alerta: si a las 8PM el usuario no ha abierto la app, enviar alerta

---

## Lógica de desbloqueo

```typescript
// Un autor se desbloquea cuando el autor anterior tiene surface=done
// Una capa se desbloquea cuando la capa anterior está done
// Un concepto se desbloquea al completar la capa que lo contiene

function canAccessAuthor(authorIndex: number, progress: Progress[]): boolean {
  if (authorIndex === 0) return true;
  return progress[authorIndex - 1]?.surface === 'done';
}

function canAccessLayer(authorId: string, layer: 'concept' | 'depth', progress: Progress): boolean {
  if (layer === 'concept') return progress.surface === 'done';
  if (layer === 'depth') return progress.concept === 'done';
  return false;
}

function canAccessBlock(blockIndex: number, progress: BlockProgress[]): boolean {
  if (blockIndex === 0) return true;
  return progress[blockIndex - 1]?.completed === true;
}
```

---

## Internacionalización (i18n)

Estructura de archivos de traducción:
```
locales/
├── es.json   ← español (idioma por defecto)
└── en.json   ← inglés
```

Cadenas que necesitan traducción:
- Toda la UI (labels, botones, placeholders, mensajes de error)
- El contenido de autores (CONTENT.md tiene la versión en español — la versión en inglés se genera en fase 2)
- Las notificaciones push

En v1: solo español. El toggle de idioma está visible pero el inglés dice "Coming soon".
