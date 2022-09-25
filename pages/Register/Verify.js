import React, { useState,useContext,createContext } from 'react';

import Navbar from "../../Components/Navbar/navLogin";
import Email from "./content/EmailVer";
import Password from "./content/Password";
import Success from "./content/Success";

export const DataContext = createContext()

export default function Verify() {
  
  const [appState, setAppState] = useState('email');
    return (
        <>
        <Navbar/> 
        <DataContext.Provider value={{appState,setAppState}}>
      <div className="App">
        {appState === "email" && <Email/>}
        {appState === "pass" && <Password/>}
        {appState === "suc" && <Success/>}
      </div>
    </DataContext.Provider>
        
      
      </>
      

    );
  }


