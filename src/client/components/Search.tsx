import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ResultCard } from './ResultCard';
import React, { useState } from 'react';
import { loadSearchAPI } from '../utils/api-facade';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Typography } from '@mui/material';

// TODO Add Typescript interfaces.
// I haven't used Typescript before so my usage might not be according to best practices.

export const Search: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const inputHandler = (e) => {
    const lowerCase: string = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // For a big project I would use Redux for state management.
  const [offset, setOffset] = useState<number>(0);
  const [results, setResults] = useState([]);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  // TODO Do proper error handling.
  const handleSearchClick = async (): Promise<void> => {
    try {
      const newResults = await loadSearchAPI(inputText, 0);
      setResults(newResults);
      setOffset(10);
      !hasFetched && setHasFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO Handle reaching the end of results.
  const loadMore = async (): Promise<void> => {
    try {
      const newResults = await loadSearchAPI(inputText, offset);
      setResults(results.concat(newResults));
      setOffset(offset + 10);
      !hasFetched && setHasFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loaderStyles: object = {
    marginTop: '5rem',
    textAlign: 'center',
  };

  const infiniteScrollStyles: object = {
    width: '100%',
  };

  // TODO Indicate loading with a spinner
  // TODO Fix issue of infinite scroll not working when the window is not scrollable: https://github.com/ankeetmaini/react-infinite-scroll-component/issues/171
  // Because of this issue the cards are laid out in one column as a workaround to avoid the infinite scroll breaking on larger screens.

  return (
    <Grid container spacing={1} sx={{ ml: -.75 }}>
      <Grid container sx={{ m: -.75 }}>
        <TextField
          id='outlined-basic'
          onChange={inputHandler}
          variant='outlined'
          fullWidth
          label='Search'
          value={inputText}
          sx={{ width: '15rem', mb: 2, mr: 1 }}
        />
        <Button variant='contained' onClick={handleSearchClick} sx={{ mb: 2 }}>
          Search
        </Button>
      </Grid>
      {results.length > 0 ? (
        <Grid container sx={{ ml: -2.5 }}>
          <InfiniteScroll
            style={infiniteScrollStyles}
            dataLength={results.length}
            next={loadMore}
            hasMore={true}
            loader={<h4 style={loaderStyles}>Scroll here to load more...</h4>}
          >
            <List>
              {results.map((result, index) => (
                <ListItem key={index}>
                  <ResultCard
                    artistName={result.artistName}
                    wrapperType={result.wrapperType}
                    collectionName={result.collectionName}
                    trackName={result.trackName}
                  />
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </Grid>
      ) : (
        hasFetched && (
          <Grid container>
            <Typography>No results</Typography>
          </Grid>
        )
      )}
    </Grid>
  );
};
