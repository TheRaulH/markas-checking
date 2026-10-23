// Pegar en Extensiones > Apps Script de la hoja de respuestas del formulario.
// Implementar > Nueva implementación > Aplicación web
//   Ejecutar como: yo · Quién tiene acceso: cualquier persona
// Copiar la URL en .env como VITE_SHEET_URL
//
// Columnas: A Marca temporal · B Nombre · C Cantidad · D Teléfono · E Estado · F Asesor
//           G Acompañantes confirmados · H Regalo titular · I Regalo acompañante
//           J Hora ingreso · K Hora salida

const HOJA = 'Respuestas de formulario 1'; // cambiar si la pestaña se llama distinto

const iso = (v) => (v instanceof Date ? v.toISOString() : String(v || ''));

function doGet() {
  const sh = SpreadsheetApp.getActive().getSheetByName(HOJA);
  const v = sh.getDataRange().getValues();
  const rows = [];
  for (let i = 1; i < v.length; i++) {
    const r = v[i];
    if (!r[1]) continue;
    rows.push({
      row: i + 1,
      marca: iso(r[0]),
      nombre: String(r[1]),
      cantidad: Number(r[2]) || 1,
      telefono: String(r[3]),
      estado: r[4] || 'Pendiente',
      asesor: r[5] || '',
      acompanantes: r[6] === '' ? '' : Number(r[6]),
      regaloTitular: r[7] || '',
      regaloAcomp: r[8] || '',
      horaIngreso: iso(r[9]),
      horaSalida: iso(r[10]),
    });
  }
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActive().getSheetByName(HOJA);
  sh.getRange(d.row, 5, 1, 7).setValues([[
    d.estado, d.asesor, d.acompanantes, d.regaloTitular, d.regaloAcomp, d.horaIngreso, d.horaSalida,
  ]]);
  return ContentService.createTextOutput('ok');
}
