// src/controllers/user.ts
import { Context } from "koa";
import { getManager } from "typeorm";

import { Users } from "../entity/users";
import { NotFoundException, ForbiddenException } from "../exceptions";

export default class UserController {
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(Users);
    const users = await userRepository.find();
    ctx.status = 200;
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(Users);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(Users);
    await userRepository.update(userId, ctx.request.body);
    const updatedUser = await userRepository.findOne(userId);
  }

  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(Users);
    await userRepository.delete(userId);

    ctx.status = 204;
  }
}
