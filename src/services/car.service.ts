"use client";
import { CarRequest, CarResponse } from "@/types/car.types";
import APIClient from "./api-client";
import { getUserId } from "@/utils/auth.utils";

class CarService extends APIClient<CarRequest, CarResponse> {
  constructor() {
    super("/car");
  }

  async createCar(data: CarRequest) {
    const response = await this.post(this.endpoint, data);
    return response;
  }

  async getCarsByUserId() {
    const userId = getUserId();
    if (!userId) throw new Error("User not authenticated");
    return this.get(this.endpoint, userId);
  }
}

export const carService = new CarService();
