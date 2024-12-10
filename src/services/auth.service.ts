"use client";
import { LoginRequest, LoginResponse } from "@/types/auth.types";
import APIClient from "./api-client";

class AuthService extends APIClient<LoginRequest, LoginResponse> {
  constructor() {
    super("/auth/login");
  }
  async login(data: { email: string; password: string }) {
    const response = await this.post(this.endpoint, data);
    return response;
  }
}

export const authService = new AuthService();
