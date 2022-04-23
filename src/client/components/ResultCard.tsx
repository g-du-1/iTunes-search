import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { styled } from '@mui/system';

const replaceWrapperTypeTxt: string = (wrapperType: string) => {
  if (wrapperType === 'artist') {
    return 'Artist';
  } else if (wrapperType === 'collection') {
    return 'Album';
  } else {
    return 'Song';
  }
};

const CustomCardHeader = styled(CardHeader)`
  background-color: #1976d2;
  color: #fff;
`;

const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
`;

const ArtistName = styled(Typography)`
  font-weight: bold;
`;

const CollectionName = styled(Typography)`
  margin-top: 0.5rem;
`;

export const ResultCard: React.FC = ({ result }) => (
  <Card sx={{ height: '100%' }}>
    <CustomCardHeader title={replaceWrapperTypeTxt(result.wrapperType)} />
    <CustomCardContent>
      <ArtistName>{result.artistName}</ArtistName>
      {result.wrapperType === 'artist' ? '' : <CollectionName>{result.collectionName}</CollectionName>}
    </CustomCardContent>
  </Card>
);
