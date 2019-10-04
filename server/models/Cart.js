module.exports = function Cart(oldCart) {
  this.item = oldCart.items || 0;
  this.totalQty = oldCCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  //add item to existing cart
  this.add = (item, id) => {
    let storeItem = this.item[id];
    //checks if item has already been added to cart
    if (!storeItem) {
      storeItem = this.item[id] = {
        item: item,
        qty: 0,
        price: 0
      };
    }
    //if item is added then we add new qty and price
    storeItem.qty++;
    storeItem.price = storeItem.item.price * storeItem.qty;
    this.totalqty++;
    this.totalPrice += storeItem.item.price;
  };

  //create array of items in the cart
  this.generateArray = () => {
    let arr = [];
    for (let id in this.item) {
      arr.push(this.item[id]);
    }
    return arr;
  };
};
