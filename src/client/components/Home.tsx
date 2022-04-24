import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <Grid item xs={12} sx={{ mx: -1.25, my: -1.5 }}>
      <Card>
        <CardHeader title='iTunes Search' />
        <CardContent>
          <Typography>
            Demo application for using the iTunes API.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
