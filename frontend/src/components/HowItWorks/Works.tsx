import React from 'react';
import { Container, Typography, CardMedia, Box } from '@mui/material';
import { worksCard } from '../Utils/styles';
import image1 from '../../assets/image2vector.svg';
import { worksStyle,cardTitle } from '../Utils/styles';
import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation('common');
  const cardData = [
    {
      title: t('landing.home.airport'),
      content: t('landing.home.airport.content'),
      image: 'https://via.placeholder.com/150',
    },
    {
      title: t('landing.travel.region'),
      content:  t('landing.travel.region.content'),
      image: 'https://via.placeholder.com/150',
    },
    {
      title: t('landing.explore.deals'),
      content:  t('landing.explore.deals.content'),
      image: 'https://via.placeholder.com/150',
    },
  ];
  const showWorks = (title: string, index: number) => {
        return (
            <>
            <Typography variant="h6" marginTop={2} sx={cardTitle}>
              {title}
            </Typography>
            {/* <CardMedia
              component="img"
              height="350"
              src={image1} // Use the imported image
              alt={`Step ${index + 1}`}
            /> */}
            </>
        );
  };


  

  return (
    <Container>
      <Typography variant="h4" sx={worksStyle}>
        {t('landing.howitworks')}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        {cardData.map((card, index) => (
          <Box
            key={index}
            textAlign="center"
            style = {worksCard}
          >
              {showWorks(card.title,index)} 
           
            <Typography variant="body2" color="textSecondary" marginTop={1}>
              {card.content}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default HowItWorks;
