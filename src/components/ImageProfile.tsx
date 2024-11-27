import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ImageProfile = ({ imageUrl, width, height }: { imageUrl: string, width: number, height: number }) => {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                alt="Remy Sharp"
                src={imageUrl}
                sx={{ width: width, height: height }}
            />
        </Stack>
    );
};

export default ImageProfile;
