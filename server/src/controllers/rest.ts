// src/controllers/user.ts
import { Context } from "koa";
import { getManager } from "typeorm";
import * as fs from "fs";
import * as path from "path";

import { Users } from "../entity/users";
import { NotFoundException, ForbiddenException } from "../exceptions";

export default class RestController {
  public static async search(ctx: Context) {
    // const userRepository = getManager().getRepository(Users);
    // const users = await userRepository.find();
    ctx.status = 200;
    ctx.body = {
      code: 0,
    };
  }

  public static async cities(ctx: Context) {
    const cities = fs
      .readFileSync(path.join(__dirname, "./mocker/rest/cities.json"))
      .toString();
    if (cities) {
      ctx.status = 200;
      ctx.body = {
        data: JSON.parse(cities),
        code: 0,
      };
    } else {
      throw new NotFoundException();
    }
  }
  public static async getSearch(ctx: Context) {
    const { key } = ctx.request.query;
    if (key) {
      ctx.status = 200;
      ctx.body = {
        data: {
          result: [
            {
              key: "北京",
              display: "北京",
            },
            {
              key: "霸州",
              display: "霸州",
            },
            {
              key: "白河东",
              display: "白河东",
            },
            {
              key: "宾阳",
              display: "宾阳",
            },
            {
              key: "宝鸡",
              display: "宝鸡",
            },
            {
              key: "博鳌",
              display: "博鳌",
            },
            {
              key: "蚌埠",
              display: "蚌埠",
            },
            {
              key: "北碚",
              display: "北碚",
            },
            {
              key: "包头",
              display: "包头",
            },
            {
              key: "北票",
              display: "北票",
            },
            {
              key: "巴中",
              display: "巴中",
            },
            {
              key: "霸州",
              display: "霸州",
            },
          ],
          searchKey: key,
        },
        code: 0,
      };
    } else {
      throw new NotFoundException();
    }
  }

  public static async query(ctx: Context) {
    let params = ctx.request.body;
    let res = fs
      .readFileSync(path.join(__dirname, "./mocker/rest/query.json"))
      .toString();
    let query = JSON.parse(res);
    if (params.highSpeed) {
      query.dataMap.directTrainInfo.trains =
        query.dataMap.directTrainInfo.trains.filter(
          (item: any) => item.trainNumber.substr(0, 1) === "G"
        );
    }
    if (params.haveTicket) {
      query.dataMap.directTrainInfo.trains =
        query.dataMap.directTrainInfo.trains.filter(
          (item: any) => item.trainShowDesc !== "无票"
        );
    }
    if (params.timeSort === 0) {
    } else {
      query.dataMap.directTrainInfo.trains =
        query.dataMap.directTrainInfo.trains.sort((a: any, b: any) => {
          if (a.timeInMinute > b.timeInMinute) {
            //需修改.name—>.age实现相应的排序顺序
            return 1;
          } else if (a.timeInMinute < b.timeInMinute) {
            return -1;
          } else {
            return 0;
          }
        });
    }
    if (query) {
      ctx.status = 200;
      ctx.body = {
        data: query,
        code: 0,
      };
    } else {
      throw new NotFoundException();
    }
  }
  public static async ticket(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
      data: {
        detail: {
          departTimeStr: "07:15",
          arriveTimeStr: "11:47",
          arriveDate: 1122,
          durationStr: "4小时32分",
        },
        candidates: [
          {
            type: "二等座",
            priceMsg: "443.5",
            ticketsLeft: "有票",
            channels: [
              {
                name: "快速预订",
                desc: "含40元出行保障 快速出票 迅捷无忧",
              },
              {
                name: "普通预订",
                desc: "出票较慢，高峰期需要排队",
              },
            ],
          },
          {
            type: "一等座",
            priceMsg: "748.5",
            ticketsLeft: "有票",
            channels: [
              {
                name: "快速预订",
                desc: "含40元出行保障 快速出票 迅捷无忧",
              },
              {
                name: "普通预订",
                desc: "出票较慢，高峰期需要排队",
              },
            ],
          },
          {
            type: "商务座",
            priceMsg: "1403.5",
            ticketsLeft: "5张",
            channels: [
              {
                name: "快速预订",
                desc: "含40元出行保障 快速出票 迅捷无忧",
              },
              {
                name: "普通预订",
                desc: "出票较慢，高峰期需要排队",
              },
            ],
          },
        ],
      },
      code: 0,
    };
  }
  public static async schedule(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
      data: [
        {
          station: "北京南",
          arriveTime: null,
          departTime: "07:20",
          stay: null,
        },
        {
          station: "天津南",
          arriveTime: "07:54",
          departTime: "07:56",
          stay: 2,
        },
        {
          station: "南京南",
          arriveTime: "11:51",
          departTime: "11:53",
          stay: 2,
        },
        {
          station: "上海虹桥",
          arriveTime: "13:08",
          departTime: null,
          stay: null,
        },
      ],
      code: 0,
    };
  }
  public static async order(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
      departTimeStr: "07:15",
      arriveTimeStr: "11:47",
      arriveDate: 112,
      durationStr: "4小时32分",
      price: 483.5,
    };
  }

  //订单列表
  public static async orderList(ctx: Context) {
    let { status, count } = ctx.request.body;
    let res = fs
      .readFileSync(path.join(__dirname, "./mocker/rest/orderList.json"))
      .toString();
    const data = JSON.parse(res).filter((item: any) => {
      if (status === 3) {
        return item.status === 3 || item.status === 4;
      } else if (status === 0) {
        return item.trainName;
      } else {
        return item.status === status;
      }
    });
    if (data) {
      ctx.status = 200;
      ctx.body = {
        data: data.slice(count * 7, count * 7 + 7),
        code: 200,
        msg: "success",
      };
    } else {
      throw new NotFoundException();
    }
  }

  //乘客乘客
  public static async passengers(ctx: Context) {
    let res = fs
      .readFileSync(path.join(__dirname, "./mocker/rest/passengers.json"))
      .toString();
    const query = JSON.parse(res);
    if (query) {
      ctx.status = 200;
      ctx.body = {
        data: query,
        code: 200,
        msg: "success",
      };
    } else {
      throw new NotFoundException();
    }
  }
  public static async passengerInfo(ctx: Context) {
    let { bookerId } = ctx.request.body;
    let res = fs
      .readFileSync(path.join(__dirname, "./mocker/rest/passengers.json"))
      .toString();
    const query = JSON.parse(res).filter(
      (item: any) => item.bookerId === bookerId
    )[0];
    if (query) {
      ctx.status = 200;
      ctx.body = {
        data: query,
        code: 200,
        msg: "success",
      };
    } else {
      throw new NotFoundException();
    }
  }
}
