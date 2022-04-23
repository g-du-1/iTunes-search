import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ResultCard } from './ResultCard';
import React from 'react';
import { loadSearchAPI } from '../utils/api-facade';

export const Search: React.FC = () => {
  const [inputText, setInputText] = React.useState('');
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [results, setResults] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const results = await loadSearchAPI(inputText, 0);
      console.log(results);
      results.length > 0 ? setResults(results) : setResults(null);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={1}>
      <TextField
        id='outlined-basic'
        onChange={inputHandler}
        variant='outlined'
        fullWidth
        label='Search'
        value={inputText}
        sx={{ width: '15rem', mb: 2, mr: 2 }}
      />
      <Button variant='contained' onClick={fetchResults} sx={{ mb: 2 }}>
        Search
      </Button>
      {results ? (
        <Grid container spacing={2}>
          {results.map((result, index) => (
            <Grid item sx={{ width: '100%' }} sm={6} md={4} lg={3} key={index}>
              <ResultCard result={result} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container>
          <div>No results</div>
        </Grid>
      )}
    </Grid>
  );
};
