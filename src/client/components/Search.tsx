import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ResultCard } from './ResultCard';
import React, { useState } from 'react';
import { loadSearchAPI } from '../utils/api-facade';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Search: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [offset, setOffset] = useState(0);
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  // TODO Do proper error handling
  const handleSearchClick = async () => {
    try {
      const newResults = await loadSearchAPI(inputText, 0);
      setResults(newResults);
      setOffset(10);
      !hasFetched && setHasFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO Handle reaching the end of results
  const loadMore = async () => {
    try {
      const newResults = await loadSearchAPI(inputText, offset);
      setResults(results.concat(newResults));
      setOffset(offset + 10);
      !hasFetched && setHasFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button variant='contained' onClick={handleSearchClick} sx={{ mb: 2 }}>
        Search
      </Button>
      {results.length > 0 ? (
        <InfiniteScroll dataLength={results.length} next={loadMore} hasMore={true} loader={<h4>Loading...</h4>}>
          <Grid container spacing={2}>
            {results.map((result, index) => (
              <Grid item sx={{ width: '100%' }} sm={6} md={4} lg={3} key={index}>
                <ResultCard result={result} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        hasFetched && (
          <Grid container>
            <div>No results</div>
          </Grid>
        )
      )}
    </Grid>
  );
};
