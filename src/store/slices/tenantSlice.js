import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tenantId: null,      // Unique UUID for the hospital
  hospitalName: 'HMS India', // Default name
  logoUrl: null,
  themeColor: 'blue',  // Default theme
  contactNumber: null,
  loading: false,
  error: null
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenantStart: (state) => {
      state.loading = true;
    },
    setTenantDetails: (state, action) => {
      state.loading = false;
      state.tenantId = action.payload.tenantId;
      state.hospitalName = action.payload.hospitalName;
      state.logoUrl = action.payload.logoUrl;
      state.contactNumber = action.payload.contactNumber;
      
      if (action.payload.themeColor) {
        state.themeColor = action.payload.themeColor;
      }
    },
    setTenantFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetTenant: (state) => {
      // Reset to defaults if needed
      state.tenantId = null;
      state.hospitalName = 'HMS India';
      state.themeColor = 'blue';
    }
  }
});

export const { setTenantStart, setTenantDetails, setTenantFailure, resetTenant } = tenantSlice.actions;
export default tenantSlice.reducer;