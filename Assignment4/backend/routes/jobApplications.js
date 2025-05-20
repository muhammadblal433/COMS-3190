import { Router } from 'express';
const router = Router();
const coll = (req) => req.app.locals.db.collection('JobApplications');

// GET /jobApplications
router.get('/', async (req, res, next) => {
  try { res.json(await coll(req).find().toArray()); }
  catch (err) { next(err); }
});

// GET /jobApplications/:jobId
router.get('/:jobId', async (req, res, next) => {
  try {
    const docs = await coll(req).find({ jobId: req.params.jobId }).toArray();
    res.json(docs);
  } catch (err) { next(err); }
});

// POST /jobApplications
router.post('/', async (req, res, next) => {
  try {
    const { insertedId } = await coll(req).insertOne(req.body);
    res.status(201).json({ _id: insertedId });
  } catch (err) { next(err); }
});

// PUT /jobApplications/:applicationId
router.put('/:applicationId', async (req, res, next) => {
  try {
    const { value } = await coll(req).findOneAndUpdate(
      { applicationId: req.params.applicationId },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    value ? res.json(value) : res.sendStatus(404);
  } catch (err) { next(err); }
});

// DELETE /jobApplications/:applicationId
router.delete('/:applicationId', async (req, res, next) => {
  try {
    const { deletedCount } = await coll(req).deleteOne({ applicationId: req.params.applicationId });
    deletedCount ? res.sendStatus(204) : res.sendStatus(404);
  } catch (err) { next(err); }
});

export default router;
