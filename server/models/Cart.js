module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {}; // items; object gives flexibility to assign a new or existing value
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //add item to existing cart
  this.add = function (item, id) {
    // change data type of qty string to number
    // let itemQty = Number(qty);
    let storedItem = this.items[id]; //check if object item, by using its id, already exist
    //checks if item has already been added to cart and if not then create new producted added
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    storedItem.qty++
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++
    this.totalPrice += storedItem.item.price;
  };

  this.remove = function (id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };

  //output a list by creating array of the object of items we have recieved from above and add to the cart
  this.generateArray = function () {
    let arr = [];
    for (let id in this.items) {
      arr.push(this.items[id]); //push the value of each item
    }
    return arr;
  };
};
