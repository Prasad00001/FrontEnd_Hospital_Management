import apiClient from './axios.config'; // Ensure axiosConfig.js exists in the same folder

const login = async (email, password) => {
  // --- MOCK LOGIN LOGIC START ---
  // In a real app, you would use: 
  // return apiClient.post('/auth/login', { email, password });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailLower = email.toLowerCase();
      let user = null;

      // 1. LAB TECHNICIAN
      if (emailLower.includes('lab')) {
        user = {
          id: 6,
          name: "Vikram (Pathology)",
          email: email,
          role: "lab_tech",
          hospitalId: "hosp_001"
        };
      }
      // 2. PHARMACIST
      else if (emailLower.includes('pharmacy') || emailLower.includes('pharma')) {
        user = {
          id: 5,
          name: "Ramesh (Pharmacist)",
          email: email,
          role: "pharmacist",
          hospitalId: "hosp_001"
        };
      }
      // 3. RECEPTIONIST
      else if (emailLower.includes('reception')) {
        user = {
          id: 4,
          name: "Priya (Front Desk)",
          email: email,
          role: "receptionist",
          hospitalId: "hosp_001"
        };
      }
      // 4. NURSE
      else if (emailLower.includes('nurse')) {
        user = {
          id: 3,
          name: "Nurse Anjali",
          email: email,
          role: "nurse",
          hospitalId: "hosp_001"
        };
      }
      // 5. DOCTOR
      else if (emailLower.includes('doctor') || emailLower.includes('dr')) {
        user = {
          id: 2,
          name: "Dr. Sharma",
          email: email,
          role: "doctor",
          hospitalId: "hosp_001"
        };
      }
      // 6. ADMIN (Fallback)
      else if (emailLower.includes('admin')) {
        user = {
          id: 1,
          name: "Super Admin",
          email: email,
          role: "admin",
          hospitalId: "hosp_001"
        };
      }

      // Final Check
      if (user) {
        resolve({
          data: {
            token: "mock-jwt-token-" + user.role,
            user: user
          }
        });
      } else {
        reject({
          response: {
            data: { message: "Invalid email. Try 'lab@...', 'pharmacy@...', 'admin@...', etc." }
          }
        });
      }
    }, 800);
  });
  // --- MOCK LOGIN LOGIC END ---
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('tenantId');
};

export default {
  login,
  logout,
};