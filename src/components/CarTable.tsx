"use client";

import React from "react";
import { Table } from "antd";
import { CarResponse } from "../types/car.types";

interface CarTableProps {
  cars: CarResponse["data"];
  loading: boolean;
}

const CarTable: React.FC<CarTableProps> = ({ cars, loading }) => {
  return (
    <Table
      loading={loading}
      dataSource={cars}
      rowKey="_id"
      style={{ marginTop: "20px" }}
    >
      <Table.Column title="Model" dataIndex="model" />
      <Table.Column title="Price" dataIndex="price" />
      <Table.Column title="Phone Number" dataIndex="phoneNumber" />
      <Table.Column title="Max Pictures" dataIndex="maxPictures" />
      <Table.Column
        title="Pictures"
        dataIndex="pictures"
        render={(pictures) => (
          <div>
            {pictures.map((pic: string, index: number) => (
              <img
                key={index}
                src={pic}
                alt={`Car pic ${index}`}
                style={{ width: "50px", marginRight: "5px" }}
              />
            ))}
          </div>
        )}
      />
    </Table>
  );
};

export default CarTable;
