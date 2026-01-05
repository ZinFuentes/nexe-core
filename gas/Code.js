// ==========================================
// NEXE v20 - Backend Core (Google Apps Script)
// ==========================================

// ID de la Hoja de Cálculo (Base de Datos)
const SHEET_ID = '17vdEPyyg6L1b2L-nwLKLnHH7AkItc2eFSiMaVZhLeHo';

/**
 * 1. PUERTA DE ENTRADA (MANDATORIO)
 * Renderiza la aplicación React (index.html)
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setTitle('NEXE Core v20')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 2. LÓGICA DE VALIDACIÓN (CRÍTICO)
 * Recibe el email de Google, busca en la hoja DOCENTS y devuelve los datos.
 */
function validateUserAccess(email) {
  try {
    // --- PASO 1: CONEXIÓN ROBUSTA ---
    // Usamos openById para asegurar que conecta SIEMPRE, sin importar el contexto.
    var ss = SpreadsheetApp.openById(SHEET_ID);
    
    // --- PASO 2: BUSCAR USUARIO EN 'DOCENTS' ---
    var sheetDocents = ss.getSheetByName('DOCENTS');
    if (!sheetDocents) throw new Error("No s'ha trobat la pestanya 'DOCENTS'");

    var dataDocents = sheetDocents.getDataRange().getValues();
    
    // Buscamos el usuario (Saltamos cabecera fila 0)
    var docentRow = null;
    
    for (var i = 1; i < dataDocents.length; i++) {
      // Columna A (índice 0) es el Email
      var rowEmail = dataDocents[i][0].toString().trim().toLowerCase();
      
      if (rowEmail === email.toLowerCase()) {
        docentRow = dataDocents[i];
        break; 
      }
    }

    // Si no existe, fuera.
    if (!docentRow) {
      return {
        authorized: false,
        message: "Accés denegat: L'email " + email + " no figura al llistat de DOCENTS."
      };
    }

    // --- PASO 3: OBTENER CONFIGURACIÓN Y PERMISOS ---
    var sheetConfig = ss.getSheetByName('CONFIG');
    var configData = {};
    var isAdmin = false;

    if (sheetConfig) {
      // Usamos el helper para convertir la tabla Config en un objeto útil
      configData = getSystemConfig(sheetConfig);
      
      // Verificamos si el cargo del usuario está en la lista de 'admin_roles'
      var userRole = docentRow[5].toString(); // Columna F: Càrrec
      var adminRoles = configData['admin_roles'] || '';
      
      if (adminRoles.indexOf(userRole) !== -1) {
        isAdmin = true;
      }
    }

    // --- PASO 4: DEVOLVER DATOS LIMPIOS AL FRONTEND ---
    return {
      authorized: true,
      email:    docentRow[0], // A: Mail
      ref:      docentRow[1], // B: Ref
      name:     docentRow[2], // C: Nom
      surname:  docentRow[3], // D: Cognom
      role:     docentRow[5], // F: Càrrec
      isAdmin:  isAdmin,
      config:   configData    // Enviamos la config al front por si acaso
    };

  } catch (error) {
    Logger.log("FATAL ERROR en validateUserAccess: " + error.toString());
    return {
      authorized: false,
      message: "Error del servidor (GAS): " + error.message
    };
  }
}

/**
 * 3. HELPER: LEER CONFIGURACIÓN
 * Convierte la hoja CONFIG (Clave, Valor) en un objeto JSON
 */
function getSystemConfig(sheet) {
  var config = {};
  if (!sheet) return config;
  
  var data = sheet.getDataRange().getValues();
  
  // Asumimos Columna A = Clave, Columna B = Valor
  // Empezamos en 1 para saltar cabeceras
  for (var i = 1; i < data.length; i++) {
    var key = data[i][0].toString();
    var value = data[i][1];
    if (key) {
      config[key] = value;
    }
  }
  return config;
}