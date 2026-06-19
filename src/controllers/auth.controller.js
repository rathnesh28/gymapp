const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
        [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                if (err.code === "23505") {
                    return res.status(409).json({ message: "Email already registered" });
                }

                console.log(err);
                return res.status(500).json({ message: "DB error", error: err });
            }

            res.json({
                message: "User registered",
                user: result.rows[0]
            });
        }
    );
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "DB error" });
            }

            if (result.rows.length === 0) {
                return res.status(400).json({ message: "User not found" });
            }

            const user = result.rows[0];

            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            
            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    );
};
