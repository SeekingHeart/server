// src/controllers/auth.ts
import { Context } from "koa";
import axios from "axios";
import alipaySdk from "./aliPaysdk";
import AlipayFormData from "alipay-sdk/lib/form";

export default class AliPay {
  public static async pcpay(ctx: Context) {
    const formData = new AlipayFormData();
    formData.setMethod("get");
    // 通过 addField 增加参数
    // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
    formData.addField("return_url", "http://localhost:3000/orderFinish");
    // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
    formData.addField("notify_url", "http://www.baidu.com");
    formData.addField("bizContent", {
      outTradeNo: ctx.request.body.outTradeNo, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
      productCode: "FAST_INSTANT_TRADE_PAY", // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: "0.01", // 订单总金额，单位为元，精确到小数点后两位
      subject: "商品", // 订单标题
    }); // 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
    const result = await alipaySdk.exec(
      "alipay.trade.page.pay", // 统一收单下单并支付页面接口
      {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
      { formData: formData }
    );
    ctx.status = 200;
    ctx.body = result;
  }
  public static async pcpayQuery(ctx: Context) {
    const formData = new AlipayFormData();
    formData.setMethod("get");
    formData.addField("bizContent", {
      outTradeNo: ctx.request.body.outTradeNo,
    }); // 通过该接口主动查询订单状态
    const result = await alipaySdk.exec(
      "alipay.trade.query",
      {},
      {
        formData: formData,
      }
    );
    try {
      const res = await axios.get(result as string);
      const queryRes = res.data.alipay_trade_query_response;
      if (queryRes.code === "10000") {
        // 接口调用成功
        switch (queryRes.trade_status) {
          case "WAIT_BUYER_PAY":
            ctx.body = "交易创建，等待买家付款";
            break;
          case "TRADE_CLOSED":
            ctx.body = "未付款交易超时关闭，或支付完成后全额退款";
            break;
          case "TRADE_SUCCESS":
            ctx.body = "交易支付成功";
            break;
          case "TRADE_FINISHED":
            ctx.body = "交易结束，不可退款";
            break;
        }
      } else if (queryRes.code === "40004") {
        ctx.body = "交易不存在";
      }
      ctx.status = 200;
    } catch (err) {
      ctx.status = 500;
    }
  }
}
