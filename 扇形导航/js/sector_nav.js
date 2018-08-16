/**
 * Created by admin on 2018/8/15.
 */
$(function () {
    var itemNum = 5;//定义子菜单数量
    var radius = 220;//定义扩散半径的长度
    var time = 0.4
    //home
    var $home = $("#wrap .home");
    //    所有的子菜单
    var $img_mods = $("#wrap .inner .img_mod");
    var flag = true;

    //子菜单数、当前子菜的索引半径距离，返回坐标对象
    var getPosition = function (itemNum, index, radius) {
        var deg = 90 / (itemNum - 1);//计算每个子菜单的夹角
        var x = radius * Math.sin((deg * index) * Math.PI / 180);//计算X
        var y = radius * Math.cos((deg * index) * Math.PI / 180);//计算Y
        return {left: x, top: y};
    }


    //定义过度动画完成时需要调用的动画
    var transitionEnd = function () {
        $(this).css({
            transition: "0s",
            transform: "scale(1) rotate(0deg)",
            opacity: 1,
        })
    }

    $img_mods.each(function () {
        //    为每个子菜单添加点击监听
        $(this).click(function () {
            //    点击时，将自己放大，然后在过度完成后，调用过度完成的事件
            $(this).css({
                transition: time + "s",
                transform: "scale(1.3)",
                opacity: 0,
            })
            //利用one方法为被点击的子菜单添加过度完成的监听事件
            $(this).one("transitionend", transitionEnd);
        })
    })

    $home.click(function () {
        if (flag) {
            //将子菜单发射出去
            $img_mods.each(function (index) {
                var position = getPosition(itemNum, index, radius);
                //修改每个子菜单的样式动画
                $(this).css({
                    transition: time + "s " + time / 10 * index + "s",
                    transform: "scale(1) rotate(720deg)",
                    left: -position.left,
                    top: -position.top,
                    opacity: 1
                })
            })

            // 将自己旋转
            $home.css({
                transition: time + "s",
                transform: "rotate(-360deg)"
            })
            $home.attr("title", "收起菜单")
        } else {
            //将子菜单收起来
            $img_mods.each(function (index) {
                $(this).css({
                    transition: time + "s " + time / 10 * (itemNum - index - 1) + "s",
                    transform: "scale(1) rotate(0deg)",
                    left: 0 + "px",
                    top: 0 + "px",
                    opacity: 1
                })
            })

            // 将自己旋转
            $home.css({
                transition: time + "s",
                transform: "rotate(0deg)"
            })
            $home.attr("title", "展开菜单");

        }
        flag = !flag;
    })

})