import express from 'express';
import * as controller from './controller/index.js';

const router = express.Router();

router.get(
  '/api/example',
  (req, res) => {
    controller.someAction(res, req.body);
  }
);

router.get(
  '/api/scores',
  (req, res) => {
    controller.getScores(res, req.body);
  }
);

router.post(
  '/api/save-score',
  (req, res) => {
    controller.postScore(res, req.body);
  }
)

export default router;
