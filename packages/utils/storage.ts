/*
 * @Description:
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/19 10:26
 * @Path: src/utils/storage.ts
 */
export class LocalStorage {
    /**
     * @name: 设置缓存
     * @description:
     * @return {type} {*} undefined
     * @param {*} name 缓存名称
     * @param {*} value 缓存值
     * @param {*} time 储存时间，单位毫秒 -1为永久
     */
    static set(name:string, value:unknown, time:number = -1):void {
        if (!value) {
            localStorage.removeItem(name)
            return
        }
        const expire = new Date().getTime()
        localStorage.setItem(
            name,
            JSON.stringify({
                value,
                time: time === -1 ? (() => -1)() : (() => expire + time)()
            })
        )
    }

    /**
     * @name: 获取缓存
     * @description: 获取缓存，如果发现缓存过期则删除缓存
     * @return {type} {*} 缓存值 || null
     * @param {*} name 缓存名称
     */
    static get<T=any>(name:string):T|null {
        let data = localStorage.getItem(name)
        if (data) {
            const cacheData = JSON.parse(data)
            if (!cacheData || (cacheData.time !== -1 && cacheData.time < new Date())) {
                localStorage.removeItem(name)
                return null
            }
            return cacheData.value
        }
        return null
    }
    static remove(name:string) {
        localStorage.removeItem(name)
    }
    static clear() {
        localStorage.clear()
    }
}

export class SessionStorage {
    /**
     * @name: 设置缓存
     * @description:
     * @return {type} {*} undefined
     * @param {*} name 缓存名称
     * @param {*} value 缓存值
     * @param {*} time 储存时间，单位毫秒 -1为永久
     */
    static set(name:string, value:unknown, time:number = -1):void {
        if (!value) {
            sessionStorage.removeItem(name)
            console.warn('设置缓存值为空，删除', name);
            return
        }
        const expire = new Date().getTime()
        sessionStorage.setItem(
            name,
            JSON.stringify({
                value,
                time: time === -1 ? (() => -1)() : (() => expire + time)()
            })
        )
    }
    /**
     * @name: 获取缓存
     * @description: 获取缓存，如果发现缓存过期则删除缓存
     * @return {type} {*} 缓存值 || null
     * @param {*} name 缓存名称
     */
    static get<T=any>(name:string):T|null {
        let data = sessionStorage.getItem(name)
        if (data) {
            const cacheData = JSON.parse(data)
            if (!cacheData || (cacheData.time !== -1 && cacheData.time < new Date())) {
                sessionStorage.removeItem(name)
                return null
            }
            return cacheData.value
        }
        return null
    }
    static remove(name:string) {
        sessionStorage.removeItem(name)
    }
    static clear() {
        sessionStorage.clear()
    }
}
