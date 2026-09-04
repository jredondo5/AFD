// Google Apps Script para recibir las entregas y sugerencias de "Tu turno"
// y guardarlas como filas nuevas en una Google Sheet.
//
// Instrucciones de instalación (una sola vez):
// 1. Crea una hoja de cálculo nueva en Google Sheets (p. ej. "AFD — Entregas y sugerencias").
// 2. Dentro de la hoja: Extensiones > Apps Script.
// 3. Borra el contenido de Code.gs que aparece por defecto y pega este archivo entero.
// 4. Guarda el proyecto (Ctrl+S / icono de disco), dale un nombre (p. ej. "AFD Entregas").
// 5. Pulsa "Implementar" > "Nueva implementación".
// 6. Tipo: "Aplicación web". Ejecutar como: "Yo". Quién tiene acceso: "Cualquier usuario".
//    (Es necesario que sea "Cualquier usuario" para que el sitio pueda enviar datos sin
//    que cada alumno tenga que iniciar sesión en Google. No hace falta compartir la hoja).
// 7. Pulsa "Implementar" y autoriza los permisos que pida Google (es tu propio script).
// 8. Copia la "URL de la aplicación web" (termina en /exec).
// 9. Pega esa URL en la constante SCRIPT_URL de cada página del sitio (búscala como
//    "PEGA_AQUI_LA_URL_DE_TU_APPS_SCRIPT_WEB_APP" en los ficheros 01-fuerza.html … 08-malabares.html).
//
// Cada envío añade una fila con: fecha y hora, bloque, tipo (Entrega/Sugerencia),
// nombre y grupo (tal como los escribe el alumno, sin verificar identidad), y el mensaje.

var HOJA = 'Entregas';
var CABECERA = ['Fecha y hora', 'Bloque', 'Tipo', 'Nombre', 'Grupo', 'Mensaje'];

function doPost(e) {
  var datos = JSON.parse(e.postData.contents);
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA);
  if (!hoja) {
    hoja = SpreadsheetApp.getActiveSpreadsheet().insertSheet(HOJA);
  }
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(CABECERA);
  }
  hoja.appendRow([
    new Date(),
    datos.bloque || '',
    datos.tipo || '',
    datos.nombre || '',
    datos.grupo || '',
    datos.mensaje || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('El script de Entregas AFD está activo.');
}
