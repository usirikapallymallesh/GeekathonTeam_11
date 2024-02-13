const div=document.createElement("div");
  div.classList.add("abcd");

document.getElementById("review-button").addEventListener("click", ()=> {
  
  
  
  
    //top and main worke

    let priceValue=0;
    const textRate=document.getElementById("text-rate");
    const discountRate=document.getElementById("discount-rate");



    var invoiceNumber=document.getElementById("invoice-number").value;
    var invoiceTo=document.getElementById("invoice-to").value;
    var emailTo=document.getElementById("email-address-to").value;
    var addressTo=document.getElementById("address-to").value;
    var invoiceFrom=document.getElementById("invoice-from").value;
    var emailFrom=document.getElementById("email-address-from").value;
    var addressFrom=document.getElementById("address-from").value;
    var dueDate=document.getElementById("due-date").value;
    console.log(addressTo);
    const  invoiceCreate=document.getElementById("clike-div");
    
    
      const bivlast=document.querySelector(".bivlast");
       bivlast.style.visibility= "visible";
  
    const from=document.createElement('span');
    const amountDue=document.createElement('span');
    const topDiv=document.createElement('div');
    topDiv.classList.add("topDiv");
    from.innerText=`${invoiceFrom} \n Invoce #:${invoiceNumber}`;
    const totalValue=document.getElementById("total-value");
    const subtotalvalue=document.getElementById("total-value");
    


    
    
    console.log(subtotalvalue.innerText);
    

    amountDue.innerText=`Amount Due ${subtotalvalue.innerText}`

    const midDiv=document.createElement('div');
    midDiv.classList.add("midDiv");
    const billedTo=document.createElement('div');
    const billedFrom=document.createElement('div');
    const DateOfIssue=document.createElement('div');

    billedTo.innerText=`Billed to:\n ${invoiceTo} \n ${addressTo}\n${emailTo}`;
    billedFrom.innerText=`Billed from:\n ${invoiceFrom} \n ${addressFrom}\n${emailFrom}`;
    DateOfIssue.innerText=`Date Of Issue:\n ${dueDate} `
    midDiv.append(billedTo,billedFrom,DateOfIssue);

    
    topDiv.append(from , amountDue);
    //bottom worke
    const list=document.createElement("table");
    list.classList.add("table")
    const listHeder=document.createElement("tr");
    listHeder.classList.add("listHeder")
    const qtyHeder=document.createElement("td");
    qtyHeder.classList.add("qtyHeder")
    const nmaeHeder=document.createElement("td");
    nmaeHeder.classList.add("nmaeHeder")
    const priceHeder=document.createElement("td");
    priceHeder.classList.add("priceHeder")
    const amountHeder=document.createElement("td");
    amountHeder.classList.add("amountHeder")
    qtyHeder.innerText=`QTY`;
    nmaeHeder.innerText=`DESCRIPTION`;
    priceHeder.innerText=`PRICE`;
    amountHeder.innerText=`AMOUNT`;
    listHeder.append(qtyHeder,nmaeHeder,priceHeder,amountHeder);
    list.append(listHeder);
    




    

    const itemNmae = document.querySelectorAll(".item-name");
    
    const itemDescription = document.querySelectorAll(".item-description");
    const qty = document.querySelectorAll(".qty");
    
    
    const price = document.querySelectorAll(".price");
    for(let i=0;i<itemNmae.length;i++){
      let  lists=document.createElement("tr");

      lists.classList.add("lists")
      let  qtys=document.createElement("td");
      let  fullname=document.createElement("td");
      let  prices=document.createElement("td");
      let  amounts=document.createElement("td");
      qtys.innerText=`${qty[i].value}`;
      fullname.innerText=`${itemNmae[i].value}-${itemDescription[i].value}`;
      prices.innerText=`${currency}${price[i].value}`;
      amounts.innerText=`${currency}${price[i].value}`;
      lists.append(qtys,fullname,prices,amounts);
      list.append(lists);
     




    }
    //
  

    const bottomDiv=document.createElement("div");
    bottomDiv.classList.add("total");
    
    for(let i=0;i<price.length;i++){
      priceValue+=parseFloat(price[i].value) *parseFloat(qty[i].value);

    }
    


    const subtotalDiv=document.createElement("div");
    subtotalDiv.classList.add("clculation");
    const subtotalValue=document.getElementById("subtotal-value");
    const subtotalhading=document.createElement("h4");
    subtotalhading.innerText=`Subtotal:`;
    const subtotaltotal=document.createElement("p");
    subtotaltotal.innerText=`${currency}${priceValue}  
    `;
   
    subtotalDiv.append(subtotalhading,subtotaltotal);
    bottomDiv.append(subtotalDiv);
    if(discountRate.value>1){
      const discountDiv=document.createElement("div");

    discountDiv.classList.add("clculation");
    
    const discounthading=document.createElement("h4");
    discounthading.innerText=`Discount:`;
    const discounttotal=document.createElement("p");
    discounttotal.innerText=`(${discountRate.value}%)${currency} ${(priceValue*discountRate.value)/100}`;
    discountDiv.append(discounthading,discounttotal);
    bottomDiv.append(discountDiv);
    


    }
    
    if(textRate.value>1){
      const discountDiv=document.createElement("div");

    discountDiv.classList.add("clculation");
    
    const discounthading=document.createElement("h4");
    discounthading.innerText=`Tax rate:`;
    const discounttotal=document.createElement("p");
    discounttotal.innerText=`(${textRate.value}%) ${currency} ${(priceValue*textRate.value)/100}`;
    discountDiv.append(discounthading,discounttotal);
    bottomDiv.append(discountDiv);
    


    }
    const totalDiv=document.createElement("div");
    

   totalDiv.classList.add("clculation");
    
    const totalhading=document.createElement("h4");
    totalhading.innerText=`Total:`;
    const totaltotal=document.createElement("p");
    totaltotal.innerText=` ${currency} ${priceValue+((priceValue*textRate.value)/100)-((priceValue*discountRate.value)/100)} `;
    totalDiv.append(totalhading,totaltotal);
    bottomDiv.append(totalDiv);
    invoiceCreate.append(topDiv ,midDiv,list,bottomDiv);
    
  }


  );


  
  document.getElementById("add-btn").addEventListener("click",(e)=>{
    e.preventDefault();

   
    
    var table=document.getElementById("item-list");
    console.log(table);
    var tr=document.createElement("tr");
    tr.classList.add("tr");
    var itemNameDescription=document.createElement("td");
    itemNameDescription.classList.add("item-name-description")
    var  itemName=document.createElement("input");
    itemName.placeholder="Item name";
    itemName.classList.add("item-name");
    var itemDescription =document.createElement("input");
    itemDescription.placeholder="Item description";
    itemDescription.classList.add("item-description");
    var itemQty=document.createElement("td");
    var inputQty =document.createElement("input");
    inputQty.value="1";
    inputQty.min="1";
    itemQty.append(inputQty);
    inputQty.classList.add("qty");
    var itemprice=document.createElement("td");
    var inputPrice =document.createElement("input");
    inputPrice.value="1.00";
    inputPrice.min="1.00";
    itemprice.append(inputPrice);
    inputPrice.classList.add("price");
    const delet=document.createElement("td");
    var deletBut=document.createElement("button");
    deletBut.classList.add("btn2")
    deletBut.innerHTML=`<span class="material-symbols-outlined">
    delete
    </span>`;
    
    delet.append(deletBut);
    itemNameDescription.append(itemName,itemDescription);
    tr.append(itemNameDescription,itemQty,itemprice,delet);

    table.appendChild(tr);
    




    const totalValue=document.getElementById("total-value");

  const taxValue=document.getElementById("tax-value");
  const discountValue=document.getElementById("discount-value");
  let totalSum=0;
  let value=0;
  var currency="$";
  let subtotalValue=document.getElementById("subtotal-value");

  let textRate=document.getElementById("text-rate");
  console.log(textRate.value);
  textRate.addEventListener("input",()=>{
   
   taxValue.innerText=`(${textRate.value}% ${currency} ${value*textRate.value/100})`
   
   
 
  });
  let discountRate=document.getElementById("discount-rate");
 discountRate.addEventListener("input",()=>{
   
   discountValue.innerText=`(${discountRate.value}% ${currency} ${value*discountRate.value/100})`;
   
 
  });
  
    const qty = document.querySelectorAll(".qty");
  const price = document.querySelectorAll(".price");
 for(let i=0;i<qty.length;i++){
  
  totalSum+=parseFloat(qty[i].value )*parseFloat (price[i].value);
  value=totalSum;
  console.log(totalSum);
  subtotalValue.innerText=`${currency} ${totalSum}`;

  
 }
 
 for(let i=0;i<qty.length;i++){
  
qty[i].addEventListener("input",()=>{
let subtotalValue=document.getElementById("subtotal-value");
totalSum=0;
for(let i=0;i<qty.length;i++){
  
totalSum+=qty[i].value * price[i].value;
console.log(totalSum);
subtotalValue.innerText=`${currency} ${totalSum}`;
taxValue.innerText=`(${textRate.value}% ${currency}  ${(totalSum *textRate.value)/100})`;
  discountValue.innerText=`(${discountRate.value}% ${currency} ${totalSum *discountRate.value/100})`;

  if(textRate.value==0 && discountRate.value==0 ){
    totalValue.innerText=`${currency}${totalSum}`
  }
  else if(textRate.value>0 && discountRate.value==0 ){
    totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)}`
  }
  else if(textRate.value==0 && discountRate.value>0 ){
    totalValue.innerText=`${currency}${totalSum+((totalSum *discountRate.value)/100)}`
  }
  else{
  totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)-((totalSum *discountRate.value)/100)}`}
 
}
value=totalSum;

})
totalSum=0
};


