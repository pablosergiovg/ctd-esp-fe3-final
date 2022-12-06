//ESTOESTABAENGLOBALCONTEXT 
// useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //   .then(res => {
  //     setOdontologos(res.data)
  //     console.log(res.data);
  //   })
  //   .catch(error => console.error("Error", error))
  // }, [])



  //ESTOESTABAENGLOBALCONTEXTDOS 
/* import { useState, createContext, useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import axios from 'axios'

export const initialState = {theme: "", data: []}

export const ContextGlobal = createContext(undefined);

const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo

  const [odontologos, setOdontologos] = useState([])

  
  useMemo(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      setOdontologos(res.data)
      console.log(res.data);
    })
    .catch(error => console.error("Error", error))
  }, [])


  const theme = createTheme({
    palette: {
      mode: 'light'
      // mode: (state.prefersDark? 'dark':'light')
    }
  })


  const store = {
    odontologos
  }

  return (
    <ContextGlobal.Provider value={store}>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ContextGlobal.Provider>
  );
};

export default ContextProvider; */


//CODIGOROCKY 
//GLOBALCONTEXT 

import { createContext, useReducer, useEffect, useMemo } from "react";
import axios from "axios"


export const initialState = {
  theme: "light", 
  data: [], 
}

export const ContextGlobal = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'FETCH_SUCCESS':
    return {
        data: action.payload,
    }

    case 'FETCH_ERROR':
    return {
        data: [],
    }

    default:
        return state
}
}

export const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  const [state, dispatch] = useReducer(reducer, initialState)
  const contextValue = useMemo(() => ({state, dispatch}), [state, dispatch])
  console.log(contextValue)


  useEffect(() => {
    axios
    .get('https://jsonplaceholder.typicode.com/users%27)
    .then(response => {
        dispatch({type: 'FETCH_SUCCESS', payload: response.data})

    })
    .catch(error => {
        dispatch({type: 'FETCH_ERROR'})
    })
   }, [])


  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};