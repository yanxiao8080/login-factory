/*
 * @Description: 发布/订阅
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/6/1 09:19
 * @Path: src/utils/publisher.ts
 */

import {CheckType} from "@/utils/checkType";

export class Publisher<T> {
    // 订阅者列表
    private subscriberList: Array<T> = []

    // 发布
    emit(...args: Array<any>){
        this.subscriberList.forEach(item=>{
            if(CheckType.isFunction(item)){
                item.apply(this, args)
            }
        })
    }

    // 订阅
    on(callback: T){
        this.subscriberList.push(callback)
    }

    // 取消订阅
    off(callback: T){
        this.subscriberList = this.subscriberList.filter(fun=>fun!==callback)
    }

    // 清空订阅者
    clear(){
        this.subscriberList.length = 0
    }
}