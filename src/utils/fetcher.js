import { BASE_URL } from "../config";

const fetcher = async (endpoint) => {
  try {
    const url = `${BASE_URL}${endpoint.queryKey[0]}`;
    const response = await fetch(url, {
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
