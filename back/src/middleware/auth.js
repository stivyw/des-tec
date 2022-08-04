
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

    let token = req.headers['authorization'] || req.headers["x-access-token"];

    token = token.replace(/^Bearer\s/, '');

    if (!token) {
        return res.status(401).json({ error: "Um token é preciso para validação!" });
    }
    try {
        const decoded = jwt.verify(token, config.DESTEC_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({ error: "Token inválido!" });
    }
    return next();
};

module.exports = verifyToken;
