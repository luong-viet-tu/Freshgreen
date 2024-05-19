import axios from "axios";

export const getProvince = async () => {
  try {
    const { data } = await axios.get(
      // "https://provinces.open-api.vn/api/?depth=3"
     "https://vapi.vnappmob.com/api/province"
    );
    return data?.results;
  } catch (error) {
    return false;
  }
};



const host = "https://vapi.vnappmob.com";

export const getProvinces = async () => {
  const res = await axios.get(`${host}/api/province`);
  if (res && res?.data?.results) return res?.data?.results;
  return [];
};

export const getDistricts = async (id: number) => {
  const res = await axios.get(`${host}/api/province/district/${id}`);
  if (res && res?.data?.results) return res?.data?.results;
  return [];
};

export const getWards = async (id: number) => {
  const res = await axios.get(`${host}/api/province/ward/${id}`);
  if (res && res?.data?.results) return res?.data?.results;
  return [];
};