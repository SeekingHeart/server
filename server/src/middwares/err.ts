import { Context } from "koa";

const errorMiddware = () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      console.log("err", err);
      // 只返回 JSON 格式的响应
      ctx.status = err.status || 500;
      ctx.body = { message: err.message };
    }
  };
};
export default errorMiddware;
