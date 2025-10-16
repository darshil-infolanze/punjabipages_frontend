import React from "react";
import { Card, Table, Alert, Row, Col } from "antd";

const Step3 = ({ validateRecords }) => {
  const {
    // totalRecords,
    validRecordsCount,
    // invalidRecordsCount,
    validRecords,
    // invalidRecords,
  } = validateRecords;

  const validColumns = Object.keys(validRecords[0] || {}).map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    dataIndex: key,
    key,
  }));

  //   const errorColumns = [
  //     { title: 'Index', dataIndex: 'index', key: 'index' },
  //     {
  //       title: 'Errors',
  //       dataIndex: 'errors',
  //       key: 'errors',
  //       render: (errors) =>
  //         errors.map((err, i) => (
  //           <Tag color="red" key={i}>
  //             {err}
  //           </Tag>
  //         )),
  //     },
  //   ];

  return (
    <div className="p-6">
      {/* Summary Section */}
      <Card title="Validation Summary" bordered={false} className="mb-6 border">
        {/* <Alert message={`Total Records: ${totalRecords}`} type="info" /> */}
        <Alert message={`Valid Records: ${validRecordsCount}`} type="success" className="mt-3" />
        {/* <Alert
          message={`Invalid Records: ${invalidRecordsCount}`}
          type="error"
          className="mt-3"
        /> */}
      </Card>

      {/* Records Table */}
      <Row gutter={24}>
        <Col span={24}>
          <Card title="Valid Records" bordered={false} className="mb-6 border">
            <Table
              dataSource={validRecords.map((record, index) => ({
                key: index,
                ...record,
              }))}
              columns={validColumns}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Step3;
