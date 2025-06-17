import React from 'react';
import { Box, Container, Typography, Paper, Chip, Avatar, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import experienceData from '../data/experience.json';

// Import company logos
import siliconLabsLogo from '../assets/company-logos/silicon-labs.png';
import mediaTekLogo from '../assets/company-logos/mediatek.png';
import UTLogo from '../assets/company-logos/UTLogo.png';
import VarsityLogo from '../assets/company-logos/varsityLogo.png';

const companyLogos = {
  'Silicon Labs': siliconLabsLogo,
  'MediaTek': mediaTekLogo,
  'University of Texas at Austin': UTLogo,
  'Varsity Tutors': VarsityLogo,
};

const Experience = ({ bgColor }) => {
  const theme = useTheme();

  return (
    <Box
      id="experience"
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
          Experience
        </Typography>
        <Box sx={{ position: 'relative' }}>
          {experienceData.experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 4,
                  bgcolor: 'background.default',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Typography variant="h5" color="primary" gutterBottom>
                  {experience.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  {companyLogos[experience.company] && (
                    <Avatar
                      src={companyLogos[experience.company]}
                      alt={`${experience.company} logo`}
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: theme.palette.utility?.overlay || '#ffffff',
                        padding: '4px',
                        '& img': {
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                        },
                      }}
                    />
                  )}
                  <Typography variant="h6" color="secondary">
                    {experience.company} • {experience.location}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {experience.period}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {experience.description.map((item, i) => (
                    <Typography key={i} variant="body1">
                      • {item}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {experience.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: 'background.paper',
                        color: 'primary.main',
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience; 