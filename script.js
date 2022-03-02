

let tablebody = document.querySelector("#mytable");
let arr = [];
let fetchapi = fetch("https://my-json-server.typicode.com/Ved-X/assignment/orders");
fetchapi.then(res => res.json()).then(data =>{
    for(let i=0;i<data.length;i++){
        let obj = data[i];
        let ar = [];
        ar = obj.date.split("/");
        if(parseInt(ar[0]) > 12){
            let temp = ar[0];
            ar[0] = ar[1];
            ar[1] = temp;
        }
        obj.date = ar.join("/");
        arr.push(obj);
    } 
    loaddatatotable(arr)
});

function loaddatatotable(data){
    tablebody.innerHTML = '';
    for(let i=0;i<data.length;i++){
        
        let item = data[i]
        let tr = document.createElement("tr");
        let order_id = item.order_id;
        let cum_name = item.customer;
        let country = item.country;
        let address = item.address;
        let product = item.product_title;
        let productdes = item.product_description;
        let dateoforder =item.date;
        let status = item.status;
        let content = `<tr>
            <td>${order_id}</td>
            <td>${cum_name}</td>
            <td>${country} \n<span>${address}</span></td>
            <td>${product}\n<span>${productdes}</span></td>
            <td>${dateoforder}</td>
            <td><p class="status">${status}</p></td>
            </tr>`;

        tablebody.innerHTML += content;
        
    }
            
    let statuscolor = document.querySelectorAll(".status");
    // add colors to status bases on status name
    statuscolor.forEach(ele => {
        if(ele.textContent == 'Completed'){
            ele.style.color = "green";
            ele.style.backgroundColor = "#98df92";
    }else if(ele.textContent == 'Delivered'){
            ele.style.color = "blue";
            ele.style.backgroundColor = "#bee0ec";
    }else if(ele.textContent == 'Prepared'){
        ele.style.color = "#fc8c30";
        ele.style.backgroundColor = "#f3d094";

    }else if(ele.textContent == 'Prepone'){
        ele.style.color = "#d84141";
        ele.style.backgroundColor = "#eeabab";
    }
    });
    document.getElementById("len").innerHTML = arr.length;
} 


// sort by order_id
function sortbyorderid(){
let icon = document.getElementById("icon");
    
        let order= icon.dataset.name;
        if(order == 'asc'){
            icon.dataset.name = 'desc';
            arr =  arr.sort((a,b) => {
                return b.order_id-a.order_id;
            });
            icon.classList.remove("fa-caret-down");
            icon.classList.add("fa-caret-up");
            
        }else{
            icon.dataset.name = 'asc';
            arr =  arr.sort((a,b) => {
            return a.order_id-b.order_id;
            });
            icon.classList.remove("fa-caret-up");
            icon.classList.add("fa-caret-down");
        }
        loaddatatotable(arr);
}

// sort using customer name
function sortbycustomer(){
    let icon = document.getElementById("iconcum");
        let order= icon.dataset.name;
        if(order == 'asc'){
        icon.dataset.name = 'dsc';
        arr =  arr.sort((a,b) => {
        if(a.customer > b.customer){
            return 1;
        } else{
            return -1;
        }
    });
    icon.classList.remove("fa-caret-up");
    icon.classList.add("fa-caret-down");
            
        }else{
            icon.dataset.name = 'asc';
            arr =  arr.sort((a,b) => {
            if(a.customer < b.customer){
            return 1;
            }else{
                return -1;
            }
            });
            icon.classList.remove("fa-caret-down");
            icon.classList.add("fa-caret-up");
        }
        loaddatatotable(arr);
}
            
        
// search by customer  
let input = document.getElementById("search");
input.addEventListener("keyup",()=>{
let  filter = input.value.toUpperCase();
let tr = tablebody.getElementsByTagName("tr");
for (i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[1];
if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
    } else {
        tr[i].style.display = "none";
}
}
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
 

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}


// sort by date latest
function datelatest() {
    document.getElementById("myDropdown").classList.remove("show");
    arr.sort((a,b) => {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA < dateB ? 1:-1;
        
    });
    loaddatatotable(arr);
}

// sort by date earliest
function dateearliest(){
    document.getElementById("myDropdown").classList.remove("show");
    arr.sort((a,b) => {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1:-1;
        
    });
    loaddatatotable(arr);
    
}


// filter based on status
let filterstatus = document.querySelectorAll(".filter-data button");

filterstatus.forEach(item => {
    item.addEventListener("click",()=>{
        document.getElementById("myDropdown").classList.remove("show");
        let newarr = [];
       if(item.textContent == 'Completed'){
           for(let i=0;i<arr.length;i++){
               if(arr[i].status == 'Completed'){
               let objs = arr[i];
                  newarr.push(objs);
               }
           }

          loaddatatotable(newarr);
          newarr.splice(0,newarr.length);

       }else if(item.textContent == 'Delivered'){
        for(let i=0;i<arr.length;i++){
               if(arr[i].status == 'Delivered'){
               let objs = arr[i];
                  newarr.push(objs);
               }
           }

          loaddatatotable(newarr);
          newarr.splice(0,newarr.length);
       } else if(item.textContent == "Prepared"){
        for(let i=0;i<arr.length;i++){
               if(arr[i].status == 'Prepared'){
               let objs = arr[i];
                  newarr.push(objs);
               }
           }

          loaddatatotable(newarr);
          newarr.splice(0,newarr.length);
       }else if(item.textContent == "Prepone"){
        for(let i=0;i<arr.length;i++){
               if(arr[i].status == 'Prepone'){
               let objs = arr[i];
                  newarr.push(objs);
               }
           }

          loaddatatotable(newarr);
          newarr.splice(0,newarr.length);
       }

    });
});