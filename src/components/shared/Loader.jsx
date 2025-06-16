import React from 'react';
import { LoadingButton } from '@mui/lab'; // ضروري تستوردها من lab

function Loader() {
  return (
    <LoadingButton loading variant="outlined">
      loading ...
    </LoadingButton>
  );
}

export default Loader;
