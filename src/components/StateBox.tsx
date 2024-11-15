import * as React from 'react';
import Button from '@mui/material/Button';
import { ProcessState } from '@/app/utils/enum';

interface StateBoxProps {
    state: ProcessState
}

export default function StateBox({state}: StateBoxProps) {
  return (
      <Button variant="outlined">{state}</Button>
  );
}