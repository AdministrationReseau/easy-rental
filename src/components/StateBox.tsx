import * as React from 'react';
import Button from '@mui/material/Button';
import { ProcessState } from '@/utils/enum';

interface StateBoxProps {
    state: ProcessState
}

export default function StateBox({state}: StateBoxProps) {
  const getColor = () => {
      switch (state) {
          case ProcessState.PENDING: return 'orange';
          case ProcessState.CONFIRMED: return 'green';
          case ProcessState.CANCELED: return 'red';
          default: return 'red';
      }
  }

  return (
      <Button variant="outlined" color={getColor()}>{state}</Button>
  );
}