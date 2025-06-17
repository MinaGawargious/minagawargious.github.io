import React from 'react';
import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import personalInfo from '../data/personalInfo.json';
import profileImage from '../assets/profile.JPEG';
import { navItems } from './Header';

const Home = ({ bgColor }) => {
  // Get the first section after Home
  const nextSection = navItems[1].to;

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 8,
        pb: { xs: 16, md: 16 },
        bgcolor: bgColor,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', lg: 'row' }}
        >
          {/* Text Section */}
          <Grid 
            item 
            xs={12} 
            lg={6}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                color="primary"
                sx={{ 
                  mb: 2,
                  maxWidth: '600px'
                }}
              >
                Hi, I'm
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: 'text.primary',
                  mb: 2,
                  fontSize: { xs: '2.5rem', lg: '4rem' },
                  maxWidth: '600px'
                }}
              >
                {personalInfo.name}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: { xs: '1.75rem', lg: '2.5rem' },
                  maxWidth: '600px',
                  whiteSpace: 'nowrap'
                }}
              >
                Digital Design Engineer
              </Typography>
              <Typography
                variant="body1"
                color="secondary"
                sx={{
                  maxWidth: '600px',
                  mb: 4,
                }}
              >
                {personalInfo.about}
              </Typography>
            </motion.div>
          </Grid>

          {/* Image Section */}
          <Grid 
            item 
            xs={12} 
            lg={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '400px', margin: '0 auto' }}
            >
              <Box
                component="img"
                src={profileImage}
                alt="Mina Gawargious"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  filter: 'grayscale(0%)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    filter: 'grayscale(10%)',
                    transform: 'scale(1.02)',
                  },
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Bouncing Down Arrow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '2rem', md: '3rem' },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Link
          to={nextSection}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier curve
            }}
          >
            <IconButton
              sx={{
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} />
            </IconButton>
          </motion.div>
        </Link>
      </Box>
    </Box>
  );
};

export default Home; 