import React, { useState } from 'react';
import { Button, Card, FormControl, RadioGroup, Typography, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
function Checkout() {
  const [paymentMentmethod, setpaymentMentmethod] = useState('visa');
const handelpaymentMethod = (event) => {
    setpaymentMentmethod(event.target.value);
  };

  const handelpayment = async () => {
    const userToken = localStorage.getItem("userToken");

    try {
      const response = await axios.post(
        `https://mytshop.runasp.net/api/CheckOuts/Pay`,
        { PaymentMethod:paymentMentmethod },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );

      console.log("Payment successful:", response);
      if(paymentMentmethod=='Visa')
      {
       window.location.href= response.data.url
      }
  
    }catch (error) {
  console.error("Error during payment:", error.response?.data || error.message);
  alert("Payment failed: " + (error.response?.data?.message || error.message));
}

  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the payment page
      </Typography>

      <FormControl>
        <RadioGroup value={paymentMentmethod} onChange={handelpaymentMethod}>
          <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
          <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handelpayment}
        sx={{ mt: 2 }}
      >
        Pay Now
      </Button>
    </Card>
  );
}

export default Checkout;
