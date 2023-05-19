// src/controllers/user.ts
import { Context } from "koa";
import { getManager } from "typeorm";

import { Photo } from "../entity/Photo";
import { NotFoundException, ForbiddenException } from "../exceptions";

export default class PhotoController {
  public static async savePhoto(ctx: Context) {
    // let photo = new Photo();
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;

    const photoRepository = getManager().getRepository(Photo);
    const newPoto = new Photo();
    newPoto.name = ctx.request.body.name;
    newPoto.description = ctx.request.body.description;
    newPoto.filename = ctx.request.body.filename;
    newPoto.views = ctx.request.body.views;
    newPoto.isPublished = ctx.request.body.isPublished;

    // console.log(ctx.request);
    // newPoto.password = await argon2.hash(ctx.request.body.password);

    // 保存到数据库
    const user = await photoRepository.save(newPoto);

    ctx.status = 200;
    ctx.body = "success";

    // const res = await getManager().save(photo);
    // ctx.status = 200;
    // ctx.body = photo;
  }
}
