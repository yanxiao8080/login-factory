
interface SideRoute {
    // code与/src/router中的code对应
    code: string,
    // 侧边栏标题
    title: string,
    path: string,
    icon?: string,
    children?: Array<SideRoute> | []
}

//头部导航路由
export const routes:Array<SideRoute> = [{
    code: 'H1002',
    title: '项目管理1',
    path: '/projectList',
}]
