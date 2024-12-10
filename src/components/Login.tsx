"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { authService } from "../services/auth.service";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { getUserId } from "@/utils/auth.utils";
import { Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response: LoginResponse = await authService.login(values);
      const token = response.data.token;

      localStorage.setItem("token", token);
      const userId = getUserId();

      if (userId) {
        message.success("Login successful!");
        router.push("/");
      } else {
        message.error("Invalid token received");
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Title>Login</Title>
      <Form name="login" onFinish={onFinish} style={{ width: "300px" }}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
