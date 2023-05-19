// src/controllers/auth.ts
import { Context } from "koa";
import * as argon2 from "argon2";
import { getManager } from "typeorm";

import jwt from "jsonwebtoken";

// ...
import { JWT_SECRET } from "../constants";

import { Users } from "../entity/users";
import { UnauthorizedException } from "../exceptions";

export default class AuthController {
  // ...
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(Users);
    
    const user = await userRepository
      .createQueryBuilder()
      .where({ username: ctx.request.body.username })
      .addSelect("Users.password")
      .getOne();
    if (!user) {
      throw new UnauthorizedException("用户名不存在");
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200;
      ctx.body = {data: {code:200,username: user.username, avatar: '', token: jwt.sign({ id: user.id }, JWT_SECRET) } };
    } else {
      throw new UnauthorizedException("密码错误");
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(Users);
    const newUser = new Users();
    console.log(ctx.request.body,'ctx.request.body')
    newUser.username = ctx.request.body?.username;
    newUser.email = ctx.request.body?.email || "1122@126.com";
    // console.log(ctx.request);
    newUser.password = await argon2.hash(ctx.request.body.password);
    // 保存到数据库
    const user = await userRepository.save(newUser);
    ctx.status = 200;
    ctx.body = { data:{code: ctx.status, msg: 'success'} };
  }
}
