# 🚀 Configuración de EmailJS para LikeVendor

## 📋 **PASOS PARA CONFIGURAR EMAILJS:**

### **1️⃣ Crear cuenta en EmailJS:**
- Ve a: https://www.emailjs.com/
- Haz clic en **"Sign Up"**
- Regístrate con tu email personal

### **2️⃣ Obtener tu User ID (Public Key):**
- Una vez registrado, ve a **"Account"** → **"API Keys"**
- Copia tu **"Public Key"** (es tu User ID)
- Ejemplo: `Q4w1Tl7wnYSIrgGU0`

### **3️⃣ Crear un Email Service:**
- Ve a **"Email Services"**
- Haz clic en **"Add New Service"**
- Selecciona **"Gmail"** (o el que prefieras)
- Conecta tu cuenta de Gmail
- Copia el **"Service ID"** que se genera
- Ejemplo: `service_98mlbaz`

### **4️⃣ Crear un Email Template:**
- Ve a **"Email Templates"**
- Haz clic en **"Create New Template"**
- Usa este template HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Verificación - LikeVendor</title>
</head>
<body>
    <h2>🔐 Código de Verificación - LikeVendor</h2>
    <p>Hola {{user_name}},</p>
    <p>Tu código de verificación es:</p>
    <h1 style="color: #667eea; font-size: 42px; letter-spacing: 8px;">{{verification_code}}</h1>
    <p>Este código expira en 5 minutos.</p>
    <p>Si no solicitaste este código, ignóralo.</p>
    <p>Saludos,<br>Equipo LikeVendor</p>
</body>
</html>
```

- Guarda el template y copia el **"Template ID"**
- Ejemplo: `template_t2mz62r`

---

## 🔧 **ACTUALIZAR CONFIGURACIÓN:**

### **Archivo a modificar:**
```typescript
// src/environments/emailjs.config.ts
export const emailjsConfig = {
  userId: 'TU_USER_ID_AQUI',        // Public Key de EmailJS
  serviceId: 'TU_SERVICE_ID_AQUI',  // Service ID del servicio de email
  templateId: 'TU_TEMPLATE_ID_AQUI', // Template ID del template
  timeout: 10000,
};
```

---

## ✅ **VERIFICAR FUNCIONAMIENTO:**

### **1️⃣ Probar envío de email:**
- Registra un usuario con tu email
- Deberías recibir el código por email
- El código se valida en el frontend

### **2️⃣ Verificar en consola:**
- Abre DevTools (F12)
- Ve a la pestaña Console
- Deberías ver: `📧 Enviando código de verificación a: tuemail@gmail.com`

---

## 🎯 **VENTAJAS DE ESTA IMPLEMENTACIÓN:**

### **✅ Seguridad:**
- **EmailJS es un servicio confiable**
- **Verificación de email real**
- **Código generado en servidor**
- **Estándar de la industria**

### **✅ Simplicidad:**
- **Sin backend para emails**
- **200 emails gratis por mes**
- **Configuración en 5 minutos**
- **Funciona inmediatamente**

---

## 🚨 **SOLUCIÓN DE PROBLEMAS:**

### **Error: "EmailJS not configured"**
- Verifica que los IDs estén correctos
- Asegúrate de que EmailJS esté cargado

### **Error: "Service not found"**
- Verifica el Service ID
- Asegúrate de que el servicio esté activo

### **Error: "Template not found"**
- Verifica el Template ID
- Asegúrate de que el template esté publicado

---

## 🎉 **¡LISTO!**

Una vez configurado EmailJS, tu sistema de registro funcionará perfectamente:
- ✅ **Emails se envían automáticamente**
- ✅ **Códigos se validan en frontend**
- ✅ **Usuarios se registran sin problemas**
- ✅ **Sistema completamente funcional**

**¿Necesitas ayuda con algún paso específico?** 🚀
