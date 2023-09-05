/**
 * 将json字符串转化为json对象,并过滤数据后返回
 * @function string2Json
 * @param string 待处理的json字符串
 * @param judge json对象的一个指定字段,用于判断
 * @param expect json对象中指定字段的值,配合judge字段进行对象的筛选
 */
function jsonStrJudger(string, judge, expect) {
    // json字符串为一组数据时
    let arrData = JSON.parse(string); 
    // 问题: 怎么判断传进来的一定是数组呢？执行后续(按照数组规则处理):(怎么解决?)
    arrData = arrData.filter(item=>{
        // 筛选成功后就回传
        return item[judge] === expect; 
    })
    return arrData;
}


module.exports = {
    jsonStrJudger
};