"use client";

import CarForm from "@/components/CarForm";
import CarTable from "@/components/CarTable";
import React, { useEffect, useState } from "react";
import { carService } from "../services/car.service";
import { CarResponse } from "../types/car.types";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  const [cars, setCars] = useState<CarResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    const response = await carService.getCarsByUserId();
    setCars(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <CarForm onCarSubmitted={fetchCars} />
        <CarTable cars={cars} loading={loading} />
      </div>
    </ProtectedRoute>
  );
}