for(let i=0;i<qty.length;i++){
  
price[i].addEventListener("input",()=>{
let subtotalValue=document.getElementById("subtotal-value");
totalSum=0;
for(let i=0;i<qty.length;i++){
  
totalSum+=qty[i].value * price[i].value;
console.log(totalSum);
subtotalValue.innerText=`${currency} ${totalSum}`;
taxValue.innerText=`(${textRate.value}% ${currency}  ${(totalSum *textRate.value)/100})`;
discountValue.innerText=`(${discountRate.value}% ${currency} ${totalSum *discountRate.value/100})`;
if(textRate.value==0 && discountRate.value==0 ){
  totalValue.innerText=`${currency}${totalSum}`
}
else if(textRate.value>0 && discountRate.value==0 ){
  totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)}`
}
else if(textRate.value==0 && discountRate.value>0 ){
  totalValue.innerText=`${currency}${totalSum+((totalSum *discountRate.value)/100)}`
}
else{
totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)-((totalSum *discountRate.value)/100)}`}
}
value=totalSum;

})
totalSum=0;
};



let currencyOption=document.querySelector(".currency-option");
console.log(currencyOption.value);


currencyOption.addEventListener("click" , ()=>{
  currency=`${currencyOption.value}`;
  console.log(currency);
  subtotalValue.innerText=`${currency}  ${value}`
  taxValue.innerText=`(${textRate.value}% ${currency}  ${(value*textRate.value)/100})`;
  discountValue.innerText=`(${discountRate.value}% ${currency} ${value*discountRate.value/100})`;
  totalValue.innerText=`${currency}${value+((value*textRate.value)/100)-((value*discountRate.value)/100)}`
  
});

