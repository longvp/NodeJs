import pool from "../configs/connectDB";

const findAllUsers = async (req, res) => {
    const [rows, fileds] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'success',
        data: rows
    });
}

const createUser = async (req, res) => {
    let { fullname, address, email } = req.body;

    if (!fullname || !address || !email) {
        return res.status(200).json({
            message: 'missing require data',
        });
    }
    await pool.execute('INSERT INTO users(fullname, address, email) VALUES(?, ?, ?)',
        [fullname, address, email]);

    return res.status(200).json({
        message: 'success',
    });
}

const updateUser = async (req, res) => {
    let { fullname, address, email, id } = req.body;
    if (!fullname || !address || !email || !id) {
        return res.status(200).json({
            message: 'missing require data',
        });
    }
    await pool.execute('UPDATE users SET fullname = ?, address = ?, email = ? WHERE id = ?',
        [fullname, address, email, id]);
    return res.status(200).json({
        message: 'success',
    });
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            message: 'missing require data',
        });
    }
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return res.status(200).json({
        message: 'success',
    });
}

module.exports = {
    findAllUsers,
    createUser,
    updateUser,
    deleteUser
}