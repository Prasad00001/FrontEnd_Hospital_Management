// Mock service for patient operations
const createPatient = async (patientData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Patient Data Submitted:", patientData);
      resolve({
        success: true,
        message: "Patient registered successfully",
        data: { ...patientData, id: Math.floor(Math.random() * 1000) }
      });
    }, 1000);
  });
};

export default {
  createPatient
};