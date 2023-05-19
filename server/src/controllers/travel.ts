// src/controllers/user.ts
import { Context } from "koa";
import * as fs from "fs";
import * as path from "path";

// import { Users } from "../entity/user";
// import { getManager } from "typeorm";
import { NotFoundException, ForbiddenException } from "../exceptions";

export default class TravelController {
  public static async search(ctx: Context) {
    // const userRepository = getManager().getRepository(Users);
    // const users = await userRepository.find();
    ctx.status = 200;
    ctx.body = {
      code: 0,
    };
  }

  public static async travelList(ctx: Context) {
    const data = fs
      .readFileSync(path.join(__dirname, "./mocker/rest/travelInfo.json"))
      .toString();
    if (data) {
      ctx.status = 200;
      ctx.body = {
        data: JSON.parse(data),
        code: 0,
      };
    } else {
      throw new NotFoundException();
    }
  }
}
