//import connection from "../configs/connectDB";
import pool from "../configs/connectDB";
import multer from "multer";

const getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', {
        dataUser: rows,
    });

    // let data = [];
    // connection.query(
    //     'SELECT * FROM `users`', (err, results, fields) => {
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 fullname: row.fullname,
    //                 address: row.address,
    //                 email: row.email,
    //             });
    //         });
    //         return res.render('index.ejs', {
    //             dataUser: data,
    //         });
    //     }
    // )

}

const getDetailUser = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute('SELECT * FROM users where id = ?', [userId]);
    return res.render('detailUser.ejs', {
        user: user[0],
    });
}

const createUser = async (req, res) => {
    let { fullname, address, email } = req.body;
    await pool.execute('INSERT INTO users(fullname, address, email) VALUES(?, ?, ?)',
        [fullname, address, email]);
    return res.redirect('/');
}

const deleteUser = async (req, res) => {
    let userId = req.params.userId;
    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
    return res.redirect('/');
}

const getEditUser = async (req, res) => {
    let userId = req.params.userId;
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return res.render('editUser.ejs', {
        user: user[0],
    });
}

const updateUser = async (req, res) => {
    let userId = req.params.userId;
    let { fullname, address, email } = req.body;
    await pool.execute('UPDATE users SET fullname = ?, address = ?, email = ? WHERE id = ?',
        [fullname, address, email, userId]);
    return res.redirect('/');
}

// -------------------------------- UPLOAD FILE ---------------------------------------

const getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
}

const handleUploadFile = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`);

}

const handleUploadMultipleFile = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload-file">Upload more images</a>';
    res.send(result);

}

module.exports = {
    getHomePage,
    getDetailUser,
    createUser,
    deleteUser,
    getEditUser,
    updateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFile
}