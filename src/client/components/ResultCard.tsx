import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { styled } from '@mui/system';

interface IResultProps {
  wrapperType: string,
  artistName: string,
  collectionName: string,
  trackName: string
}

const replaceWrapperTypeTxt = (wrapperType: string): string => {
  if (wrapperType === 'artist') {
    return 'Artist';
  } else if (wrapperType === 'collection') {
    return 'Album';
  } else {
    return 'Song';
  }
};

const CustomCardHeader = styled(CardHeader)`
  background-color: #1976D2;
  color: #FFF;
`;

const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
`;

const ArtistName = styled(Typography)`
  font-weight: bold;
`;

const CardRow = styled(Typography)`
  margin-top: .5rem;
`;

const TrackAlbum = styled(Typography)`
  margin-top: .5rem;
  font-size: .75rem;
`;

export const ResultCard: React.FC<IResultProps> = (props: IResultProps) => (
  <Card sx={{ height: '100%' }}>
    <CustomCardHeader title={replaceWrapperTypeTxt(props.wrapperType)} />
    <CustomCardContent>
      <ArtistName>{props.artistName}</ArtistName>
      {props.wrapperType === 'collection' && <CardRow>{props.collectionName}</CardRow>}
      {props.wrapperType === 'track' && (
        <>
          <CardRow>{props.trackName}</CardRow>
          <TrackAlbum>{props.collectionName}</TrackAlbum>
        </>
      )}
    </CustomCardContent>
  </Card>
);
