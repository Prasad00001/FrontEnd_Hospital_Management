import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  isLoading: false, // Global app loading state (e.g. page transitions)
  notifications: [] 
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarState: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addNotification: (state, action) => {
      // Payload: { id: Date.now(), type: 'success'|'error', message: '...' }
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const { 
  toggleSidebar, 
  setSidebarState, 
  setGlobalLoading, 
  addNotification, 
  removeNotification, 
  clearNotifications 
} = uiSlice.actions;

export default uiSlice.reducer;