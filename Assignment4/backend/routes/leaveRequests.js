//Implemented by Muhammad Blal

import { Router } from 'express';
import { ObjectId } from 'mongodb'; 
const router = Router();
const coll = (req) => req.app.locals.db.collection('LeaveRequests');

// GET /leaveRequests
router.get('/', async (req, res, next) => {
  try { res.json(await coll(req).find().toArray()); }
  catch (err) { next(err); }
});

// GET /leaveRequests/:employeeId
router.get('/:employeeId', async (req, res, next) => {
  try {
    const docs = await coll(req).find({ employeeId: req.params.employeeId }).toArray();
    res.json(docs);
  } catch (err) { next(err); }
});

// POST /leaveRequests
router.post('/', async (req, res, next) => {
  try {
    const { insertedId } = await coll(req).insertOne(req.body);
    res.status(201).json({ _id: insertedId });
  } catch (err) { next(err); }
});

// PUT /leaveRequests/:leaveId
router.put('/:leaveId', async (req, res, next) => {
  try {
    const leaveId = Number(req.params.leaveId);
    const { value } = await coll(req).findOneAndUpdate(
      { leaveId },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    value ? res.json(value) : res.sendStatus(404);
  } catch (err) { next(err); }
});

// DELETE /leaveRequests/:leaveId
router.delete('/:leaveId', async (req, res, next) => {
  try {
    const leaveId = Number(req.params.leaveId);
    const { deletedCount } = await coll(req).deleteOne({ leaveId });
    deletedCount ? res.sendStatus(204) : res.sendStatus(404);
  } catch (err) { next(err); }
});

export default router;
