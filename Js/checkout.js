let cartNumCheck;
let ordersCheck=[];
let mainObjCheck=[];
let cartIconCheck;
window.onload=function () {
    reRender(true);
};
function increaseOne(name,quantity,price) {

    for(i in ordersCheck)
    {
        if(ordersCheck[i].name==name)
        {
           ordersCheck[i].quantity=ordersCheck[i].quantity+1;
           cartNumCheck=cartNumCheck+1;
        }
    }
    pushToLocalCheck();
    reRender();
}
function decreaseOne(name,quantity,price) {
   for(i in ordersCheck)
   {
       if(ordersCheck[i].name==name)
       {
           if(ordersCheck[i].quantity!=0)
           {
               ordersCheck[i].quantity=ordersCheck[i].quantity-1;
               cartNumCheck=cartNumCheck-1;
           }
       }
   }
   pushToLocalCheck();
   reRender();
}
function remove(name,quantity,price){
   for(i in ordersCheck)
   {
       if(ordersCheck[i].name==name)
       {
           cartNumCheck=cartNumCheck-ordersCheck[i].quantity;
           ordersCheck[i].quantity=0;
       }
   }
   pushToLocalCheck();
   reRender();
}
function  reRender(firstTime=false) {
    if(!firstTime)
    {
        getFromLocalCheck();
    }
    else
    {
        // Check if anything saved on local storage
        let savedOrdersCheck=localStorage.getItem("mainObj");
        if(savedOrdersCheck)
        {
            getFromLocalCheck();
        }
        else
        {
            ordersCheck=[{
                name:"OnePlus 5T",
                price:32999,
                quantity:0
            },
                {
                    name:"Iphone X",
                    price:70000,
                    quantity:0
                },
                {
                    name:"Samsung Galaxy S9",
                    price:32999,
                    quantity:0
                },
                {
                    name:"Motorola G5",
                    price:15000,
                    quantity:0
                },
                {
                    name:"Xiaomi Redmi",
                    price:20000,
                    quantity:0
                },
                {
                    name:"Nokia 1100",
                    price:1000,
                    quantity:0
                }
            ];
            cartNumCheck=0;
            pushToLocalCheck();
            getFromLocalCheck();
        }
    }
    cartIconCheck=$("#number");
    cartIconCheck.html(cartNumCheck);

    let mainContain=$("#main");
    mainContain.empty();
    let totalPrice=0;
    for(i in ordersCheck)
    {
        if(ordersCheck[i].quantity!=0)
        {
            let appendCol=createCols(i);
            mainContain.append(appendCol);
        }
        totalPrice=totalPrice+(ordersCheck[i].quantity*ordersCheck[i].price);
    }
    let lineBreak=$("<hr>");
    let totalRow=$("<div class='row'></div>");
    let totalCol=$("<div class='col offset-8'></div>");
    let heading=$("<h5>"+"₹"+totalPrice+"</h5>");

    totalCol.append(heading);
    totalRow.append(totalCol);

    mainContain.append(lineBreak);
    mainContain.append(totalRow);
}
function pushToLocalCheck() {
    mainObjCheck=[ordersCheck,cartNumCheck];
    localStorage.setItem("mainObj",JSON.stringify(mainObjCheck));
}
function getFromLocalCheck() {
    let savedOrders=localStorage.getItem("mainObj");
    if(savedOrders)
    {
        savedOrders=JSON.parse(savedOrders);
        ordersCheck=savedOrders[0];
        cartNumCheck=savedOrders[1];
    }
}
function createCols(i) {
    let mainDiv=$("<div class='row mb-5'></div>");

    let divCol1=$("<div class='col-2 offset-2 mr-5'></div>");
    let divCol2=$("<div class='col-2 mr-4'></div>");
    let divCol3=$("<div class='col-2'></div>");
    let divCol4=$("<div class='col-2'></div>");

    let img=$("<img src='1.jpg' style='width: 150px'>");

    let h5=$("<h5 class='text-center name'>"+ordersCheck[i].name+"<br>"+"₹"+ordersCheck[i].price+"</h5>");

    let minus=$("<i class='fa fa-minus-square bg-dark minus'></i>").click(function () {
        decreaseOne(ordersCheck[i].name,ordersCheck[i].quantity,ordersCheck[i].price);
    });
    let span=$("<span class='spanNum'>"+ordersCheck[i].quantity+"</span>");
    let plus=$("<i class='fa fa-plus-square bg-dark plus'></i>").click(function () {
          increaseOne(ordersCheck[i].name,ordersCheck[i].quantity,ordersCheck[i].price);
    });

    let cross=$("<i class='fa fa-times cross'></i>").click(function () {
        remove(ordersCheck[i].name,ordersCheck[i].quantity,ordersCheck[i].price);
    });

    divCol1.append(img);
    divCol2.append(h5);
    divCol3.append(minus);
    divCol3.append(span);
    divCol3.append(plus);
    divCol4.append(cross);

    mainDiv.append(divCol1);
    mainDiv.append(divCol2);
    mainDiv.append(divCol3);
    mainDiv.append(divCol4);

    return mainDiv;
}