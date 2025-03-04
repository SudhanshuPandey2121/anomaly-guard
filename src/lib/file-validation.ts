
import * as XLSX from 'xlsx';

export type FileValidationResult = {
  valid: boolean;
  message: string;
  data?: any[];
};

export const validateCSVFile = async (file: File): Promise<FileValidationResult> => {
  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension !== 'csv' && extension !== 'xlsx' && extension !== 'xls') {
    return {
      valid: false,
      message: 'Please upload a CSV or Excel file (xlsx/xls)'
    };
  }
  
  // Check file size (limit to 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return {
      valid: false,
      message: 'File size exceeds 10MB limit'
    };
  }
  
  try {
    const data = await readFileData(file);
    
    // Basic validation - ensure we have some data
    if (!data || data.length === 0) {
      return {
        valid: false,
        message: 'The file appears to be empty'
      };
    }
    
    // Check for required columns (adjust as needed)
    const firstRow = data[0];
    const requiredColumns = ['timestamp', 'sensor_id', 'value'];
    const missingColumns = requiredColumns.filter(col => 
      !Object.keys(firstRow).some(key => key.toLowerCase().includes(col))
    );
    
    if (missingColumns.length > 0) {
      return {
        valid: false,
        message: `Missing required columns: ${missingColumns.join(', ')}`
      };
    }
    
    return {
      valid: true,
      message: `Successfully loaded ${data.length} records`,
      data
    };
  } catch (error) {
    return {
      valid: false,
      message: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

const readFileData = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error('Failed to read file');
        }
        
        // Use xlsx to parse both CSV and Excel
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);
        
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
