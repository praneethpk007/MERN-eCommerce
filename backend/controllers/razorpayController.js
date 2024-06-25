// backend/controllers/razorpayController.js
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in smallest currency unit
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  console.log(generated_signature, razorpay_signature);

  if (generated_signature === razorpay_signature) {
    res.status(200).send({message: "Payment successful"});
  } else {
    res.status(400).send({message: "Payment verification failed"});
  }
};

export { createOrder, verifyPayment };
