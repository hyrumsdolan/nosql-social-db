import { Hono } from 'hono';
import thoughtController from '../controllers/thoughtController.js';

const thoughtRoutes = new Hono();

thoughtRoutes.get('/', thoughtController.getAllThoughts);
thoughtRoutes.get('/:id', thoughtController.getThoughtById);
thoughtRoutes.post('/', thoughtController.createThought);
thoughtRoutes.put('/:id', thoughtController.updateThought);
thoughtRoutes.delete('/:id', thoughtController.deleteThought);
thoughtRoutes.post('/:thoughtId/reactions', thoughtController.addReaction);
thoughtRoutes.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

export default thoughtRoutes;