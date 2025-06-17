import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { getUtility } from '../theme/colors';

const Resume = ({ bgColor }) => {
  const utility = getUtility();

  return (
    <Box
      id="resume"
      sx={{
        py: 8,
        bgcolor: bgColor,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            color: 'primary.main',
            textAlign: 'left',
            '&::after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              bgcolor: 'primary.main',
              mt: 1,
            },
          }}
        >
          Resume
        </Typography>
        <Box sx={{ width: '100%', height: { xs: 400, md: 700 }, boxShadow: 3, borderRadius: 2, overflow: 'hidden', background: utility.pdfBackground, p: { xs: 0, md: 0 } }}>
          <object
            data="/resume.pdf"
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ minHeight: 400, border: 'none', width: '100%', height: '100%' }}
          >
            <p>
              Your browser does not support PDFs.
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download the PDF</a>.
            </p>
          </object>
        </Box>
      </Container>
    </Box>
  );
};

export default Resume; 