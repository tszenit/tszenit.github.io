// Configuración de la tienda TS Zenit. Edita solo lo que está entre comillas.
window.TSZ_CONFIG = {
  endpoint: "https://script.google.com/macros/s/AKfycbwG59Ku572mY50i_sVUutfwPNSenXgwNDkgtKsy2TvpQpHTfQkFd9oy9kYlP9W89L-I/exec",   // URL de la aplicación web de Google Apps Script (termina en /exec)
  // Links de pago de Mercado Pago, uno por monto (el eje completo cuesta $5.000 menos que sus guías sueltas)
  mp: {
    // Rebaja de fin de año (hasta el 31-12-2026): mitad de precio terminado en 90
    2241: "https://mpago.la/1gKxU6k",   // guía o ensayo suelto (rebaja de fin de año) con código promocional (−10 %)
    2490: "https://mpago.la/2e8Deei",   // guía o ensayo suelto (rebaja de fin de año)
    4041: "https://mpago.la/1BAVBkh",   // eje Ensayo PAES (2 ensayos) con código promocional (−10 %)
    4490: "https://mpago.la/1fZhBNc",   // eje Ensayo PAES (2 ensayos)
    4491: "https://mpago.la/2KLP4ai",   // ejes de 3 guías con código promocional (−10 %)
    4990: "https://mpago.la/25pgkpK",   // ejes de 3 guías
    8991: "https://mpago.la/19TwL7F",   // ejes de 5 guías con código promocional (−10 %)
    9990: "https://mpago.la/1suTagJ",   // ejes de 5 guías
    13491: "https://mpago.la/1dY6iZT",   // ejes de 7 guías con código promocional (−10 %)
    14990: "https://mpago.la/1REXuqc",   // ejes de 7 guías
    17991: "https://mpago.la/2iLMEmC",   // ejes de 9 guías con código promocional (−10 %)
    19990: "https://mpago.la/2L6EQJX",   // ejes de 9 guías
    22491: "https://mpago.la/2mGZMAv",   // eje de 11 guías con código promocional (−10 %)
    24990: "https://mpago.la/2euZ6mx",   // eje de 11 guías
    26991: "https://mpago.la/17sT6gV",   // eje de 13 guías con código promocional (−10 %)
    29990: "https://mpago.la/1hiTbDR",   // eje de 13 guías
    31491: "https://mpago.la/2YJLm9W",   // eje de 15 guías con código promocional (−10 %)
    34990: "https://mpago.la/1He9rPW",   // eje de 15 guías
    71991: "https://mpago.la/1azd4c2",   // eje Cálculo 1 con código promocional (−10 %)
    79990: "https://mpago.la/2wdUgNN",   // eje Cálculo 1 (33 guías)
    49990: "https://mpago.la/15G84w7",   // Intensivo Matemática o Ciencias
    // Precios normales (desde el 1-1-2027)
    4500:  "https://mpago.la/2TDqr3U",   // guía suelta con código promocional (−10 %)
    5000:  "https://mpago.la/1Xxykhf",   // guía suelta
    9000:  "https://mpago.la/2MbCK3Y",   // ejes de 3 guías con código promocional (−10 %)
    10000: "https://mpago.la/17kAoK7",   // ejes de 3 guías: Física Energía y Tierra, Física Electricidad, Biología Organización celular, Biología Organismo y ambiente
    18000: "https://mpago.la/2ZWgtWK",   // ejes de 5 guías con código promocional (−10 %)
    20000: "https://mpago.la/2Zb951C",   // ejes de 5 guías: Química Estructura atómica, Química orgánica
    27000: "https://mpago.la/2uy4wFP",   // ejes de 7 guías con código promocional (−10 %)
    30000: "https://mpago.la/14iiQi4",   // ejes de 7 guías: M1 Números, M1 Probabilidad, M2 Números, M2 Álgebra, Física Ondas, Física Mecánica, Biología Procesos y funciones, Biología Herencia y evolución, Química Reacciones
    36000: "https://mpago.la/2no5LqT",   // ejes de 9 guías con código promocional (−10 %)
    40000: "https://mpago.la/2JeGNME",   // ejes de 9 guías: M1 Geometría, M2 Probabilidad y estadística, Cálculo 1
    45000: "https://mpago.la/1MGVX6m",   // eje de 11 guías con código promocional (−10 %)
    50000: "https://mpago.la/2qjd5z5",   // eje de 11 guías: M2 Geometría
    54000: "https://mpago.la/1QHYrKJ",   // eje de 13 guías con código promocional (−10 %)
    60000: "https://mpago.la/2cQftwK",   // eje de 13 guías: M1 Álgebra y funciones
    63000: "https://mpago.la/126JsRu",   // eje de 15 guías con código promocional (−10 %)
    70000: "https://mpago.la/22WggkU",   // eje de 15 guías: Precálculo (Universidad)
    99990: "https://mpago.la/2NxzSTU"    // Intensivo antes de la rebaja ($99.990)
  },
  mpNumpy: "https://mpago.la/2TukQVW",   // link de pago de Mercado Pago del curso NumPy y álgebra lineal ($64.990)
  contacto: "trabajotszenit@gmail.com",    // correo de contacto visible para los compradores
  clientId: "646234191968-dfi7md4dmfiqgrqmksd7i0lh22t2o4mv.apps.googleusercontent.com"    // ID de cliente de Google para «Iniciar sesión» (termina en .apps.googleusercontent.com)
};
