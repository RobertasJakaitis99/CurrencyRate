// src/services/conversionService.ts
import axios from "axios";

const API_BASE = "https://api.exchangerate.host";

export const getSymbols = async () => {
  try {
    console.log("Fetching symbols from API...");
    const response = await axios.get(`${API_BASE}/symbols`);

    // Patikrinti, ar atsakymas turi reikiamą struktūrą
    if (
      response.data &&
      response.data.symbols &&
      typeof response.data.symbols === "object"
    ) {
      console.log(
        "Symbols fetched successfully",
        Object.keys(response.data.symbols).length
      );
      return response.data;
    } else {
      console.error("API response missing symbols structure:", response.data);

      // Grąžinti numatytąsias vertes, jeigu API nepateikė tinkamo atsakymo
      return {
        symbols: {
          EUR: { description: "Euro" },
          USD: { description: "US Dollar" },
          GBP: { description: "British Pound" },
          JPY: { description: "Japanese Yen" },
          CHF: { description: "Swiss Franc" },
          CAD: { description: "Canadian Dollar" },
          AUD: { description: "Australian Dollar" },
          CNY: { description: "Chinese Yuan" },
          HKD: { description: "Hong Kong Dollar" },
          NZD: { description: "New Zealand Dollar" },
        },
      };
    }
  } catch (error) {
    console.error("Error fetching symbols:", error);

    // Grąžinti numatytąsias vertes įvykus klaidai
    return {
      symbols: {
        EUR: { description: "Euro" },
        USD: { description: "US Dollar" },
        GBP: { description: "British Pound" },
        JPY: { description: "Japanese Yen" },
        CHF: { description: "Swiss Franc" },
      },
    };
  }
};

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
) => {
  try {
    console.log(`Converting ${amount} ${from} to ${to}...`);
    const response = await axios.get(`${API_BASE}/convert`, {
      params: { from, to, amount },
    });

    // Patikrinti, ar atsakymas turi reikiamą struktūrą
    if (response.data && typeof response.data.result === "number") {
      console.log(`Conversion result: ${response.data.result}`);
      return response.data.result;
    } else {
      console.error("API response missing result structure:", response.data);

      // Jei negalime atlikti konversijos, bandome apskaičiuoti pagal numatytąsias reikšmes
      // Tai tik apytikris skaičiavimas demonstraciniais tikslais
      const defaultRates: Record<string, number> = {
        EUR: 1,
        USD: 1.09,
        GBP: 0.85,
        JPY: 160.5,
        CHF: 0.97,
        CAD: 1.49,
        AUD: 1.65,
      };

      if (from in defaultRates && to in defaultRates) {
        const result = (amount * defaultRates[to]) / defaultRates[from];
        console.log(`Using fallback calculation: ${result}`);
        return result;
      } else {
        throw new Error("Cannot perform conversion with fallback values");
      }
    }
  } catch (error) {
    console.error("Error converting currency:", error);
    throw error;
  }
};
