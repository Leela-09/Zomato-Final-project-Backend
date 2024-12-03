const Razorpay = require('razorpay');

const KEY_ID = 'rzp_test_RB0WElnRLezVJ5';
const SECRET_ID = 'VLMCIrqKxRMNR9EcRcbL2UG8';

var instance = new Razorpay({key_id: KEY_ID, key_secret: SECRET_ID});

module.exports.genOrderId = (request, response) => {
    let { amount } = request.body;

    if (!amount || isNaN(amount)) {
        return response.status(400).send({ status: false, message: 'Invalid amount' });
    }

    var options = {
        amount: amount * 100, // Amount in paise
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    instance.orders.create(options, function(err, order) {
        if (err) {
            console.log('Razorpay error:', err);
            return response.status(500).send({ status: false, message: 'Error creating order' });
        } else {
            return response.status(200).send({ status: true, order });
        }
    });
};
