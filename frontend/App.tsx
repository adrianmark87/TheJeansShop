import *as React from 'react';
import Main from './navigation/Main';
import TokenProvider from './navigation/context/TokenContext';


export default function App(){
  return(
    <TokenProvider>
    <Main/>
    </TokenProvider>
  );
} 