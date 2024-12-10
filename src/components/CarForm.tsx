"use client";

import { carService } from "@/services/car.service";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import { CarRequest } from "../types/car.types";
import { getUserId } from "@/utils/auth.utils";

interface CarFormProps {
  onCarSubmitted: () => void;
}

const CarForm = ({ onCarSubmitted }: CarFormProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onFinish = async (values: CarRequest) => {
    try {
      const data = {
        ...values,
        price: Number(values.price),
        maxPictures: Number(values.maxPictures),
        pictures: imageUrls,
        userId: getUserId() as string,
      };

      await carService.createCar(data);
      message.success("Car submitted successfully!");
      form.resetFields();
      setFileList([]);
      setImageUrls([]);
      onCarSubmitted();
    } catch (error) {
      message.error("Failed to submit car.");
    }
  };

  const handleUploadChange = async ({ fileList }: any) => {
    setFileList(fileList);

    // Convert files to URLs, (got it from stackOverflow)
    const urls = await Promise.all(
      fileList.map((file: UploadFile) => {
        if (file.originFileObj) {
          return new Promise<string>((resolve) => {
            if (file.originFileObj) {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file.originFileObj);
            } else {
              resolve("");
            }
          });
        }
        return Promise.resolve("");
      })
    );

    setImageUrls(urls.filter((url) => url !== ""));
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="model"
        label="Car Model"
        rules={[
          {
            required: true,
            min: 3,
            message: "Model must be at least 3 characters.",
          },
        ]}
      >
        <Input placeholder="Enter car model" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          { required: true, message: "Please enter a price" },
          {
            validator: async (_, value) => {
              const num = Number(value);
              if (isNaN(num) || num <= 0) {
                throw new Error("Please enter a valid price greater than 0");
              }
            },
          },
        ]}
      >
        <Input type="number" min={0} placeholder="Enter price" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
            len: 11,
            message: "Phone number must be exactly 11 digits.",
          },
        ]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>
      <Form.Item
        name="maxPictures"
        label="Max Number of Pictures"
        rules={[
          { required: true, message: "Please enter max number of pictures" },
          {
            validator: async (_, value) => {
              const num = Number(value);
              if (isNaN(num) || num < 1 || num > 10) {
                throw new Error("Number must be between 1 and 10");
              }
            },
          },
        ]}
      >
        <Input
          type="number"
          min={1}
          max={10}
          placeholder="Enter max number of pictures"
        />
      </Form.Item>
      <Form.Item label="Upload Pictures">
        <Upload
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          maxCount={Number(form.getFieldValue("maxPictures")) || 10}
        >
          <Button>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