delet.onclick = function(e) {
  console.log(totalSum)
  e.preventDefault()
  deleteDiv(tr);
};
function deleteDiv(div) {


  div.parentNode.removeChild(div);
  totalSum=0;
  const qt = document.querySelectorAll(".qty");
  const pric = document.querySelectorAll(".price");

  for(let i=0;i<qt.length;i++){
  
    qt[i].addEventListener("input",()=>{
    let subtotalValue=document.getElementById("subtotal-value");
    totalSum=0;
    for(let i=0;i<qt.length;i++){
      
    totalSum+=qt[i].value * price[i].value;
    console.log(totalSum);
    subtotalValue.innerText=`${currency} ${totalSum}`;
    taxValue.innerText=`(${textRate.value}% ${currency}  ${(totalSum *textRate.value)/100})`;
      discountValue.innerText=`(${discountRate.value}% ${currency} ${totalSum *discountRate.value/100})`;
      if(textRate.value==0 && discountRate.value==0 ){
        totalValue.innerText=`${currency}${totalSum}`
      }
      else if(textRate.value>0 && discountRate.value==0 ){
        totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)}`
      }
      else if(textRate.value==0 && discountRate.value>0 ){
        totalValue.innerText=`${currency}${totalSum+((totalSum *discountRate.value)/100)}`
      }
      else{
      totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)-((totalSum *discountRate.value)/100)}`}
    }
    value=totalSum;
    
    })
    totalSum=0
    };
    
    
    for(let i=0;i<qt.length;i++){
      
    pric[i].addEventListener("input",()=>{
    let subtotalValue=document.getElementById("subtotal-value");
    totalSum=0;
    for(let i=0;i<qty.length;i++){
      
    totalSum+=qty[i].value * price[i].value;
    console.log(totalSum);
    subtotalValue.innerText=`${currency} ${totalSum}`;
    taxValue.innerText=`(${textRate.value}% ${currency}  ${(totalSum *textRate.value)/100})`;
    discountValue.innerText=`(${discountRate.value}% ${currency} ${totalSum *discountRate.value/100})`;
    if(textRate.value==0 && discountRate.value==0 ){
      totalValue.innerText=`${currency}${totalSum}`
    }
    else if(textRate.value>0 && discountRate.value==0 ){
      totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)}`
    }
    else if(textRate.value==0 && discountRate.value>0 ){
      totalValue.innerText=`${currency}${totalSum+((totalSum *discountRate.value)/100)}`
    }
    else{
    totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)-((totalSum *discountRate.value)/100)}`}
    }
    value=totalSum;
    
    })
    totalSum=0;
    };

    discountRate.addEventListener("input",()=>{
   
      discountValue.innerText=`(${discountRate.value}% ${currency} ${value*discountRate.value/100})`;
      
    
     });
     
       const qty = document.querySelectorAll(".qty");
     const price = document.querySelectorAll(".price");
    for(let i=0;i<qty.length;i++){
     
     totalSum+=parseFloat(qty[i].value )*parseFloat (price[i].value);
     value=totalSum;
     console.log(totalSum);
     subtotalValue.innerText=`${currency} ${totalSum}`;
   
     
    }
  // Remove the div from the container
  
}





  });
  const totalValue=document.getElementById("total-value");

  const taxValue=document.getElementById("tax-value");
  const discountValue=document.getElementById("discount-value");
  let totalSum=1;
  let value=0;
  var currency="$";
  let subtotalValue=document.getElementById("subtotal-value");

  let textRate=document.getElementById("text-rate");
  textRate.addEventListener("input",()=>{
   
   taxValue.innerText=`(${textRate.value}% ${currency} ${value*textRate.value/100})`
   
   
 
  });
  let discountRate=document.getElementById("discount-rate");
 discountRate.addEventListener("input",()=>{
   
   discountValue.innerText=`(${discountRate.value}% ${currency} ${value*discountRate.value/100})`;
   
 
  });
  







  const qty = document.querySelectorAll(".qty");
  
  console.log(qty[0].value)
 
  const price = document.querySelectorAll(".price");
  
  
  for(let i=0;i<qty.length;i++){
    
qty[i].addEventListener("input",()=>{
  
  let subtotalValue=document.getElementById("subtotal-value");
  totalSum=0;
 for(let i=0;i<qty.length;i++){
  
  totalSum+=qty[i].value * price[i].value;
  console.log(totalSum);
  subtotalValue.innerText=`${currency}  ${totalSum}`;
  taxValue.innerText=`(${textRate.value}% ${currency}  ${(totalSum *textRate.value)/100})`;
  discountValue.innerText=`(${discountRate.value}% ${currency} ${totalSum *discountRate.value/100})`;
  if(textRate.value==0 && discountRate.value==0 ){
    totalValue.innerText=`${currency}${totalSum}`
  }
  else if(textRate.value>0 && discountRate.value==0 ){
    totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)}`
  }
  else if(textRate.value==0 && discountRate.value>0 ){
    totalValue.innerText=`${currency}${totalSum+((totalSum *discountRate.value)/100)}`
  }
  else{
  totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)-((totalSum *discountRate.value)/100)}`}
  
 }

value=totalSum;
 
 



})
totalSum=0;};

