import React, { useState } from "react";
// import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
import { readExcelFile } from "../../utils/utils";
import { toast } from "react-toastify";

const { Dragger } = Upload;

function Step1({ setButtonLoading, setFile }) {
  const [fileName, setFileName] = useState(null);

  const beforeUpload = async (selectedFile) => {
    setButtonLoading(true);

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setButtonLoading(false);
      toast.error("File size must be less than 2MB");
      message.error("File size must be less than 2MB");
      return false;
    }

    const isExcel = /\.(csv|xlsx|xls)$/i.test(selectedFile.name);
    if (!isExcel) {
      setButtonLoading(false);
      message.error("Invalid file type. Please upload a CSV or Excel file.");
      toast.error("Invalid file type. Please upload a CSV or Excel file.");
      return false;
    }

    try {
      const fileData = await readExcelFile(selectedFile);
      setFile(fileData);
      setFileName(selectedFile.name);
      setButtonLoading(false);
      message.success(`${selectedFile.name} uploaded successfully`);
      toast.success(`${selectedFile.name} uploaded successfully`);
    } catch (error) {
      setButtonLoading(false);
      message.error("Error processing the file.");
    }

    return false;
  };

  const removeFile = () => {
    setFile(null);
    setFileName(null);
    message.warning("File removed.");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 border  rounded-lg bg-white ">
      <h2 className="text-lg font-semibold text-center mb-4">Upload Your File</h2>

      <Dragger
        accept=".csv,.xlsx,.xls"
        beforeUpload={beforeUpload}
        showUploadList={false}
        multiple={false}
      >
        <p className="ant-upload-drag-icon">
          {/* <InboxOutlined style={{ fontSize: "2rem" }} /> */}
        </p>
        <p className="ant-upload-text">Click or drag file here to upload</p>
        <p className="ant-upload-hint">
          Supports CSV, XLSX, and XLS formats. Maximum file size: 2MB
        </p>
      </Dragger>

      {fileName && (
        <div className="flex justify-between items-center mt-4 p-2 bg-gray-100 rounded-md">
          <span>{fileName}</span>
          <Button danger size="small" onClick={removeFile}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default Step1;
