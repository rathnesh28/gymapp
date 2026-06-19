const db = require("../config/db");

exports.getStats = (req, res) => {
    db.query("SELECT COUNT(*) FROM members", (err, m) => {
        if (err) return res.status(500).json({ error: err });

        db.query("SELECT COUNT(*) FROM packages", (err2, p) => {
            if (err2) return res.status(500).json({ error: err2 });

            res.json({
                total_members: m.rows[0].count,
                total_packages: p.rows[0].count
            });
        });
    });
};