import Vue from "vue";
import router from "./router/index"
import App from "./app"

new Vue({
    el: "#app",
    router,
    components: {App},
    template: "<App/>"
})