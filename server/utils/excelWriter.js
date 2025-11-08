const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')

const EXCEL_FILE = path.join(__dirname, '..', 'Recruitement data.xlsx')

const appendToExcel = (data) => {
  // Format date as DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    return [
      d.getDate().toString().padStart(2, '0'),
      (d.getMonth() + 1).toString().padStart(2, '0'),
      d.getFullYear()
    ].join('/');
  };

  const normalized = {
    'S.No.': '', // Will be set based on existing data
    'Full Name': data.name,
    'Email ID': data.email,
    'Contact Number': data.mobile,
    'College Name': data.college,
    'Degree': data.degree,
    'Year of Study': data.year,
    'Course': data.course,
    'LinkedIn Profile': data.linkedin,
    'GitHub Profile': data.github || '',
    'Portfolio/Website': data.portfolio || '',
    'Coding Skills': data.skills || '',
    'Co-curricular Skills': data.cocurricularSkills || '',
    'Experience': data.experience || '',
    'Preferred Domain': data.sector,
    'Other Domain': data.otherSector || '',
    'Payment Screenshot': data.paymentScreenshot,
    'Payment Transaction ID': data.paymentTxnId || '',
    'Registration Date': formatDate(new Date()),
    'Status': 'Registered',
    'Notes': ''
  }

  let workbook;
  let sheetName = 'Registrations';
  
  try {
    if (fs.existsSync(EXCEL_FILE)) {
      // Read existing workbook
      workbook = xlsx.readFile(EXCEL_FILE);
      
      // Check if sheet exists
      if (!workbook.SheetNames.includes(sheetName)) {
        // Create new sheet if it doesn't exist
        const newSheet = xlsx.utils.json_to_sheet([normalized]);
        xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
      } else {
        // Get existing data
        const sheet = workbook.Sheets[sheetName];
        const existingData = xlsx.utils.sheet_to_json(sheet);
        
        // Set S.No. for the new entry
        normalized['S.No.'] = existingData.length + 1;
        
        // Add new entry
        existingData.push(normalized);
        
        // Update the sheet
        const newSheet = xlsx.utils.json_to_sheet(existingData);
        workbook.Sheets[sheetName] = newSheet;
      }
    } else {
      // Create new workbook if file doesn't exist
      normalized['S.No.'] = 1;
      const newSheet = xlsx.utils.json_to_sheet([normalized]);
      workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
    }

    // Write to file
    xlsx.writeFile(workbook, EXCEL_FILE, { bookSST: true });
  } catch (error) {
    console.error('Error writing to Excel file:', error);
    throw error;
  }
}

module.exports = appendToExcel
