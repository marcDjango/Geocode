const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAllUser();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.readUser(req.params.id);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const readByEmailAndPassToNext = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await tables.user.readByEmail(email);
    const errors = [];
    if (user == null) {
      errors.push({
        field: "Email ou le mot de passe",
        message: "sont incorrect",
      });
      res.status(401).json({ validationErrors: errors });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const user = await tables.user.edit(req.body, req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const user = await tables.user.add(req.body);
    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.user.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  readByEmailAndPassToNext,
  edit,
  add,
  destroy,
};
