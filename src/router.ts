import Navigo, {Route} from "navigo";

export function redirect(router:Navigo,from:string,to:string){
    router.on(from, () => {
        router.navigate(to, {
            historyAPIMethod: 'replaceState'
        })
    })

}
