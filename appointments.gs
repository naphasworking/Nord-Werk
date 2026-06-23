/**
 * Nord Werk — "Book an Appointment" form → Google Sheet
 *
 * Paste this into the Apps Script editor of your bookings sheet
 * (Extensions → Apps Script), then deploy it as a Web App.
 * Sheet: https://docs.google.com/spreadsheets/d/18WwZTwr_ef9XSudVwNm0MzjijCNMNkDrrBOKB-HObvs/
 * Setup steps: see BOOKINGS-VIA-GOOGLE-SHEET.md
 */
var SHEET_ID = "18WwZTwr_ef9XSudVwNm0MzjijCNMNkDrrBOKB-HObvs";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Mobile", "Date", "Time"]);
    }
    var p = (e && e.parameter) || {};
    sheet.appendRow([new Date(), p.name || "", p.phone || "", p.date || "", p.time || ""]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the /exec URL in a browser just to confirm it's live.
function doGet() {
  return ContentService.createTextOutput("Nord Werk booking endpoint is live.");
}
