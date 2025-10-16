import React, { useMemo, useState } from "react";
import { Button, Divider } from "antd";
import BulkUploadStep from './BulkUploadStep';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { toast } from "react-toastify";
import { customerFields } from "./data";
import { validateRecords } from "../../utils/utils";

const validationSchema = Yup.object({
  businessName: Yup.string().required("Business Name is required"),
  category: Yup.string().required("category is required"),
  subCategory: Yup.string().required("SubCategory  is required"),
  description: Yup.string().required("Description is required"),
  establishedYear: Yup.string().required("Established Year is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.object().shape({
    street: Yup.string().required("Address Street is required"),
    suburb: Yup.string().required("Address Suburb is required"),
    city: Yup.string().required("Address City is required"),
    state: Yup.string().required("Address State is required"),
    postcode: Yup.string().required("Address PostCode is required"),
  }),
  serviceAreas: Yup.string().required("Service Areas is required"),
  services: Yup.string().required("Services  is required"),
});

function BulkUpload() {
  const [current, setCurrent] = useState(0);
  const [file, setFile] = useState(null);
  const [mapping, setMapping] = useState({});
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const companyId = useSelector((state) => state.auth.companyId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const validateSteps = (step) => {
    let isValid = true;

    if (step === 0) {
      if (!file) {
        isValid = false;
        toast.error("Please select a file.");
      }
    }

    if (step === 1) {
      let newErrors = {};
      customerFields.forEach((field) => {
        if (field.required && !mapping[field.id]) {
          newErrors[field.id] = `${field.label} is required`;
          isValid = false;
        }
      });

      setErrors(newErrors);

      if (!isValid) {
        toast.error("Please fill all required fields before proceeding.");
      }
    }

    return isValid;
  };

  const onChange = (value) => {
    if (validateSteps(current)) {
      setCurrent(value);
    }
  };

  async function processRecords(current, file, mapping) {
    if (current === 1) {
      const columnNames = file.columns;
      const columnIndexMap = {};

      columnNames.forEach((col, index) => {
        columnIndexMap[col] = index;
      });

      const mappedRecords = file.data.map((row) => {
        let mappedRow = {};

        Object.entries(mapping).forEach(([dbField, columnName]) => {
          const columnIndex = columnIndexMap[columnName];
          mappedRow[dbField] = columnIndex !== undefined ? (row[columnIndex] ?? null) : null;
        });

        return mappedRow;
      });

      return validateRecords(mappedRecords, validationSchema);
    }

    return Promise.resolve(null);
  }

  const handleNext = async () => {
    setButtonLoading(true);
    if (!validateSteps(current)) {
      setButtonLoading(false);
      return;
    }

    if (current == 1) {
      const validationRecord = await processRecords(current, file, mapping);
      setRecord(validationRecord);
      setButtonLoading(false);
    }

    setCurrent((prev) => prev + 1);
    setButtonLoading(false);
  };

  const handleSubmit = async () => {
    setButtonLoading(true);

    try {
      let input = [];
      const validRecords = record?.validRecords ?? [];

      validRecords?.forEach((item) => {
        const preperedData = {
          ...(!itemId && { companyId }),
          description: item.description,
          itemName: item.itemName,
          itemType: item.itemType,
          itemModelNo: item.itemModelNo,
          itemGroup: item.itemGroup,
          defaultPrice: item.defaultPrice,
          itemStatus: item.itemStatus == "Active",
          gst: item.itemGstTax,
          hsnCode: item.hsnCode,
        };

        input.push(preperedData);
      });
      // const payload = {
      //   monday: {
      //     close: input.mondayclose,
      //     open: input.mondayOpen
      //   }
      // }
      // await dispatch(
      //   itemMasterSliceMethods.createBulkItem({
      //     items: input,
      //     companyId,
      //   }),
      // ).unwrap();
      navigate(-1);
      setButtonLoading(false);
    } catch (error) {
      console.log(error);

      setButtonLoading(false);
    }
  };

  const renderStepContent = useMemo(() => {
    const stepMapping = {
      0: (
        <Step1
          file={file}
          setFile={setFile}
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
        />
      ),
      1: (
        <Step2
          file={file}
          setFile={setFile}
          mapping={mapping}
          setMapping={setMapping}
          errors={errors}
          setErrors={setErrors}
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
        />
      ),
      2: (
        <Step3
          validateRecords={record}
          buttonLoading={buttonLoading}
          setButtonLoading={setButtonLoading}
        />
      ),
    };

    return stepMapping[current];
  }, [current, errors, record]);

  return (
    <div className="pt-5 my-container">
      <div className="flex justify-center">
        <div className="text-2xl ps-2 pb-2 font-bold">Bussiness - Select File</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="py-2 w-2/4">
          <BulkUploadStep current={current} onChange={onChange} key={"bulkcustomerStep"} />
          <Divider />
        </div>
        <div className="w-2/4">{renderStepContent}</div>

        <div className="w-2/4 flex flex-wrap justify-between py-10 ">
          <Button
            onClick={() => {
              navigate("/business");
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="order-1 md:order-none"
            onClick={current == 2 ? handleSubmit : handleNext}
            loading={buttonLoading}
          >
            {current == 2 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BulkUpload