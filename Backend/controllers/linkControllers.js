const QRCode = require("qrcode");
const { nanoid } = require("nanoid");
const db = require("../config/db");

const createShortLink = (req, res) => {
  console.log("Request Body:", req.body);

  let { long_url, custom_alias, expiry_date } = req.body;

  if (!long_url.startsWith("http://") && !long_url.startsWith("https://")) {
    long_url = "https://" + long_url;
  }
  const short_code = custom_alias || nanoid(6);

  const checkQuery = "SELECT * FROM links WHERE short_code = ?";

  db.query(checkQuery, [short_code], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Database Error",
      });
    }

    if (rows.length > 0) {
      return res.status(400).json({
        error: "Alias already exists",
      });
    }

    const query =
      "INSERT INTO links (long_url, short_code, expiry_date) VALUES (?, ?, ?)";

    db.query(query, [long_url, short_code, expiry_date], (err) => {
      if (err) {
        return res.status(500).json({
          error: "Database Error",
        });
      }

      res.status(201).json({
        message: "Short URL Created Successfully",
        long_url,
        short_code,
      });
    });
  });
};

const redirectLink = (req, res) => {
  const { short_code } = req.params;

  const query = "SELECT * FROM links WHERE short_code = ?";

  db.query(query, [short_code], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Database Error",
      });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Link not found",
      });
    }

    const expiry_date = rows[0].expiry_date;
    const long_url = rows[0].long_url;

    if (expiry_date && new Date(expiry_date) < new Date()) {
      return res.status(400).json({
        error: "This link has expired",
      });
    }

    const updateQuery =
      "UPDATE links SET click_count = click_count + 1, last_accessed = CURRENT_TIMESTAMP WHERE short_code = ?";

    db.query(updateQuery, [short_code], (err) => {
      if (err) {
        console.log("INSERT ERROR:", err);

        return res.status(500).json({
          error: err.message,
        });
      }

      res.redirect(long_url);
    });
  });
};

const getAnalytics = (req, res) => {
  const query = `
    SELECT
      COUNT(*) AS total_links,
      SUM(click_count) AS total_clicks,
      SUM(
        CASE
          WHEN expiry_date IS NULL OR expiry_date > NOW()
          THEN 1
          ELSE 0
        END
      ) AS active_links,
      SUM(
        CASE
          WHEN expiry_date IS NOT NULL AND expiry_date <= NOW()
          THEN 1
          ELSE 0
        END
      ) AS expired_links
    FROM links
  `;

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Database Error",
      });
    }

    res.json(rows[0]);
  });
};

const getAllLinks = (req, res) => {
  const query = `
    SELECT
      id,
      long_url,
      short_code,
      click_count,
      expiry_date,
      created_at
    FROM links
    ORDER BY created_at DESC
  `;

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Database Error",
      });
    }

    res.json(rows);
  });
};

const generateQR = async (req, res) => {
  const { short_code } = req.params;

  try {
    const shortUrl = `http://localhost:5000/api/links/${short_code}`;

    const qrCode = await QRCode.toDataURL(shortUrl);

    res.json({
      short_code,
      qrCode,
    });
  } catch (error) {
    res.status(500).json({
      error: "QR Generation Failed",
    });
  }
};

module.exports = {
  createShortLink,
  redirectLink,
  getAnalytics,
  getAllLinks,
  generateQR,
};
