$(function () {
    // 调用 getUserInfo 这个函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer


    $('#btnLoginout').on('click', function () {
        // 提示用户是否确认退出登录
        layer.confirm('是否退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储
            localStorage.removeItem('token')
            // 2.返回登录页
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(res)
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: (res) => {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 第一步 获取用户名称
    var name = user.nickname || user.username
    // 第二步 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 第三步 按需设置用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', 'user.user_pic').show()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}