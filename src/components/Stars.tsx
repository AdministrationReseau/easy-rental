import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface StarsProps {
    value: number | null;
    precision: number;
}

const Stars = ({ value, precision }: StarsProps) => {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={value ?? undefined} precision={precision} readOnly />
        </Stack>
    );
};

export default Stars;
