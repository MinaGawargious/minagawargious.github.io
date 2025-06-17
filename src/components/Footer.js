import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="secondary" align="center">
          {`© ${new Date().getFullYear()} Mina Gawargious. All rights reserved.`}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 