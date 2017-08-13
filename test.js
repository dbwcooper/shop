/**
 * Created by Administrator on 2017/7/3.
 */

var name = "test";

{
    //块级作用域
    //var name = "1230"; //下面输出的是 1230 外面输出为 1230 这里覆盖外面的name
    let name = "1231"; //下面输出的是1231 外面输出的是 test
    console.log(name);
}
console.log(name);