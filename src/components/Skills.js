import React from 'react';
import { Box, Container, Typography, Paper, Grid, useTheme } from '@mui/material';

// Manually defined skills arrays for easy addition/removal
const softwareSkills = [
  "C",
  "C++",
  "GDB",
  "Git",
  "Java",
  "JavaFX",
  "JavaScript",
  "Multithreading",
  "Operating Systems",
  "Perl",
  "Python",
  "PyQt5",
  "PyTorch",
  "React Native",
  "Shell Scripting"
].sort((a, b) => a.localeCompare(b));

const hardwareSkills = [
  "Computer Architecture",
  "Embedded Systems",
  "Perforce version control",
  "SystemVerilog",
  "UVM",
  "Unified-Power Format (UPF)",
  "Verilog",
  "x86"
].sort((a, b) => a.localeCompare(b));

const Skills = ({ bgColor }) => {
  const theme = useTheme();

  return (
    <Box
      id="skills"
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
          Skills
        </Typography>
        <Grid container spacing={4}>
          {/* Software Skills */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                bgcolor: 'background.default',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  mb: 3,
                }}
              >
                Software
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {softwareSkills.map((skill) => (
                  <Typography
                    key={skill}
                    component="span"
                    sx={{
                      px: 3,
                      py: 1.5,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      color: 'primary.main',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 4px 8px ${theme.palette.utility?.shadow || '#000000'}`,
                      },
                    }}
                  >
                    {skill}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Hardware Skills */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                bgcolor: 'background.default',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  mb: 3,
                }}
              >
                Hardware
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {hardwareSkills.map((skill) => (
                  <Typography
                    key={skill}
                    component="span"
                    sx={{
                      px: 3,
                      py: 1.5,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      color: 'primary.main',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 4px 8px ${theme.palette.utility?.shadow || '#000000'}`,
                      },
                    }}
                  >
                    {skill}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills; 