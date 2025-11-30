import axios from 'axios';

const register = async (hospitalData) => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          success: true,
          message: "Hospital registered successfully!",
          hospitalId: "hosp_" + Math.floor(Math.random() * 1000)
        }
      });
    }, 1500);
  });
};

export default {
  register
};