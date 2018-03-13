window.onload=function () {
       let plusBtn=$(".plus");
       let minusBtn=$(".minus");
       let mainCart=$("#number");
       plusBtn.click(function () {
           let spanNum=$($(this)).prev();
           let num=spanNum.html();
           spanNum.html(1+parseInt(num));
           let mainCartNum=mainCart.html();
           mainCart.html(1+parseInt(mainCartNum));
       })
       minusBtn.click(function () {
           let spanNum=$($(this)).next();
           let num=spanNum.html();
           if(num!=0)
           {
               spanNum.html(parseInt(num)-1);
           }
           let mainCartNum=mainCart.html();
           if(mainCartNum!=0)
           {
              mainCart.html(parseInt(mainCartNum)-1);
           }
       })
};