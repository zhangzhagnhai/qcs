/**
 * Created by Administrator on 2017/7/26.
 */
var host='http://laravel.hcsoo.com/api';
//host='https://www.hcsoo.com/api'
 //host='http://192.168.1.108:8081/api'
//host='http://192.168.1.117:8081/api'
var shareHref='https://www.hcsoo.com/mp/index.html'
var strToJson=function(str){
  var json = eval('(' + str + ')');
  return json;
}
//http://laravel.hcsoo.com/api/wx/wxApi
var toPrice=function(str){
  return str
}
export {host,shareHref,strToJson,toPrice}

