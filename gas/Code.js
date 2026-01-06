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
    .setTitle('NEXE Core v20');
  // IMPORTANT: no ALLOWALL. Mejor no abrir clickjacking por defecto.
}

/**
 * EMAIL SOURCE OF TRUTH
 * Si podemos obtener el email del contexto GAS, ignoramos el email del cliente.
 */
function getCallerEmail_() {
  try {
    var email = Session.getActiveUser().getEmail();
    return (email || '').toString().trim().toLowerCase();
  } catch (e) {
    return '';
  }
}

/**
 * Normaliza email para comparar (Gmail: ignora puntos y +alias)
 */
function normalizeEmail_(email) {
  email = (email || '').toString().trim().toLowerCase();
  var parts = email.split('@');
  if (parts.length !== 2) return email;

  var local = parts[0];
  var domain = parts[1];

  // quita +alias
  local = local.split('+')[0];

  // Gmail: quita puntos
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.replace(/\./g, '');
  }
  return local + '@' + domain;
}

/**
 * Parsea listas tipo "A,B;C\nD" en array limpio
 */
function parseList_(value) {
  return String(value || '')
    .split(/[,\n;]/)
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return !!s; });
}

/**
 * 2. LÓGICA DE VALIDACIÓN (CRÍTICO)
 * Recibe (opcional) un email "hint" del cliente, pero SIEMPRE prioriza el email del contexto.
 */
function validateUserAccess(emailHint) {
  try {
    // --- PASO 0: EMAIL REAL ---
    var callerEmail = getCallerEmail_();
    var effectiveEmail = callerEmail || (emailHint || '').toString().trim().toLowerCase();

    if (!effectiveEmail) {
      return {
        authorized: false,
        message: "No s'ha pogut determinar l'email. Si estàs en entorn extern, no es pot validar sense context GAS."
      };
    }

    // --- PASO 1: CONEXIÓN ROBUSTA ---
    var ss = SpreadsheetApp.openById(SHEET_ID);

    // --- PASO 2: BUSCAR USUARIO EN 'DOCENTS' ---
    var sheetDocents = ss.getSheetByName('DOCENTS');
    if (!sheetDocents) throw new Error("No s'ha trobat la pestanya 'DOCENTS'");

    var dataDocents = sheetDocents.getDataRange().getValues();

    var target = normalizeEmail_(effectiveEmail);
    var docentRow = null;

    for (var i = 1; i < dataDocents.length; i++) {
      var rowEmail = normalizeEmail_(String(dataDocents[i][0] || ''));
      if (rowEmail && rowEmail === target) {
        docentRow = dataDocents[i];
        break;
      }
    }

    // Si no existe, fuera.
    if (!docentRow) {
      return {
        authorized: false,
        message: "Accés denegat: l'email no figura al llistat de DOCENTS."
      };
    }

    // --- PASO 3: OBTENER CONFIGURACIÓN Y PERMISOS ---
    var sheetConfig = ss.getSheetByName('CONFIG');
    var configData = {};
    var isAdmin = false;

    if (sheetConfig) {
      configData = getSystemConfig(sheetConfig);

      // Columna F: Càrrec
      var userRole = String(docentRow[5] || '').trim();
      var adminRoles = parseList_(configData['admin_roles']);

      // Match EXACTO
      isAdmin = adminRoles.indexOf(userRole) !== -1;
    }

    // --- PASO 4: DEVOLVER DATOS LIMPIOS AL FRONTEND ---
    return {
      authorized: true,
      email:    docentRow[0], // A: Mail
      ref:      docentRow[1], // B: Ref
      name:     docentRow[2], // C: Nom
      surname:  docentRow[3], // D: Cognom
      role:     String(docentRow[5] || '').trim(), // F: Càrrec
      isAdmin:  isAdmin
      // No enviamos CONFIG entera por seguridad.
    };

  } catch (error) {
    Logger.log("FATAL ERROR en validateUserAccess: " + error.toString());
    return {
      authorized: false,
      message: "Error del servidor (GAS): " + (error && error.message ? error.message : String(error))
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

  for (var i = 1; i < data.length; i++) {
    var key = String(data[i][0] || '').trim();
    var value = data[i][1];
    if (key) config[key] = value;
  }
  return config;
}
