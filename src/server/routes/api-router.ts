import bodyParser from 'body-parser';
import { Router } from 'express';
import axios from 'axios';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get('/api/v1/search/', async (req, res) => {
    try {
      const searchResponse = await axios({
        url: 'https://itunes.apple.com/search?term=five+finger&media=music&entity=musicArtist,album,song&country=US&limit=50',
        method: 'get'
      });
      console.log(searchResponse);
      res.status(200).send(searchResponse.data.results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
}
