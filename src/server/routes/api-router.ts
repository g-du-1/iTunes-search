import bodyParser from 'body-parser';
import { Router } from 'express';
import axios from 'axios';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  router.get('/api/v1/search/', async (req, res) => {
    try {
      const term = req.query.term;
      const offset = req.query.offset;
      const searchResponse = await axios({
        url: `https://itunes.apple.com/search?term=${term}&media=music&entity=musicArtist,album,song&country=US&limit=10&offset=${offset}`,
        method: 'get'
      });
      res.status(200).send(searchResponse.data.results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
}
