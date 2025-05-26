import React from 'react';
import { Container } from "react-bootstrap";

export default function FooterWeb() {
  return (
    <footer  style={{
        paddingTop: 50,
        paddingBottom: 50,
        
      }}>
         <Container>{`${new Date().getFullYear()} - © ESPERIA | Avventure a portata di click.`}</Container>
      
    </footer>
  )
}
