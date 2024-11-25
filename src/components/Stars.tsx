import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const Stars = ({ value, precision }) => {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={value || null} precision={precision} readOnly />
        </Stack>
    );
};

export default Stars;
