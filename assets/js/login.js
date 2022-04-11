$(function () {
    // 点击 ‘去注册账号’ 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 ‘去登录’ 的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 的校验规则
        'pwd': [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //   校验两次密码是否一致的规则
        repwd: function (value) {
            //   通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败， 则 return 一个错误信息提示
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的的提交事件
    $('#form_reg').on('submit', (e) => {
        // 第一步：阻止默认提交
        e.preventDefault();
        // 获取注册的密码
        var pwd = $('.reg-box [name=password]').val()
        // 获取注册的用户名
        var username = $('.reg-box [name=username]').val()
        // 发起post请求 具体看api文档
        $.post('/api/reguser', { username: username, password: pwd }, (res) => {
            if (res.status !== 0) { 
                // return console.log(res.message) 
                return layer.msg(res.message)
            }
            console.log('注册成功！请登录')
            layer.msg('注册成功! 请登录')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        // 阻止默认行为
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:(res)=>{
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token)
                // 将登录成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token',res.token) 
                // 登录成功后就跳转到后台主页
                location.href = '/index.html'
            }
       
    })
    })
        
})