// Configuración de la tienda TS Zenit. Edita solo lo que está entre comillas.
window.TSZ_CONFIG = {
  endpoint: "https://script.google.com/macros/s/AKfycbwG59Ku572mY50i_sVUutfwPNSenXgwNDkgtKsy2TvpQpHTfQkFd9oy9kYlP9W89L-I/exec",   // URL de la aplicación web de Google Apps Script (termina en /exec)
  // Links de pago de Mercado Pago, uno por monto (el eje completo cuesta $5.000 menos que sus guías sueltas)
  mp: {
    4500:  "https://mpago.la/2TDqr3U",   // guía suelta con código promocional (−10 %)
    5000:  "https://mpago.la/1Xxykhf",   // guía suelta
    10000: "https://mpago.la/17kAoK7",   // ejes de 3 guías: Física Energía y Tierra, Física Electricidad, Biología Organización celular, Biología Organismo y ambiente
    20000: "https://mpago.la/2Zb951C",   // ejes de 5 guías: Química Estructura atómica, Química orgánica
    30000: "https://mpago.la/14iiQi4",   // ejes de 7 guías: M1 Números, M1 Probabilidad, M2 Números, M2 Álgebra, Física Ondas, Física Mecánica, Biología Procesos y funciones, Biología Herencia y evolución, Química Reacciones
    40000: "https://mpago.la/2JeGNME",   // ejes de 9 guías: M1 Geometría, M2 Probabilidad y estadística
    50000: "https://mpago.la/2qjd5z5",   // eje de 11 guías: M2 Geometría
    60000: "https://mpago.la/2cQftwK",   // eje de 13 guías: M1 Álgebra y funciones
    70000: "https://mpago.la/22WggkU"    // eje de 15 guías: Precálculo (Universidad)
  },
  contacto: "trabajotszenit@gmail.com",    // correo de contacto visible para los compradores
  clientId: "646234191968-dfi7md4dmfiqgrqmksd7i0lh22t2o4mv.apps.googleusercontent.com"    // ID de cliente de Google para «Iniciar sesión» (termina en .apps.googleusercontent.com)
};
