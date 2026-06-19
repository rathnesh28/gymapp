const db = require("../config/db");
const { makeList } = require("../helpers/list.helper");

exports.addPackage = (req, res) => {
    const { name, price, duration_days } = req.body;

    if (!name || price == null || !duration_days) {
        return res.status(400).json({ message: "Name, price, and duration_days are required" });
    }

    db.query(
        "INSERT INTO packages (name, price, duration_days) VALUES ($1, $2, $3) RETURNING *",
        [name, price, duration_days],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: "Package added",
                package: result.rows[0]
            });
        }
    );
};

exports.getPackages = (req, res) => {
    db.query("SELECT * FROM packages ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(result.rows);
    });
};

exports.getPackageList = (req, res) => {
    db.query(
        "SELECT id, name FROM packages ORDER BY id DESC",
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const data = makeList(result.rows, "id", "name");

            res.json({
                success: true,
                data
            });
        }
    );
};
