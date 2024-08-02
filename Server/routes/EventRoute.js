import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to check admin role
const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ Status: false, Error: 'No token provided' });

  jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
    if (err) return res.status(403).json({ Status: false, Error: 'Failed to authenticate token' });
    if (decoded.role !== 'admin') return res.status(403).json({ Status: false, Error: 'Not authorized' });
    next();
  });
};

// Fetch all events
router.get('/events', (req, res) => {
  const sql = 'SELECT * FROM events';
  con.query(sql, (err, results) => {
    if (err) return res.json({ Status: false, Error: 'Query error' });
    return res.json({ Status: true, events: results });
  });
});

// Add new event (admin only)
router.post('/events', checkAdmin, (req, res) => {
  const { title, start, end } = req.body;
  const sql = 'INSERT INTO events (title, start, end) VALUES (?, ?, ?)';
  con.query(sql, [title, start, end], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query error' });
    return res.json({ Status: true, message: 'Event added successfully' });
  });
});

// Update event (admin only)
router.put('/events/:id', checkAdmin, (req, res) => {
  const { id } = req.params;
  const { title, start, end } = req.body;
  const sql = 'UPDATE events SET title = ?, start = ?, end = ? WHERE id = ?';
  con.query(sql, [title, start, end, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query error' });
    return res.json({ Status: true, message: 'Event updated successfully' });
  });
});

// Delete event (admin only)
router.delete('/events/:id', checkAdmin, (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM events WHERE id = ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query error' });
    return res.json({ Status: true, message: 'Event deleted successfully' });
  });
});

export { router as eventRouter };
