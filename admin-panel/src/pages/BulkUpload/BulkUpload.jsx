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
import { bulkUpload } from "../../redux/features/businessSlice";
// import pdf  from "../../../public/Business_Bulk_Upload_Template.xlsx"

const validationSchema = Yup.object({
  // owner: Yup.string().required("Owner is required"),
  businessName: Yup.string().required("Business Name is required"),
  category: Yup.string().required("category is required"),
  subCategory: Yup.string().required("SubCategory  is required"),
  description: Yup.string().required("Description is required"),
  establishedYear: Yup.string().required("Established Year is required"),
  phone: Yup.number().required("Phone is required"),
  "address.street": Yup.string().required("Address Street is required"),
  "address.suburb": Yup.string().required("Address Suburb is required"),
  "address.city": Yup.string().required("Address City is required"),
  "address.state": Yup.string().required("Address State is required"),
  "address.postcode": Yup.string().required("Address PostCode is required"),

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
  const user = useSelector((state) => state.auth.user);



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

   const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Bulk-upload-template.xlsx";
    link.download = "Bulk-upload-template.xlsx";
    link.click();
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
      const validRecords = record?.validRecords ?? [];
      console.log("validRecords", validRecords);

      const businesses = validRecords.map((item) => ({
        owner: user?.id,
        businessName: item.businessName,
        abn: item.abn,
        category: item.category,
        subCategory: item.subCategory,
        description: item.description,
        establishedYear: item.establishedYear,
        contactPerson: item.contactPerson,
        phone: item.phone,
        email: item.email,
        website: item.website,
        alternateContacts: {
          phone: item["alternateContacts.phone"],
          email: item["alternateContacts.email"],
        },
        address: {
          street: item["address.street"],
          suburb: item["address.suburb"],
          city: item["address.city"],
          state: item["address.state"],
          postcode: item["address.postcode"],
        },
        location: {
          type: "Point",
          coordinates: [item.longitude || 0, item.latitude || 0],
        },
        serviceAreas: item.serviceAreas ? item.serviceAreas.split(",") : [],
        hours: {
          monday: {
            open: item["monday.open"],
            close: item["monday.close"],
          },
          tuesday: {
            open: item["tuesday.open"],
            close: item["tuesday.close"],
          },
          wednesday: {
            open: item["wednesday.open"],
            close: item["wednesday.close"],
          },
          thursday: {
            open: item["thursday.open"],
            close: item["thursday.close"],
          },
          friday: {
            open: item["friday.open"],
            close: item["friday.close"],
          },
          saturday: {
            open: item["saturday.open"],
            close: item["saturday.close"],
          },
          sunday: {
            open: item["sunday.open"],
            close: item["sunday.close"],
          },
          publicHolidayNotes: item.publicHolidayNotes || "",
          is24x7:
            item.is24x7?.toString().toLowerCase() === "true" ||
            item.is24x7 === "1" ||
            item.is24x7 === true,
        },
        logoUrl: item.logoUrl,
        gallery: item.gallery || [],
        introVideo: item.introVideo,
        socialLinks: {
          facebook: item.facebook,
          instagram: item.instagram,
          linkedin: item.linkedin,
          others: item["socialLinks.others"]
            ? item["socialLinks.others"].split(",").map(s => s.trim())
            : [],
        },
        keywords: item.keywords ? item.keywords.split(",") : [],
        services: item.services ? item.services.split(",") : [],
        paymentMethods: item.paymentMethods
          ? item.paymentMethods.split(",")
          : [],
        certifications: item.certifications
          ? item.certifications.split(",")
          : [],
        promotions: item.promotions,
        status: item.status,
        isFeature: item.isFeature || false,
        popular: item.popular || false,
      }));

      await dispatch(
        bulkUpload({ businesses })
      ).unwrap();

      // toast.success(response.message || "Bulk businesses uploaded successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Bulk upload failed:", error);
      toast.error(error?.message || "Something went wrong while uploading.");
    } finally {
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
    <div className="my-container">
      <div className="flex justify-between items-center py-4 px-4 border-b border-gray-300 mb-8">
        <div className="text-2xl font-bold">Bulk Bussiness Upload</div>
        <div className="">
          <Button
            type="primary"
            className="font-semibold"
            onClick={handleDownload}
          >
            Download Template
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="py-2 w-2/3">
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