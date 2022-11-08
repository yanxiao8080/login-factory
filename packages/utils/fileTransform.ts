/*
 * @Description: 文件相关方法
 * @Author: yanxiaos
 * @Github: https://github.com/yanxiaos
 * @Date: 2022/6/13 15:56
 * @Path: src/utils/fileTransform.ts
 */
export class FileTransform {

    static selectFile(attrs: Record<string, string>,onSuccess?: (result: string|ArrayBuffer|null)=>void, ){
        const input = document.createElement('input', )
        input.setAttribute('type','file');
        for (const attr in attrs) {
            input.setAttribute(attr, attrs[attr]);
        }
        input.click()
        input.addEventListener('change',()=>{
            let fileReader = new FileReader();
            fileReader.onload = () => {
                onSuccess&&onSuccess(fileReader.result)
            };
            fileReader.readAsText(input.files![0], 'UTF-8');
        },false)
    }

    static downloadFile (dataURL: string, fileName: string='fileName') {
        // 创建a标签并为其添加属性
        let downloadLink = document.createElement('a')
        downloadLink.href = dataURL
        downloadLink.download = fileName
        // 触发点击事件执行下载
        downloadLink.click()
    }

    // 文件流转blob
    static stream2Blob(data: any, type?: string): Blob{
        return new Blob([data], {type})
    }

    // blob转File
    static blob2File(blob: Blob, fileName: string, type?: string): File{
        return new File([blob], fileName, { type })
    }

    static file2DataUrl(file: File): Promise<string | ArrayBuffer | null>{
        return new Promise(resolve => {
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = function (e) {
                resolve(fileReader.result)
            }
        })
    }

    static dataUrl2File(dataUrl: string, fileName: string='test'){
        const dataArr = dataUrl.split(',')
        const mime = dataArr[0].match(/:(.*);/)![1]
        const originStr = atob(dataArr[1])
        return new File([originStr], fileName, { type: mime })
    }

    static blob2ArrayBuffer(blob: Blob){
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(blob)
            reader.onload = function (e) {
                resolve(reader.result)
            }
        })
    }

    static arrayBuffer2Blob(arrayBuffer: ArrayBuffer, type: string){
        return new Blob([arrayBuffer], { type })
    }
}