for(let i=0;i<qty.length;i++){
  
price[i].addEventListener("input",()=>{
  
let subtotalValue=document.getElementById("subtotal-value");
totalSum=0;
for(let i=0;i<qty.length;i++){
  
totalSum+=qty[i].value * price[i].value;
console.log(totalSum);



subtotalValue.innerText=`${currency}  ${ totalSum}`;
taxValue.innerText=`(${textRate.value}% ${currency}  ${(totalSum *textRate.value)/100})`;
discountValue.innerText=`(${discountRate.value}% ${currency} ${totalSum *discountRate.value/100})`;
if(textRate.value==0 && discountRate.value==0 ){
  totalValue.innerText=`${currency}${totalSum}`
}
else if(textRate.value>0 && discountRate.value==0 ){
  totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)}`
}
else if(textRate.value==0 && discountRate.value>0 ){
  totalValue.innerText=`${currency}${totalSum+((totalSum *discountRate.value)/100)}`
}
else{
totalValue.innerText=`${currency}${totalSum+((totalSum *textRate.value)/100)-((totalSum *discountRate.value)/100)}`}
}
value=totalSum;





})
totalSum=0};
let currencyOption=document.querySelector(".currency-option");
console.log(currencyOption.value);
currencyOption.addEventListener("click" , ()=>{
  currency=`${currencyOption.value}`;
  console.log(currency);
  subtotalValue.innerText=`${currency}  ${value}`
  taxValue.innerText=`(${textRate.value}% ${currency}  ${(value *textRate.value)/100})`;
  discountValue.innerText=`(${discountRate.value}% ${currency} ${value *discountRate.value/100})`;
  totalValue.innerText=`${currency}${value+((value*textRate.value)/100)-((value *discountRate.value)/100)}`
  
});

const clikeDiv=document.getElementById("clike-div");
 const bivlast=document.querySelector(".bivlast");
 let a=0
 if(a==1){
  window.location.reload();
}
 bivlast.addEventListener("click" ,(e)=>{
  a+=1;
  if(a==2){
    window.location.reload();
  }
  
  bivlast.style.visibility= "hidden";
  
  
  
     console.log(totalSum)
     console.log(a)
     deleteD(clikeDiv);
   
     
     
     
   
  
  

 });
 function deleteD(div) {
  // Remove the div from the container
  div.parentNode.removeChild(div);
  
  

}

 
window.onload=function(){
  document.getElementById("download").addEventListener("click",()=>{
     const clikeDiv=this.document.getElementById("clike-div");
     console.log(clikeDiv);
     console.log(window);
     html2pdf().from(clikeDiv).save();
     //window.location.reload();

  })
}

 