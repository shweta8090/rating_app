    const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = (req, res) => {
  const { name, email, password, address} = req.body;

  if (!name || !email || !password || !address ) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const role ='user';

  const sql = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, hashedPassword, address, role], (err, result) => {
    if (err) return res.status(500).json({ msg: err });

    res.status(201).json({ msg: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ msg: err });

    if (results.length === 0) return res.status(401).json({ msg: 'Invalid credentials' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};
