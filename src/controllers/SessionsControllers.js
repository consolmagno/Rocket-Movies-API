const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcrypt")

class SessionsController{
  async crete(request, response){
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first();
    const passwordMatched = await compare(password, user.password);

    if(!user || !passwordMatched){
      throw new AppError("Email e/ou senha incorretos", 401);
    }

    return response.json(user);
  }
}

module.exports = SessionsController