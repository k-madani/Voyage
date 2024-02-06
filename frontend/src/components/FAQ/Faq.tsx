import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Typography,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import './Faq.css';
 import { faqTitle,faqContent } from '../Utils/styles';

 import { useTranslation } from 'react-i18next';

const Faq: React.FC = () => {
  const { t } = useTranslation('common');
    const accordionData = [
        {
          title: t('landing.faq.1'),
          content: t('landing.faq.1.a')
        },
        {
          title: t('landing.faq.2'),
          content: t('landing.faq.2.a')
        },
        {
          title: t('landing.faq.3'),
          content: t('landing.faq.3.a')
        },
        {
          title: t('landing.faq.4'),
          content: t('landing.faq.4.a')
        },
        {
          title: t('landing.faq.5'),
          content: t('landing.faq.5.a')
        },
        {
          title: t('landing.faq.6'),
          content: t('landing.faq.6.a')
        },
        {
          title: t('landing.faq.7'),
          content: t('landing.faq.7.a')
        },
        {
          title: t('landing.faq.8'),
          content: t('landing.faq.8.a')
        }
      ];
    
  return (
    <>
    <Container>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4682B4', marginBottom: 4,fontFamily: 'fantasy' }}>
            {t('landing.faq.heading')}
        </Typography>

      <div className="accordion-container">
        {accordionData.map((item, index) => (
          <div key={index} className="accordion-item">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
              >
                <Typography sx={faqTitle} >{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={faqContent}>{item.content}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </Container>
    </>
  );
};

export default Faq;






