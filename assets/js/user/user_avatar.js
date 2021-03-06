$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', () => {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', (e) => {
        var file = e.target.files[0]
        if (file.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 1、获取用户选择的文件
        var file = e.target.files[0]
        // 2、将文件转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3、重新初始化裁剪区域
        // .cropper('destroy') 销毁旧的裁剪区域
        // .attr('src',imgURL) 赋值新的图片地址
        // .cropper(options) 重新初始化裁剪区域
        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })

    // 为 确定按钮 绑定点击事件
    $('#btnUpload').on('click', function (e) {
        e.preventDefault()
        // 1、要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2、调用接口， 把头像上传到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('头像上传失败！')
                }
                layer.msg('更新头像成功！')
                // window.parent.getUserInfo()
                window.parent.getUserInfo()
            }
        })
    })
})