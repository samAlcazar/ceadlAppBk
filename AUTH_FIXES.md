# CEADL App Backend

## Problema de Autenticación en Producción

### Cambios Realizados para Solucionar el Problema de Tokens

#### 1. Configuración de Cookies Mejorada
- Cambiado `sameSite` de `'strict'` a `'none'` en producción para permitir cookies cross-site
- Mantenido `'lax'` en desarrollo para mayor seguridad local
- Mejorada la configuración del `logOut` para limpiar cookies correctamente

#### 2. Autorización Dual (Cookies + Headers)
- El método `authorized` ahora verifica tanto cookies como headers `Authorization`
- Soporte para `Bearer token` en el header si las cookies no funcionan
- Mejor logging para debugging

#### 3. CORS Mejorado
- Agregados headers específicos para cookies: `['Content-Type', 'Authorization', 'Cookie']`
- Expuesto header `'Set-Cookie'` 
- Agregados orígenes de localhost para desarrollo

#### 4. Ruta de Debug
- Nueva ruta `/login/check` para verificar el estado de la autenticación
- Muestra información sobre cookies, headers y tokens

### Como Usar

#### Para verificar el estado de autenticación:
```
GET /login/check
```

#### Respuesta esperada:
```json
{
  "hasCookies": true,
  "hasAuthHeader": false,
  "token": "Present",
  "environment": "production",
  "origin": "https://app.ceadl.org.bo",
  "userAgent": "Mozilla/5.0..."
}
```

### Variables de Entorno Necesarias

Asegúrate de tener configuradas en Railway:
```
NODE_ENV=production
JWT_SECRET=tu_secret_jwt
DATABASE_URL=tu_url_de_base_de_datos
```

### Frontend - Configuración Necesaria

En tu frontend, asegúrate de:

1. **Enviar credentials en las requests:**
```javascript
fetch('https://tu-backend.railway.app/login/authorized', {
  method: 'GET',
  credentials: 'include', // IMPORTANTE: Esto envía las cookies
  headers: {
    'Content-Type': 'application/json'
  }
})
```

2. **O usar Authorization header como alternativa:**
```javascript
fetch('https://tu-backend.railway.app/login/authorized', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
```

### Debugging en Producción

1. Revisa los logs de Railway para ver los console.log del backend
2. Usa la ruta `/login/check` para verificar qué está recibiendo el servidor
3. Verifica que el frontend esté enviando `credentials: 'include'`
4. Asegúrate de que el dominio del frontend esté en la lista de `ACCEPTED_ORIGINS`

### Deployment en Railway

Después de hacer estos cambios:

1. Commit y push los cambios:
```bash
git add .
git commit -m "Fix authentication token persistence in production"
git push origin main
```

2. Railway se redesplegará automáticamente

3. Verifica que las variables de entorno estén configuradas correctamente

### Posibles Problemas Adicionales

Si el problema persiste, revisa:

1. **Dominio del frontend:** Asegúrate de que esté en `ACCEPTED_ORIGINS`
2. **HTTPS:** Las cookies con `secure: true` solo funcionan en HTTPS
3. **Configuración del frontend:** Debe enviar `credentials: 'include'`
4. **Firewall/Proxy:** Algunos proxies pueden filtrar cookies

### Testing

Para probar localmente con las mismas condiciones de producción:
```bash
NODE_ENV=production npm start
```