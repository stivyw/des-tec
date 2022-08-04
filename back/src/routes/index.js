var express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ ok: 'ok' });
});

/**
 * Login
 */
router.post('/login', async (req, res) => {

  try {

    const { login, senha } = req.body;
    const config = process.env;

    if (!(login && senha)) {
      return res.status(401).send("Os campos login e senha são obrigatórios!");
    }

    let user;

    if (login === config.DESTEC_USER && senha === config.DESTEC_PASS) {
      user = { user: config.DESTEC_USER };
      user.senha = await bcrypt.hash(senha, 10);
    } else {
      // user = User.findOne({ login });
    }

    if (user && (await bcrypt.compare(senha, user.senha))) {

      // const token = jwt.sign(user, config.DESTEC_SECRET_KEY, { expiresIn: '1h' });

      const token = jwt.sign(
        user,
        config.DESTEC_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );
      return res.status(200).json(token);
    }
    return res.status(400).send("Login ou senha inválido!");
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
