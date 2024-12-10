export interface CarRequest {
  model: string;
  price: number;
  phoneNumber: string;
  maxPictures: number;
  pictures: string[];
  userId: string;
}

export interface CarResponse {
  status: string;
  message: string;
  data: {
    _id: string;
    model: string;
    price: number;
    phoneNumber: string;
    maxPictures: number;
    pictures: string[];
    user: string;
    __v: number;
  }[];
}
