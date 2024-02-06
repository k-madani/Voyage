import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { memberBtn,memberBtnAdv } from '../Utils/styles';
import { useTranslation } from 'react-i18next';

const MembershipComparison: React.FC = () => {
  const { t } = useTranslation('common');
  const rows = [
    { feature: t('landing.mile.points.tbody'), voyager: t('landing.tbody.v.1'), adventurer: t('landing.tbody.a.1') },
    { feature: t('landing.deals.on.flight.tbody'), voyager: t('landing.tbody.v.2'), adventurer: t('landing.tbody.a.2') },
    { feature: t('landing.free.ebook.tbody'), voyager: t('landing.tbody.v.3'), adventurer: t('landing.tbody.a.3')},
    { feature: t('landing.travelmapping.tbody'), voyager: t('landing.tbody.v.3'), adventurer: t('landing.tbody.a.4') },
    { feature: t('landing.hotel.tbody'), voyager: t('landing.tbody.v.3'), adventurer: t('landing.tbody.a.4') }
  ];

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 15, width: '90%',marginLeft:10 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={memberBtn}>
                {t('compare.memberships.thead')}
            </TableCell>
            <TableCell align="center" sx={memberBtn}>
              {t('voyager.thead')} <br/>
              
              {/* <Button  variant="outlined"
            color="primary" 
            >Choose Limited</Button> */}
              
            </TableCell>
            <TableCell align="center" sx={memberBtnAdv}>
              {t('adventurer.thead')} <br/>
              
              {/* <Button  variant="contained"
            color="primary" 
            sx = {loginBtn}>Choose</Button> */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.feature}>
              <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                {row.feature}
              </TableCell>
              <TableCell align="center">{row.voyager}</TableCell>
              <TableCell align="center" sx={{ backgroundColor: '#b3e0ff' }}>
                {row.adventurer}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MembershipComparison;
