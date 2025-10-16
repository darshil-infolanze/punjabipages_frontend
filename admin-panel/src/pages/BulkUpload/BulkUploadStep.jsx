import React from "react";
import { Steps } from "antd";

const BulkUploadStep = ({ current, onChange }) => {
  const steps = [{ title: "Configure" }, { title: "Map Fields" }, { title: "Preview" }];

  return (
    <>
      <Steps
        current={current}
        onChange={(nextStep) => {
          if (nextStep <= current + 1) {
            onChange(nextStep);
          }
        }}
        items={steps.map((step, index) => ({
          ...step,
          disabled: index > current + 1,
        }))}
      />
    </>
  );
};
export default BulkUploadStep;
