import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const AnalyticsContext = createContext();


export const AnalyticsProvider = ({ children }) => {
    
  const firebaseConfig = {
    apiKey: "AIzaSyBLHK1k3Z7PqxH_I1A9J36kFClxOv8cA90",
    authDomain: "foodayini.firebaseapp.com",
    projectId: "foodayini",
    storageBucket: "foodayini.firebasestorage.app",
    messagingSenderId: "557811162286",
    appId: "1:557811162286:web:adcff13005706e8ace213f",
    measurementId: "G-V0EXQ6K09N"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

 return (
    <AnalyticsContext.Provider value={{
     logEvent,
     analytics
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnaltytics = () => useContext(AnalyticsContext);
