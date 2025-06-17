import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import personalInfo from '../data/personalInfo.json';

const Contact = ({ bgColor }) => {
  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        bgcolor: bgColor,
      }}
    >
      <Container>
        <Typography
          variant="h2"
          sx={{
            mb: 4,
            color: 'primary.main',
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
          Get In Touch
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="body1" color="secondary" align="center">
              I'd love to connect. Feel free to connect with me on LinkedIn or email me :)
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                variant="outlined"
                color="primary"
              >
                GitHub
              </Button>
              <Button
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkedInIcon />}
                variant="outlined"
                color="primary"
              >
                LinkedIn
              </Button>
              <Button
                href={`mailto:${personalInfo.email}`}
                startIcon={<EmailIcon />}
                variant="outlined"
                color="primary"
              >
                Email
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 