var keyStorageItemCart = "listItemCart";

// tạo ra đối tượng item giỏ hàng
// input: id và số lượng
// expected: item in cart
function createObjCart(id, quantity) {
  var itemCart = {};
  itemCart.id = id;
  itemCart.quantity = quantity;
  return itemCart;
}
// console.log(createObjCart(124, 20));

// lấy all item

// expected: danh sách all item giỏ hàng lưu trong localStorage
function getAllItemCarts() {
  let listItemCart = [];
  // b1. lấy json trong local
  var listJsonCart = localStorage.getItem(keyStorageItemCart);
  // b2. chuyển json qua list item giỏ hàng
  if (listJsonCart != null) {
    listItemCart = JSON.parse(listJsonCart);
  }
  return listItemCart;
}



// cart item

function convertItemCartObjectToHTML(data) {
    let sanpham = getProductIds(data)
    // cần có 1 cái hàm loop mảng item cart
    // for (var j = 0; j < data.length; j++){
    //   let save = data[j]
    // }
    // -----------------------------
    // let sanpham = getProductIds(data);
    var result = sanpham.map((item) => {
      var total = item.afterPrice() * item.quantity
      return ` <div class="item__cart">
        <div class="img">
          <img src="${item.img}" alt="">
        </div>
        <p class="name">${item.name}</p>
        <div class="price">
          <span class="originPrice">${item.price.toLocaleString()} VNĐ</span>
          <span class="buyPrice">${item.afterPrice().toLocaleString()} VNĐ</span>
        </div>
        <input type="number" name="" class="quantity" value="${item.quantity}">
        <p class="total">${total.toLocaleString()} đ</p>
        <div class="active">
          <i class="active-icon fa fa-trash" onclick="caculator(${item.id})"></i>
        </div>
       
      </div>`;
    });
    return result.join('');
}

// function convertListItemCartToHTML(listItemCart){
// }
function getProductIds(id) {
  let getListProduct = saveListProduct()
  var emp = []
  var result =  id.map((item)=>{
    var is = item.id;
    var are = item.quantity;
    var products = []
    for (var i = 0; i < getListProduct.length; i++){
          let currProduct = getListProduct[i];
          if (currProduct.id == is) {
             products = currProduct;
          }
        }
        products = product(
              products.img,
              products.name,
              products.price,
              products.percent,
              products.area,
              products.id,
              products.quantity = are
            );
       emp.push(products) 
  })
    return emp;
  // return result;
}
// hàm xử lí xóa item khỏi giỏ hàng



// hàm tính tổng tiền trong giỏ hàng 
function caculator(){

    var getItem = getAllItemCarts()
    if(getItem !=null){
    var handle = getProductIds(getItem)
    var result = handle.reduce((total, values)=>{
        return total+= (values.quantity * values.afterPrice())
    },0)
    return result.toLocaleString()
  }else{
    return 0;
  }
}
var nodeShow = document.querySelector('.total-all')
nodeShow.innerHTML = `${caculator()} VNĐ`
// caculator()


// từ id sản phẩm lấy lên đối tượng đầy đủ thuộc tính và hàm
// function getProductIds(id) {
//   var emp = [];
//   let products = new Object();
//   // load toàn bộ danh sách dưới localstorage lên = func savelistproduct
//   var listProduct = saveListProduct();
//   // tìm đối tượng có id = với id sản phẩm
//   for (var i = 0; i < listProduct.length; i++){
//     let currProduct = listProduct[i];
//     if (currProduct.id == id) {
//        products = currProduct;
//     }
//   }
//   products = product(
//     products.img,
//     products.name,
//     products.price,
//     products.percent,
//     products.area,
//     products.id
//   );
//    emp.push(products)
//   return emp;
//   // return products;
// }

