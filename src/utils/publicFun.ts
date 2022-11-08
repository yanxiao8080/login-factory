/*
 * @Description: 
 * @Author: yanxiao
 * @Github: https://github.com/yanxiaos
 * @Date: 2022-03-28 09:39:02
 * @LastEditors: yanxiao
 */
import { CheckType } from "./checkType";
type k = string | number | symbol
type Json = Record<k, unknown> | Array<unknown>

/**
 * @name: 日期格式化
 * @description: 
 * @param {Date} date
 * @param {string} fmt
 * @return {string} {*}
 */
export function formatDate(date: Date, fmt: string): string {
  const o: Record<string, number> = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ''))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (String(o[k])) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}


/**
 * @name: 深拷贝
 * @description: 
 * @param {type} v any 被拷贝的数据
 * @return {type} any 返回拷贝后的数据
 */
export function deepClone<T>(v: T): T {
  if (!CheckType.isObject(v) && !CheckType.isArray(v)) {
    return v
  }
  let result: Json = {}
  CheckType.isObject(v) ? result = {} : result = []
  for (const key in <Json>v) {
    result[key] = deepClone((v as Json)[key])
  }
  return result as T
}


/**
 * @name: 返回一个防抖函数
 * @description: 例: this.handlerOption = debounce(this.optionHandler, 100)
 * @param {type} fn Function 函数
 * @param {type} delay Number 防抖时间
 * @return types Function 返回一个防抖函数
 */
export function debounce (fn:Function, delay:number) {
  let timer:NodeJS.Timeout | null = null
  return function () {
    // @ts-ignore
    const self = this
    const args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(self, args)
    }, delay)
  }
}

/**
 * @description: 返回一个防抖函数(抖动前执行，抖动重置等待时间)
 */
export function preDebounce<T extends Function> (fn: T, delay: number) {
  let timer: NodeJS.Timeout|null = null
  let tag = true
  return function () {
    // @ts-ignore
    const self = this
    if(tag){
      fn.apply(self, arguments)
      tag = false
    }
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      tag = true
    }, delay)
  }
}

/**
 * @description: 返回一个节流函数(delay毫秒内最多执行一次)
 */
export function throttle<T extends Function> (fn: T, delay: number) {
  let tag = true
  return function () {
    if(!tag) return
    // @ts-ignore
    const self = this
    fn.apply(self, arguments)
    tag = false
    setTimeout(function () {
      tag = true
    }, delay)
  }
}


/**
 * @description: 生成指定位数随机ID，默认21位
 */
export const nanoid=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
