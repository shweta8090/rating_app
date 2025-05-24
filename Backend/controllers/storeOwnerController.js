const db = require('../db');
const bcrypt = require('bcryptjs');

exports.getStoreOwnerDashboard = (req, res) => {
  const ownerId = req.user.id;

  const sql = `
    SELECT s.id AS store_id, s.name AS store_name, 
           ROUND(AVG(r.rating), 1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.owner_id = ?
    GROUP BY s.id
  `;

  db.query(sql, [ownerId], (err, storeResults) => {
    if (err) return res.status(500).json({ msg: err });

    if (storeResults.length === 0) {
      return res.status(404).json({ msg: 'No store found for this owner' });
    }

    const storeId = storeResults[0].store_id;

    const ratingsSql = `
      SELECT u.id, u.name, u.email, r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
    `;

    db.query(ratingsSql, [storeId], (err2, ratingUsers) => {
      if (err2) return res.status(500).json({ msg: err2 });

      res.json({
        store: storeResults[0],
        rated_by_users: ratingUsers
      });
    });
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
