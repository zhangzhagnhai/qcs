/**
 * Created by Administrator on 2017/7/26.
 */
var host='http://laravel.hcsoo.com/api';
 //host='http://192.168.1.108:8081/api'
//host='http://192.168.1.117:8081/api'
var strToJson=function(str){
  var json = eval('(' + str + ')');
  return json;
}
//http://laravel.hcsoo.com/api/wx/wxApi

export {host,strToJson}

