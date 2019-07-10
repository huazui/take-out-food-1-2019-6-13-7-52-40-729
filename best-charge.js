
promotion=[{
  type: '满30减6元'
}, {
  type: '指定菜品半价',
  items: ['ITEM0001', 'ITEM0022']
}];
allItem=[{
  id: 'ITEM0001',
  name: '黄焖鸡',
  price: 18.00
}, {
  id: 'ITEM0013',
  name: '肉夹馍',
  price: 6.00
}, {
  id: 'ITEM0022',
  name: '凉皮',
  price: 8.00
}, {
  id: 'ITEM0030',
  name: '冰锋',
  price: 2.00
}];
//用了大概要一个小时，一开始觉得题目不难掉以轻心，没有发现输入有空格，然后顺便就和同学讨论了下，然后顺带试了各种字符串分割的方法，不小心忘记时间
//函数主要是返回一个对象数组，对象里面储存用户订单的各种信息
function getMyItem(inputItem){
  let result=[];
  inputItem.filter((number)=>{
      let information=number.split(' x ');
    itemId=information[0];
      let itemCount=information[1];
      allItem.filter((inNumber)=>{
        if(inNumber.id==itemId){
          result.push({"id":itemId,"name":inNumber.name,"price":inNumber.price,"count":itemCount,"promotion":1});
        }
      });
    });
return result;
}
//用了三分钟左右，比想象块很多，可能因为今天下午不能用for循环将自己绕进去了，有点害怕写遍历。
//将是否有半价优惠的信息储存在订单里。
function getPromotionPrice(inputItem){
  let myItem=getMyItem(inputItem);
  promotionItem=loadPromotions()[1].items;
  let result=myItem.map((number)=>{
    promotionItem.filter((inNumber)=>{
      if(number.id==inNumber){
        number.promotion=0.5;
      }
  });
  return number;
  });
  return result;
}
//用了58分钟些加调试，调试格式用了28分钟。这个函数我写的不好，一开始想要用两个函数来表示的，最后发现打印的时候要打印优惠的项目，给传参格式统一造成了麻烦，所以暂且先合在一起，明天有时间会重新改下。
//函数前半部分是得到订单在两种优惠下的信息数组和一个储存订单半价项目的数组。
//后半部分是结合信息数组和半价项目，打印出来字符串。
function bestCharge(inputItem) {
  myItem=getPromotionPrice(inputItem);
  promotionSum=[{"promotionItem":"满30减6元","value":0,"sum":0,"lessMoney":6},{"promotionItem":"指定菜品半价","value":0,"sum":0,"lessMoney":0}];
  promotion=[];
  myItem.filter((number)=>{
    promotionSum[0].sum+=parseFloat(number.price*number.count);
    promotionSum[1].sum+=parseFloat(number.price*number.count*number.promotion);
    if(number.promotion<1){
      promotion.push(number.name);
    }
  });
  let long=promotion.length;
  if(long==0){
    if(promotionSum.sum>=30){
      promotionSum[0].value=1;
      promotionSum.sum=promotionSum.sum-6;
    }
  }
  else if(long>0){

    if((promotionSum[0].sum<30)||(promotionSum[0].sum>(promotionSum[1].sum+6))){
      promotionSum[1].value=1;
      promotionSum[1].lessMoney=promotionSum[0].sum-promotionSum[1].sum;
  }
  else promotionSum[0].value=1;
  promotionSum[0].sum=promotionSum[0].sum-6;
    
  }
 
  let result=`============= 订餐明细 =============\n`
  myItem.filter((number)=>{
    result=`${result}${number.name} x ${number.count} = ${number.price*number.count}元\n`
  });
  result=`${result}-----------------------------------\n`
  if(promotionSum[0].value==1){
    result=`${result}使用优惠:\n满30减6元，省6元\n-----------------------------------\n总计：${promotionSum[0].sum}元\n===================================`
  }
  else if(promotionSum[1].value==1){
    result=`${result}使用优惠:\n指定菜品半价(`;
    result=`${result}${promotion.join('，')}`
    
    result=`${result})，省${promotionSum[1].lessMoney}元\n-----------------------------------\n总计：${promotionSum[1].sum}元\n===================================`
  }
else result=`${result}总计：${promotionSum[0].sum}元\n===================================`
return result;
}
