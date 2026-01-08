function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("NEXE OAUTH");
}

function getSheetId_() {
  return (PropertiesService.getScriptProperties().getProperty("SHEET_ID") || "").trim();
}

function setSheetId(sheetId) {
  PropertiesService.getScriptProperties().setProperty("SHEET_ID", String(sheetId || "").trim());
  return { ok: true };
}

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
  let [local, domain] = parts;
  local = local.split("+")[0];
  if (domain === "gmail.com" || domain === "googlemail.com") local = local.replace(/\./g, "");
  return `${local}@${domain}`;
}

function validateUserAccess() {
  try {
    const email = getCallerEmail_();

    if (!email) {
      return {
        authorized: false,
        message:
          "No s'ha pogut determinar l'email del context. Revisa el desplegament del Web App: execute as USER_ACCESSING i accés de domini."
      };
    }

    if (!email.endsWith("@xtec.cat")) {
      return { authorized: false, message: "Accés restringit a comptes XTEC (@xtec.cat)." };
    }

    const sheetId = getSheetId_();
    if (!sheetId) throw new Error("SHEET_ID no configurat. Executa setSheetId('...') una vegada.");

    const ss = SpreadsheetApp.openById(sheetId);
    const sh = ss.getSheetByName("DOCENTS");
    if (!sh) throw new Error("No s'ha trobat la pestanya 'DOCENTS'.");

    const values = sh.getDataRange().getValues();
    if (values.length < 2) return { authorized: false, message: "DOCENTS buit o sense capçaleres." };

    const target = normalizeEmail_(email);
    let row = null;

    for (let i = 1; i < values.length; i++) {
      const rowEmail = normalizeEmail_(values[i][0]);
      if (rowEmail === target) {
        row = values[i];
        break;
      }
    }

    if (!row) return { authorized: false, message: "Accés denegat: no figures a DOCENTS." };

    return {
      authorized: true,
      email: String(row[0] || "").trim(),
      ref: String(row[1] || "").trim(),
      name: String(row[2] || "").trim(),
      surname: String(row[3] || "").trim(),
      role: String(row[5] || "").trim(),
      isAdmin: false
    };
  } catch (err) {
    return { authorized: false, message: "Error GAS: " + (err?.message || String(err)) };
  }
}
