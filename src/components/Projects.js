import React from 'react';
import { Box, Container, Typography, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

const Projects = ({ bgColor }) => {
  return (
    <Box
      id="projects"
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
          Projects
        </Typography>
        <Box sx={{ position: 'relative' }}>
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={project.title}
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
                  {project.title}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {project.points.map((item, i) => (
                    <Typography key={i} variant="body1">
                      • {item}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.technologies.map((tech) => (
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
                {project.github ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      component="a"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      View on GitHub
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, ml: 1 }}>
                    Class project of a course still offered at UT. GitHub link is private.
                  </Typography>
                )}
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects; 