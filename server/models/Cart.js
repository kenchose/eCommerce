module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {}; // items; object gives flexibility to assign a new or existing value
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //add item to existing cart
  this.add = function (item, id, qty) {
    // change data type of qty string to number
    let itemQty = Number(qty)
    let storedItem = this.items[id]; //check if object item, by using its id, already exist
    //checks if item has already been added to cart and if not then create new producted added
    if (!storedItem) {
      let newItem = this.items[id] = {
        item: item,
        qty: itemQty,
        price: 0
      }
      newItem.price = newItem.item.price * newItem.qty;
      this.totalQty += newItem.qty;
      this.totalPrice += newItem.price;
    }
    if (storedItem) {
      storedItem.price += (storedItem.item.price * itemQty);
      storedItem.qty += itemQty
      this.totalQty += itemQty;
      this.totalPrice += storedItem.price;
    }
  };

  this.remove = function (id, qty) {
    this.totalQty = this.items[id].qty * qty;
    this.totalPrice -= this.items[id].price * qty;
    // this.totalQty -= this.items[id].qty;
    // this.totalPrice -= this.items[id].price;
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
