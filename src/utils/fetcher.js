import { BASE_URL } from "../config";

const fetcher = async (endpoint) => {
  try {
    const url = `${BASE_URL}${endpoint.queryKey[0]}`;
    const response = await fetch(url, {
      headers: { "X-CoinAPI-Key": "ECDDB7CA-0DB5-48ED-9726-88DB6B26BB82" },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
};

export default fetcher;
