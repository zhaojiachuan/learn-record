
// 获取url中参数
export function getUrlParam (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    // reg = /(^|&)id=([^&]*)(&|$)/
    const r = window.location.hash.split("?")
    // 由于hash路由，则需要.hash方法在？后进行匹配
    const needurl = r[1].substr(1).match(reg);
    if (needurl != null) {
        // 解码操作
        return decodeURIComponent(needurl[2]);
    } else {
        return null;
    }
}