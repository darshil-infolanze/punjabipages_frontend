import { Row, Col, Select } from "antd";
import React, { useMemo } from "react";
import { customerFields } from "./data";

function Step2({ file, mapping, setMapping, setErrors, errors }) {
  const options = useMemo(() => {
    return file?.columns?.map((item) => ({ value: item, label: item })) || [];
  }, [file]);

  const handleMappingChange = (customerField, selectedColumn) => {
    setMapping((prev) => ({ ...prev, [customerField]: selectedColumn }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (selectedColumn) {
        delete newErrors[customerField];
      }
      return newErrors;
    });
  };

  // Split fields into pairs for 2-grid layout
  const fieldPairs = [];
  for (let i = 0; i < customerFields.length; i += 2) {
    fieldPairs.push(customerFields.slice(i, i + 2));
  }

  return (
    <div className="space-y-4">
      {fieldPairs.map((pair, index) => (
        <Row gutter={16} key={index}>
          {pair.map((field) => (
            <Col span={12} key={field.id} className="mb-2">
              <p className="text-md font-bold mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </p>
              <Select
                placeholder="Select column"
                style={{ width: "100%" }}
                options={options}
                onChange={(value) => handleMappingChange(field.id, value)}
                value={mapping[field.id] || undefined}
                status={errors[field.id] ? "error" : ""}
                showSearch
              />
              {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default Step2;
