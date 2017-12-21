// 项目入口文件
import Vue from "vue"

import App from "./components/App.vue"

const vm = new Vue({
    el: "#app",
    data: {},
    methods: {},
    render: c => c(App)
})