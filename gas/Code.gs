// =====================================
// NEXE OAUTH - Google Apps Script (GAS)
// =====================================

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("NEXE OAUTH");
}

// SHEET_ID stored in Script Properties
function getSheetId_() {
  return (PropertiesService.getScriptProperties().getProperty("SHEET_ID") || "").trim();
}

// Executa UNA vegada per configurar el Sheet correcte
function setSheetId(sheetId) {
  PropertiesService.getScriptProperties().setProperty("SHEET_ID", String(sheetId || "").trim());
  return { ok: true, sheetId: getSheetId_() };
}

// Email helpers
function getCallerEmail_() {
  try {
    return (Session.getActiveUser().getEmail() || "").trim().toLowerCase();
  } catch (e) {
    return "";
  }
}

function normalizeEmail_(email) {
  email = (email || "").toString().trim().toLowerCase();
  const parts = email.split("@");
  if (parts.length !== 2) return email;

  let local = parts[0];
  const domain = parts[1];

  local = local.split("+")[0];
  if (domain === "gmail.com" || domain === "googlemail.com") local = local.replace(/\./g, "");

  return local + "@" + domain;
}

function initials_(firstName, lastName) {
  const a = (firstName || "").trim().charAt(0).toUpperCase();
  const b = (lastName || "").trim().charAt(0).toUpperCase();
  const out = (a + b).trim();
  return out || "?";
}

/**
 * validateUserAccess()
 * Full: DOCENTS
 * Mapping (segons el teu codi original):
 *  A (0) email
 *  B (1) ref
 *  C (2) name
 *  D (3) surname
 *  F (5) role
 *
 * Retorn compatible amb BootstrapAuth:
 *  - { ok:true, user:{...} }
 *  - { ok:false, message:"..." }
 */
function validateUserAccess() {
  try {
    const emailRaw = getCallerEmail_();

    if (!emailRaw) {
      return {
        ok: false,
        message:
          "No s'ha pogut determinar l'email del context. Revisa desplegament: USER_ACCESSING i accés de domini."
      };
    }

    if (!emailRaw.endsWith("@xtec.cat")) {
      return { ok: false, message: "Accés restringit a comptes XTEC (@xtec.cat)." };
    }

    const sheetId = getSheetId_();
    if (!sheetId) {
      return { ok: false, message: "SHEET_ID no configurat. Executa setSheetId('...') una vegada." };
    }

    const ss = SpreadsheetApp.openById(sheetId);
    const sh = ss.getSheetByName("DOCENTS");
    if (!sh) return { ok: false, message: "No s'ha trobat la pestanya 'DOCENTS'." };

    const values = sh.getDataRange().getValues();
    if (values.length < 2) return { ok: false, message: "DOCENTS buit o sense capçaleres." };

    const target = normalizeEmail_(emailRaw);

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowEmail = normalizeEmail_(row[0]);

      if (rowEmail === target) {
        const ref = String(row[1] || "").trim();
        const firstName = String(row[2] || "").trim();
        const lastName = String(row[3] || "").trim();

        const cargo = String(row[4] || "").trim();        // E: Càrrec
        const cicle = String(row[6] || "").trim().toUpperCase(); // G: Cicle

        const displayName = (firstName + " " + lastName).trim();

        return {
          ok: true,
          user: {
            email: rowEmail,
            ref,
            name: firstName,
            surname: lastName,
            displayName,
            cargo,          // <-- PARA EL FOOTER
            cicle,          // <-- PARA EL COLOR
            initials: initials_(firstName, lastName),
            role: cargo,    // si quieres usar ADMIN / DOCENT
            isAdmin: cargo === "ADMIN"
          }
        };
      }
    }

    return { ok: false, message: "Accés denegat: no figures a DOCENTS." };
  } catch (err) {
    return { ok: false, message: "Error GAS: " + (err?.message || String(err)) };
  }
}

// Diagnòstic ràpid
function debugAuth() {
  return {
    emailRaw: getCallerEmail_(),
    emailNorm: normalizeEmail_(getCallerEmail_()),
    sheetId: getSheetId_()
  };

}