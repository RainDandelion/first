//定义方法，
const sum = function(a,b){
    return parseInt(a) + parseInt(b)
}
const sub = function(a,b){
    return parseInt(a) - parseInt(b)
}
//设置哪些方法可以被表用
module.exports = {
 sum,
 sub   
}