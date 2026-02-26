import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authStore';
import uiReducer from './uiStore';
import agentReducer from './agentStore';
import inboxReducer from './inboxStore';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    agents: agentReducer,
    inbox: inboxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;