import axios from 'axios';

const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1. Simulating an ADMIN Login
      if (email.includes('admin')) {
        resolve({
          data: {
            token: "admin-token-123",
            user: {
              id: 1,
              name: "Super Admin",
              email: email,
              role: "admin",
              hospitalId: "hosp_001"
            }
          }
        });
      } 
      // 2. Simulating a DOCTOR Login
      else if (email.includes('doctor')) {
        resolve({
          data: {
            token: "doc-token-123",
            user: {
              id: 2,
              name: "Dr. Sharma",
              email: email,
              role: "doctor",
              hospitalId: "hosp_001"
            }
          }
        });
      } 
      // 3. Simulating a NURSE Login
      else if (email.includes('nurse')) {
        resolve({
          data: {
            token: "nurse-token-123",
            user: {
              id: 3,
              name: "Nurse Anjali",
              email: email,
              role: "nurse",
              hospitalId: "hosp_001"
            }
          }
        });
      }
      // 4. Simulating a RECEPTIONIST Login
      else if (email.includes('reception')) {
        resolve({
          data: {
            token: "rec-token-123",
            user: {
              id: 4,
              name: "Priya (Front Desk)",
              email: email,
              role: "receptionist",
              hospitalId: "hosp_001"
            }
          }
        });
      }
      // 5. Invalid Login
      else if (email.includes('reception')) {
         // ... existing receptionist code ...
      }
      // NEW: Pharmacist Login
      else if (email.includes('pharmacy')) {
        resolve({
          data: {
            token: "pharma-token-123",
            user: {
              id: 5,
              name: "Ramesh (Pharmacist)",
              email: email,
              role: "pharmacist",
              hospitalId: "hosp_001"
            }
          }
        });
      }
      // NEW: Lab Tech Login
      else if (email.includes('lab')) {
        resolve({
          data: {
            token: "lab-token-123",
            user: {
              id: 6,
              name: "Vikram (Pathology)",
              email: email,
              role: "lab_tech",
              hospitalId: "hosp_001"
            }
          }
        });
      }
      else {
        reject({
          response: {
            data: { message: "Invalid email or password" }
          }
        });
      }
    }, 800); // Small delay to feel real
  });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export default {
  login,
  logout,
};