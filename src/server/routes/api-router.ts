import bodyParser from 'body-parser';
import { Router } from 'express';
import SearchService from '../services/SearchService';

export function apiRouter() {
  const router = Router();
  router.use(bodyParser.json());

  // TODO Validate request queries, do proper error handling.
  // TODO Offset is undocumented, make sure it returns everything correctly.
  // Check if there is rate limiting and handle it.
  // If this was a real application, I would implement a layered architecture with services, repositories, etc.
  // This would help with testability and maintainability.
  router.get('/api/v1/search/', async (req, res) => {
    try {
      const term = req.query.term;
      const offset = req.query.offset;
      const searchService = new SearchService();
      const searchResults = await searchService.getSearchResults(term, offset);
      res.status(200).send(searchResults);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
}
