// src/services/conversionHistoryService.ts
import api from "./api";

// Konversijos įrašo sąsaja
export interface ConversionEntry {
  _id?: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
  date?: Date;
  userId?: string;
}

// Gauti visus konversijos įrašus
export const getConversionHistory = async () => {
  try {
    const response = await api.get("/conversions");
    return response.data;
  } catch (error) {
    console.error("Klaida gaunant konversijų istoriją:", error);
    throw error;
  }
};

// Išsaugoti naują konversijos įrašą
export const saveConversion = async (conversionData: ConversionEntry) => {
  try {
    const response = await api.post("/conversions", conversionData);
    return response.data;
  } catch (error) {
    console.error("Klaida išsaugant konversiją:", error);
    throw error;
  }
};

// Atnaujinti konversijos įrašą
export const updateConversion = async (
  id: string,
  data: Partial<ConversionEntry>
) => {
  try {
    const response = await api.put(`/conversions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Klaida atnaujinant konversiją:", error);
    throw error;
  }
};

// Ištrinti konversijos įrašą
export const deleteConversion = async (id: string) => {
  try {
    const response = await api.delete(`/conversions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Klaida ištrinant konversiją:", error);
    throw error;
  }
};
