$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: (value) => {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: (value) => {
            if (value !== $('[name=newPwd]').val()) {
                return '两次修改密码不一致'
            }
        }
    })

    // 发起重置密码的请求
    $('.layui-form').on('submit',(e)=>{
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:(res)=>{
                if(res.status !==0 && res.message !== '更新密码成功！'){
                    return layer.msg('重置密码失败！')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                // form 表单有个 reset() 重置方法 不过需要原生dom form 对象才能使用
                // 所以把jQuery对象 通过 [0] 的方式 转换为 dom 对象
                $('.layui-form')[0].reset()
            }
        })
    })
})