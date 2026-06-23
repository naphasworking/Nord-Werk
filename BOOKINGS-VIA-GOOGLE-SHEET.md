# Save "Book an Appointment" submissions to a Google Sheet

The form posts each booking into your sheet via a small **Google Apps Script
Web App** (free, no server). The sheet:
`https://docs.google.com/spreadsheets/d/18WwZTwr_ef9XSudVwNm0MzjijCNMNkDrrBOKB-HObvs/`

## One-time setup (~5 minutes)

1. **Open the script editor**
   - Open the sheet → **Extensions → Apps Script**.

2. **Paste the code**
   - Delete whatever's in `Code.gs`, paste everything from **`appointments.gs`**
     (in this repo), and **save** (💾).

3. **Deploy as a Web App**
   - **Deploy → New deployment**
   - Click the gear ⚙ → **Web app**
   - **Execute as:** *Me*
   - **Who has access:** **Anyone**
   - **Deploy** → **Authorize access** → pick your Google account →
     "Advanced" → "Go to … (unsafe)" → **Allow** (it's your own script).
   - Copy the **Web app URL** — it ends in **`/exec`**.

4. **Connect the site**
   - In **`script.js`**, put that URL in the `BOOKING` block:
     ```js
     const BOOKING = {
       whatsapp: "",
       endpoint: "https://script.google.com/macros/s/AKfyc.../exec"
     };
     ```
   - Commit/push once. (Or send me the URL and I'll paste it in.)

## Test it
- Open the site → **Book an Appointment** → fill in name, mobile, date, time → **Book**.
- A new row appears in the sheet: **Timestamp · Name · Mobile · Date · Time**.

## Notes
- The script adds the header row automatically on the first booking.
- If you change the Apps Script later, **Deploy → Manage deployments → edit →
  New version**, so the same `/exec` URL keeps working.
- The form shows a success message as soon as the booking is sent. Because
  Google returns an "opaque" response to the browser, the site can't read a
  server error — so always glance at the sheet to confirm rows are arriving.
- Want a copy emailed to you on each booking? Tell me and I'll add a
  `MailApp.sendEmail(...)` line to the script.
