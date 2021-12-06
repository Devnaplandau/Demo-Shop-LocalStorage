function createIds(){
  var id = '';

  // lấy milisecond ở time hiện tại  1s = 1000milisecond;
  id = String(new Date().getTime())
  return id;
}
createIds();