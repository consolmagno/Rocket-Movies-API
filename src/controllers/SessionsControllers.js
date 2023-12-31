const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcrypt")
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken")

class SessionsController{
  async crete(request, response){
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first();
    const passwordMatched = await compare(password, user.password);

    if(!user || !passwordMatched){
      throw new AppError("Email e/ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret,{
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token});
  }
}

module.exports = SessionsController