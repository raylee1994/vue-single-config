import Vue from "vue";
import Router from "vue-router";

const home = resolve => {
    import(/*webpackChunkName: 'home'*/ 'views/home/home').then(module => {
        resolve(module)
    })
}
const test = resolve => {
    import(/*webpackChunkName: 'test'*/ 'views/test/test').then(module => {
        resolve(module)
    })
}

Vue.use(Router)

export default new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: home,
            name: home
        },
        {
            path: "/test",
            component: test,
            name: test
        }
    ]
})