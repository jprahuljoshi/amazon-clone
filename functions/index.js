const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")
    ("sk_test_51InjqFSDSuq4vy75yRyZjCD3UdHw75ku07lJuDM2zVqzEoBck7tAoKYrTyOitUDopE3f14YTEpsfGJhxMjAR2WEp00iILETopc")

//API

// - App Config
const app = express()

// - Middleware
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total

    //console.log("Payment request recieved BOOM!! for this amount >>>", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "inr",
    })

    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen command
exports.api = functions.https.onRequest(app)

//API Endpoint
//http://localhost:5001/cloneamazn-908d1/us-central1/api