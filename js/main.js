// Decleration
let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.querySelector(".total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let mood="Create";
let ID;
// get total
function gettotal(){
    let result=0;
    if(price.value != ''){
        result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML=''
        total.style.background='#a90000'
    }
}
// add items

let datapro;

if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product);
}
else{
    datapro = [];
}

submit.onclick = function(){
    event.preventDefault();
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value!='' &&category.value!='' && count.value < 100){
        if(mood==='Create'){
            if(count.value > 1){
                for(let i=0;i<count.value;i++){
                    datapro.push(newpro);
                }
            }
            else{
                datapro.push(newpro);
            }
        }
        else{
            datapro[ID]=newpro;
            mood='Create';
            submit.innerHTML='Create'
            count.style.display='block'
        }
        localStorage.setItem("product",JSON.stringify(datapro));
        clear();
    }
    read();
}

// clear inputs
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}




// read data
let num=document.getElementById("sp");
let Tnum;
function read(){
    gettotal();
    let table='';
    for(let i = 0; i < datapro.length; i++){
        table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button class="btn" onclick="updatepro(${i})">Update</button></td>
                    <td><button class="btn" onclick="deletepro(${i})">Delete</button></td>
                </tr>
            `
    }
    document.getElementById('tbody').innerHTML=table;
    let deleteAll=document.getElementById("deleteall")
    if(datapro.length > 0){ 
        deleteAll.style.display="block"
        for(let i=0;i<datapro.length;i++){
            Tnum=i
        }
        num.innerHTML=`(${Tnum+1})`;
    }
    else{
        deleteAll.style.display="none"
    }
}
read()

// delete product
function deletepro(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    read()
}

//delete all
function deleteall(){
    localStorage.clear();
    datapro.splice(0)
    read()
}

//update product
function updatepro(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    count.style.display="none"
    submit.innerHTML="Update"
    gettotal()
    ID=i;
    mood='Update';
}

//search type
let search=document.getElementById('search')
let searchmood='Title';
function searchtype(id){
    if(id=='searchbytitle'){
        searchmood='Title';
    }else{
        searchmood='Category'
    }
    search.placeholder='Search By '+searchmood;
    search.focus();
    search.value='';
    read()
}


//search process
function searchprocess(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
        if(searchmood=='Title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button class="btn" onclick="updatepro(${i})">Update</button></td>
                        <td><button class="btn" onclick="deletepro(${i})">Delete</button></td>
                    </tr>
                `
            }
        }
        if(searchmood=='Category'){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button class="btn" onclick="updatepro(${i})">Update</button></td>
                        <td><button class="btn" onclick="deletepro(${i})">Delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}