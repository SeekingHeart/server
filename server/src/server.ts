// src/server.ts
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import "reflect-metadata";
import jwt from "koa-jwt";

import { protectedRouter, unprotectedRouter } from "./routes/router";

import { logger } from "./logger";

import { JWT_SECRET } from "./constants";
import errMiddware from "./middwares/err";

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());

    app.use(errMiddware());

    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: "GET" }));

    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());
    // 响应用户请求
    // app.use(router.routes()).use(router.allowedMethods());
    // 运行服务器
    app.listen(3001);
  })
  .catch((err: string) => console.log("TypeORM connection error:", err));
