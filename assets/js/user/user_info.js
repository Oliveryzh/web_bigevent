$(function () {
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        nickname: (value) => {
            if (value.length > 6) {
                return '昵称长度必须在 1~6 之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', (e) => {
        e.preventDefault()
        initUserInfo()
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            // 序列化 可以快速获取表单数据
            // 为什么这里我用 $(this).serialize() 获取不到数据 
            // 然而老师视频里使用 $(this) 是可以获取数据的
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0 && res.message !== '修改用户信息成功！') {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')

                console.log('======================')
                console.log($(this))
                console.log('======================')

                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})


