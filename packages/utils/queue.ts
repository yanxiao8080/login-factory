/*
 * @Description: 队列
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/4/13 14:52
 * @Path: src/utils/queue.ts
 */
// 先进先出队列
export class Queue<T> {

   protected queue: Array<T> = [];

   // 入列
   put(data: T): void{
      this.queue.push(data)
   }

   // 出列
   get(): T | undefined{
      if(!this.isEmpty())
         return this.queue.shift()
   }

   // 返回当前队列长度
   getSize(): number{
      return this.queue.length
   }

   // 判断队列是否为空
   isEmpty(){
      return this.getSize() === 0
   }

   // 清空队列
   clear(){
      this.queue = []
   }
}

// 后进先出队列
export class LifoQueue<T> extends Queue<T>{
   // 重写 出列
   get(): T | undefined{
      if(!this.isEmpty())
         return this.queue.pop()
   }
}

