const db = require("../config/db");

const { makeList } = require("../helpers/list.helper");

// ADD MEMBER
exports.addMember = (req, res) => {
    const { name, phone, plan } = req.body;

    if (!name || !phone || !plan) {
        return res.status(400).json({ message: "Name, phone, and plan are required" });
    }

    db.query(
        "INSERT INTO members (name, phone, plan) VALUES ($1, $2, $3) RETURNING *",
        [name, phone, plan],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: "Member added",
                member: result.rows[0]
            });
        }
    );
};

// GET MEMBERS
exports.getMembers = (req, res) => {
    db.query("SELECT * FROM members ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(result.rows);
    });
};

// UPDATE MEMBER
exports.updateMember = (req, res) => {
    const { id } = req.params;
    const { name, phone, plan } = req.body;

    if (!name || !phone || !plan) {
        return res.status(400).json({ message: "Name, phone, and plan are required" });
    }

    db.query(
        "UPDATE members SET name = $1, phone = $2, plan = $3 WHERE id = $4 RETURNING *",
        [name, phone, plan, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Member not found" });
            }

            res.json({
                message: "Member updated",
                member: result.rows[0]
            });
        }
    );
};

// DELETE MEMBER
exports.deleteMember = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM members WHERE id = $1 RETURNING *",
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Member not found" });
            }

            res.json({
                message: "Member deleted",
                member: result.rows[0]
            });
        }
    );
};


exports.getGenderList = (req, res) => {
    const genders = [
        { id: 1, name: "rwgwh" },
        { id: 2, name: "Female" },
        { id: 3, name: "Other" }
    ];

    const data = makeList(genders, "id", "name");

    res.json({
        success: true,
        data
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
