import { Row, Col, Select } from "antd";
import React, { useMemo } from "react";
import { customerFields } from "./data";

function Step2({ file, mapping, setMapping, setErrors, errors }) {
  const options = useMemo(() => {
    return file?.columns?.map((item) => ({ value: item, label: item })) || [];
  }, [file]);

  const handleMappingChange = (customerField, selectedColumn) => {
    setMapping((prev) => ({ ...prev, [customerField]: selectedColumn }));

    // Remove error if the field is now valid
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (selectedColumn) {
        delete newErrors[customerField];
      }
      return newErrors;
    });
  };

  return (
    <div>
      {customerFields.map((field) => (
        <Row gutter={16} className="w-full my-2" key={field.id}>
          <Col span={12}>
            <p className="text-md font-bold">
              {field.label} {field.required ? <span className="text-red-500">*</span> : ""}
            </p>
          </Col>
          <Col span={12}>
            <Select
              placeholder="Select column"
              style={{ width: "100%" }}
              options={options}
              onChange={(value) => handleMappingChange(field.id, value)}
              value={mapping[field.id] || undefined}
              status={errors[field.id] ? "error" : ""}
              showSearch
            />
            {errors[field.id] && <p className="text-red-500 text-xs">{errors[field.id]}</p>}
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default Step2;
