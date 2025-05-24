const db = require('../db');
const bcrypt = require('bcryptjs');

exports.getDashboardStats = (req, res) => {
  const stats = {};
  db.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    stats.totalUsers = result[0].total;

    db.query('SELECT COUNT(*) AS total FROM stores', (err2, result2) => {
      if (err2) return res.status(500).json({ msg: err2 });
      stats.totalStores = result2[0].total;

      db.query('SELECT COUNT(*) AS total FROM ratings', (err3, result3) => {
        if (err3) return res.status(500).json({ msg: err3 });
        stats.totalRatings = result3[0].total;

        res.json(stats);
      });
    });
  });
};

exports.addUser = (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, hashedPassword, address, role], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json({ msg: 'User added successfully' });
  });
};

exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;
  const sql = 'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, address, owner_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json({ msg: 'Store added successfully' });
  });
};

exports.getAllStores = (req, res) => {
  const sql = `
    SELECT s.*, ROUND(AVG(r.rating),1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};

exports.getAllUsers = (req, res) => {
  const sql = `
    SELECT u.id, u.name, u.email, u.address, u.role,
    (SELECT ROUND(AVG(r.rating),1)
     FROM ratings r
     JOIN stores s ON s.id = r.store_id
     WHERE s.owner_id = u.id) AS store_rating
    FROM users u
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};
