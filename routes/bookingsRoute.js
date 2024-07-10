const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  // "sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4"
  "sk_test_51PQAX1BgsXHqHj1ISB9vhXJKUuPe2dxFYP3cyJO0gJ5cetvQ7YCFrnmk3miGIeMGcOeB2tFZzIQGSrrgeu1mBoy100hji26K6A"
);

// router.post("/bookcar", async (req, res) => {
//   const { token } = req.body;
//   try {
//     // const customer = await stripe.customers.create({
//     //   email: token.email,
//     //   source: token.id,
//     // });

//     // const payment = await stripe.charges.create(
//     //   {
//     //     amount: req.body.totalAmount * 100,
//     //     currency: "inr",
//     //     customer: customer.id,
//     //     receipt_email: token.email
//     //   },
//     //   {
//     //     idempotencyKey: uuidv4(),
        
//     //   }
//     // );

//     // if (payment) {
//       req.body.transactionId = token.id;//payment.source.id;
//       const newbooking = new Booking(req.body);
//       await newbooking.save();
//       const car = await Car.findOne({ _id: req.body.car });
//       // console.log(req.body.car);
//       car.bookedTimeSlots.push(req.body.bookedTimeSlots);

//       await car.save();
//       res.send("Your booking is successful");
//     // } else {
//     //   return res.status(400).json(error);
//     // }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// });

axios.defaults.withCredentials = true;

// Function to book a car
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
     await axios.post("https://car-rental-app-aank.onrender.com/api/bookings/bookcar", reqObj, { withCredentials: true });

    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked successfully");
    setTimeout(() => {
      window.location.href='/userbookings'
    }, 500);

    
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};

router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;
