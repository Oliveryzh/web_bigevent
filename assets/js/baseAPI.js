// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给ajax 提供的配置对象
$.ajaxPrefilter((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一为有权限的接口 设置 headers 请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = (res) => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})