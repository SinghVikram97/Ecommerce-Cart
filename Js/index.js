let mainObj=[];
let orders=[];
let cartIcon;
let cartNumber;

window.onload=function () {

    // Check if any data left on local storage
    refreshOrders(true);

    // let addBtn=$(".plus");
    // let minusBtn=$(".minus");
    // addBtn.click(function () {
    //     let spanElement=$($(this).prev());
    //     let spanNum=spanElement.html();
    //     let name=$($(this)).prev().prev().prev().prev();
    //     let price=$($(this)).prev().prev().prev();
    //     addOrder(parseInt(spanNum),name.html(),price.html());
    // })
    // minusBtn.click(function () {
    //     let spanElement=$($(this).next());
    //     let spanNum=spanElement.html();
    //     let name=$($(this)).prev().prev();
    //     let price=$($(this)).prev();
    //     removeOrder(parseInt(spanNum),name.html(),price.html());
    // })
};
function refreshOrders(firstTime=false) {

     // First time load is same as refresh
    // Update orders array from local storage
    if(!firstTime)
    {
        getFromLocal();
    }
    else
    {
         // If anything stored in local storage
        let savedOrders=localStorage.getItem("mainObj");
        if(savedOrders)
        {
            getFromLocal();
        }
        else
        {
            orders=[{
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
            cartIcon=$("#number");
            cartNumber=cartIcon.html();
            cartNumber=parseInt(cartNumber);
            pushToLocal();
            getFromLocal();
        }
    }
    cartIcon=$("#number");
    cartIcon.html(parseInt(cartNumber));

    // Get div row one and div row two
    let divRowOne=$("#firstRow");
    let divRowTwo=$("#secondRow");

    // Empty them
    divRowOne.empty();
    divRowTwo.empty();

    // Now re render according to updated orders array
    for(i in orders)
    {
        if(i>2)
        {
            let item=createOrder(+i);
            divRowTwo.append(item);
        }
        else
        {
            let item=createOrder(+i);
            divRowOne.append(item);
        }
    }
}
function addOrder(num,name,price) {

    for(i in orders)
    {
        if(orders[i].name===name)
        {
            orders[i].quantity=orders[i].quantity+1;
        }
    }
    cartNumber=cartNumber+1;
    pushToLocal();
    refreshOrders();
}
function removeOrder(num,name,price) {

    for(i in orders)
    {
        if(orders[i].name===name)
        {
            if(orders[i].quantity!=0)
            {
                orders[i].quantity=orders[i].quantity-1;
                cartNumber=cartNumber-1;
            }
        }
    }
    pushToLocal();
    refreshOrders();
}
function pushToLocal() {
    mainObj=[orders,cartNumber];
    localStorage.setItem("mainObj",JSON.stringify(mainObj));
}
function getFromLocal() {
    let savedOrders=localStorage.getItem("mainObj");
    if(savedOrders)
    {
        savedOrders=JSON.parse(savedOrders);
        orders=savedOrders[0];
        cartNumber=savedOrders[1];
    }
}
function createOrder(i) {

    let divCol=$("<div class='col'></div>");
    let divCard=$("<div class='card text-center' style='width: 18rem'></div>");
    let img=$("<img class='card-img-top mx-auto d-block mt-3' src='1.jpg' style='width: 100px'>");
    let cardBody=$("<div class='card-body'></div>");
    let heading=$("<h5 class='card-title'>"+orders[i].name+"</h5>");
    let p=$("<p class='card-text'>"+"₹"+orders[i].price+"</p>");
    let minusIcon=$("<i class='fa fa-minus-square bg-primary minus'></i>").click(function () {
        let spanElement=$($(this).next());
        let spanNum=spanElement.html();
        let name=$($(this)).prev().prev();
        let price=$($(this)).prev();
        removeOrder(parseInt(spanNum),name.html(),price.html());
    });
    let span=$("<span> "+orders[i].quantity+" </span>");
    let plusIcon=$("<i class='fa fa-plus-square bg-primary plus'></i>").click(function () {
        let spanElement=$($(this).prev());
        let spanNum=spanElement.html();
        let name=$($(this)).prev().prev().prev().prev();
        let price=$($(this)).prev().prev().prev();
        addOrder(parseInt(spanNum),name.html(),price.html());
    });

    cardBody.append(heading);
    cardBody.append(p);
    cardBody.append(minusIcon);
    cardBody.append(span);
    cardBody.append(plusIcon);

    divCard.append(img);
    divCard.append(cardBody);

    divCol.append(divCard);

    return divCol;
}