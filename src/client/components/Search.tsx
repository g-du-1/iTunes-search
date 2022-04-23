import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { loadSearchAPI } from '../utils/api-facade';

export const Search: React.FC = () => {
  const [results, setResults] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const fetchResults = async () => {
      setIsLoading(true);
      const results = await loadSearchAPI();
      console.log(results)
      if (!cancelled) {
        setResults(results);
        setIsLoading(false);
      }
    };

    fetchResults();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Results' />
          <CardContent>
            <List>
              {results.map((result) => (
                <ListItem key={result.collectionId}>
                  <h2>{result.artistName}</h2>
                  <p>{result.collectionName}</p>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
  );
};
