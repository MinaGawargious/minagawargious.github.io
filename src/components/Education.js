import React from 'react';
import { Box, Container, Typography, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import educationData from '../data/education.json';

const Education = ({ bgColor }) => {
  return (
    <Box
      id="education"
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
          Education
        </Typography>
        <Box sx={{ position: 'relative' }}>
          {educationData.education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 4,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Typography variant="h5" color="primary" gutterBottom>
                  {edu.degree}
                </Typography>
                <Typography variant="h6" color="secondary" gutterBottom>
                  {edu.school} • {edu.location}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {edu.period}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {edu.description.map((item, i) => (
                    <Typography key={i} variant="body1">
                      • {item}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Relevant Coursework:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {edu.relevantCoursework.map((course) => (
                      <Chip
                        key={course}
                        label={course}
                        size="small"
                        sx={{
                          bgcolor: 'background.default',
                          color: 'primary.main',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                {edu.achievements && edu.achievements.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      Achievements:
                    </Typography>
                    {edu.achievements.map((achievement, i) => (
                      <Typography key={i} variant="body1">
                        • {achievement}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education; 