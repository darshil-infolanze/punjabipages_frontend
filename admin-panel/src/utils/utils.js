import * as XLSX from "xlsx";

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (jsonData.length === 0) {
          reject("Empty file or invalid format");
          return;
        }

        const columns = jsonData[0];
        const dataRows = jsonData.slice(1);

        resolve({ columns, data: dataRows });
      } catch (error) {
        reject(error.message);
      }
    };

    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validates customer records against Yup schema.
 * @param {Array} records - Array of customer records.
 * @returns {Promise<Object>} - Validation result with valid and invalid records.
 */
export const validateRecords = async (records, validationSchema) => {
  const validRecords = [];
  const invalidRecords = [];

  for (let index = 0; index < records.length; index++) {
    try {
      const validatedRecord = await validationSchema.validate(records[index], {
        abortEarly: false,
      });
      validRecords.push(validatedRecord);
    } catch (error) {
      invalidRecords.push({
        index,
        errors: error.inner.map((err) => err.message),
      });
    }
  }

  return {
    totalRecords: records.length,
    validRecordsCount: validRecords.length,
    invalidRecordsCount: invalidRecords.length,
    validRecords,
    invalidRecords, // Contains indexes and validation error details
  };
};
