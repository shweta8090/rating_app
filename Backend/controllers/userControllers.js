const db = require('../db');
const bcrypt = require('bcryptjs');

exports.getAllStores = (req, res) => {
  const userId = req.user.id;
  const { search } = req.query;

  let sql = `
    SELECT s.id, s.name, s.address, 
           ROUND(AVG(r.rating),1) AS average_rating,
           (SELECT rating FROM ratings WHERE user_id = ? AND store_id = s.id) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
  `;

  const params = [userId];

  if (search) {
    sql += ` WHERE s.name LIKE ? OR s.address LIKE ?`;
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` GROUP BY s.id`;

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};

exports.submitRating = (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  if (!store_id || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ msg: 'Invalid rating' });
  }

  // Check if already rated
  db.query(
    'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
    [user_id, store_id],
    (err, results) => {
      if (err) return res.status(500).json({ msg: err });

      if (results.length > 0) {
        return res.status(400).json({ msg: 'Rating already exists. Use update instead.' });
      }

      db.query(
        'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
        [user_id, store_id, rating],
        (err2) => {
          if (err2) return res.status(500).json({ msg: err2 });
          res.json({ msg: 'Rating submitted successfully' });
        }
      );
    }
  );
};

exports.updateRating = (req, res) => {
  const store_id = req.params.storeId;
  const { rating } = req.body;
  const user_id = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ msg: 'Invalid rating value' });
  }

  const sql = `UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?`;
  db.query(sql, [rating, user_id, store_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'No existing rating found to update' });
    }

    res.json({ msg: 'Rating updated successfully' });
  });
};

exports.updatePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ msg: 'Current and new password required' });
  }

  db.query('SELECT password FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ msg: err });
    if (results.length === 0) return res.status(404).json({ msg: 'User not found' });

    const isMatch = bcrypt.compareSync(currentPassword, results[0].password);
    if (!isMatch) return res.status(401).json({ msg: 'Current password incorrect' });

    const hashed = bcrypt.hashSync(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId], (err2) => {
      if (err2) return res.status(500).json({ msg: err2 });
      res.json({ msg: 'Password updated successfully' });
    });
  });
};