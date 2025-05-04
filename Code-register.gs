// Google Apps Script code for handling registration data

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registrations') || ss.insertSheet('Registrations');
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'NIK', 'Full Name', 'Email', 'Password Hash']);
    }
    
    // Add the new registration data
    sheet.appendRow([
      new Date(),
      data.nik,
      data.fullName,
      data.email,
      data.hashedPassword
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Registration successful'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Registration failed: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}