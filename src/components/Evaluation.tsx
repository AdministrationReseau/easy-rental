import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const Evaluation = () => {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating" defaultValue={undefined} precision={0.5} />
        </Stack>
    );
};

export default Evaluation;
