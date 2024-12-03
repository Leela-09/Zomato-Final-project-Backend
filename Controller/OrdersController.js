const OrdersModel = require('../Model/OrdersModel');

// module.exports.saveNewOrder = (request,response) => {
//     var newOrder = request.body;
//     response.send({
//         status : true,
//         newOrder,
//     })
// }

module.exports.saveNewOrder = async (request, response) => {
    try {
        // Extract data from the request body
      var data = request.body; // Use request.body to get the incoming data

        // Create an instance of the OrdersModel with the received data
        const newOrder = new OrdersModel({
            order_id: data.order_id,
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            order_list: data.order_list,
            payment_id: data.payment_id,
            payment_Status: data.payment_Status, // Fixed the key name to match the request body
        });

        // Save the new order to the database
        await newOrder.save();
         response.status(200).send({
            status: true,
            message:"order place successfully",
        });
    } catch (error) {
        response.status(500).send({
        status: false,
        message: "Invalid id is passed", // Generalized error message
        error: error.message,
        });
    }
};


