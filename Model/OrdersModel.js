//order_id
// name:String
// mobile:String
// email:String
// order_list:Array
// payment_id
// payment_Status:Boolean

//const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')

const OrdersSchema = new Schema({
    order_id: { type: String },
    name: { type: String },
    mobile: { type: Number },
    email: { type: String },
    order_list: { type: Array },
    payment_id: { type: String },
    payment_Status: { type: Boolean }
});

const OrdersModel = model('order', OrdersSchema, 'orders');

module.exports = OrdersModel;


