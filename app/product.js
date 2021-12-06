function product(img, name, price, percent, area, id, quantity) {
  // khởi tạo key/value đối tượng
  const sp = {};
  sp.img = img;
  sp.name = name;
  sp.price = price;
  sp.percent = percent;
  sp.area = area;
  sp.quantity = quantity;
  // create id
  if (id != null) {
    sp.id = id;
  } else {
    sp.id = createIds();
  }
  sp.afterPrice = function () {
    var giagiam = this.price * (1 - this.percent);
    return giagiam;
  };
  // convert js - > json
  sp.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };
  // convert json -> js
  sp.fromJson = function (data) {
    var data1 = JSON.parse(data);
    const jsObject = product(
      data1.img,
      data1.name,
      data1.price,
      data1.percent,
      data1.area
    );
    return jsObject;
  };
  // fake
  sp.convert = function (data) {
    const jsObject = product(
      data.img,
      data.name,
      data.price,
      data.percent,
      data.area,
      data.id
    );
    return jsObject;
  };
  // từ json List -> 1 list js đầy đủ method
  sp.fromJSONS = function (datalocal) {
    var listLocal = [];
    const listsp = JSON.parse(datalocal);
    for (var i = 0; i < listsp.length; i++) {
      const sanpham = listsp[i];
      const full = product(
        sanpham.img,
        sanpham.name,
        sanpham.price,
        sanpham.percent,
        sanpham.area,
        sanpham.id
      );
      listLocal[i] = full;
    }
    return listLocal;
  };
  return sp;
}
//
function render(data) {
  var htmls = "";
  var result = data.map((product) => {
    return `<div class="item">
    <div class="show-id">id sản phẩm: ${product.id}</div>
    <div class="item-thumb">
      <img src="${product.img}" alt="">
    </div>
    <div class="main-info">
    <p class="item-title">${product.name}</p>
    <div class="item-price">
      <span class="item-price-origin">Giá: ${product.price.toLocaleString()}đ</span>
      <span class="item-price-sale">Giá bán: ${product.afterPrice().toLocaleString()}đ</span>
    </div>
    <button class="btn btn-primary" onclick="addProduct(${product.id})">Đưa vào giỏ hàng</button>
  </div>
  </div>`;
  });
  var html = result.join('');
  return (htmls += html);
}
// phương thức duyệt theo từng id và lấy ra đúng sp theo id
function getElementByIds(id) {
  // b1. lấy danh sách toàn bộ đối tượng
  var listProducts = localStorage.getItem("listProduct");
  var listObj = JSON.parse(listProducts);

  // b2. duyệt và kt đối tượng
  for (var i = 0; i < listObj.length; i++) {
    var productCurr = listObj[i];
    if (productCurr.id == id) {
      return productCurr;
    } 
  }
}
function addProduct(ids) {
  alert(`Mã ID của sản phẩm là : ${ids}`);
  // b1. phân tích lưu trữ như thế nào. localstorage
  // giỏ hàng: lưu trữ item sản phẩm gồm :
  //        - tên sản phẩm -> get từ id --> lưu lại
  //          - số lượng
  // b2. xây dựng hàm xây dựng item giỏ hàng

  // b3. lấy d/s từ localStorage
  var listItemCartLocal = getAllItemCarts();
  // biến kiểm tra exist
  var existItemCart = false;
  for (var i = 0; i < listItemCartLocal.length; i++) {
    const currItemCart = listItemCartLocal[i];
    // nếu tồn tại thì tăng số lượng ++
    if (currItemCart.id === ids) {
      currItemCart.quantity++;
      existItemCart = true;
    }
  }
  // nếu sản phẩm tồn tại thì tăng giá trị, != thì mặc định = 1;
  // nếu k tồn tại item -> tạo ra object và add vào cart
  if (existItemCart == false) {
    const itemCart = createObjCart(ids, 1);
    listItemCartLocal.push(itemCart);
  }
  //b5. lưu trữ lại localStogare
  saveListCartItem(listItemCartLocal);
}

function saveListProduct() {
  let dataLog = localStorage.getItem('listProduct');
  var convertjs = JSON.parse(dataLog);
  return convertjs;
}
// lưu trữ d/s item giỏ hàng
// input: d/s
// expected: k cần, do chỉ lưu trữ
function saveListCartItem(listItemCart) {
  //b1. convert json
  var jsonItemCart = JSON.stringify(listItemCart);

  //b2. lưu vào localStorage
  localStorage.setItem(keyStorageItemCart, jsonItemCart);
}


