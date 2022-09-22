import express, { response } from 'express';
import * as dotenv from 'dotenv' 
dotenv.config()
import  bodyParser  from 'body-parser';
import cors from 'cors';
import Stripe from "stripe"
const stripe = new Stripe(process.env.KEY);
const app = express();
const YOUR_DOMAIN = "http://localhost:4200"
// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


// app.get("/", (req, res) => {
//     console.log("tout le monde est bien là ")
//     // res.sendFile("./index.html")
// })

app.post("/hello", (req, res) => {
    // console.log("je suis un message hello world")
    res.json({
        message: "hello world tout le monde, je vais bien, je vous assure"
    })
})

app.post('/create-checkout-session', async (req, res) => {
    // console.log("je suis l'ensemble des requetes", req.body.data)
    // console.log("je post dans le vide et tout marche bien enfin je pense que tout marche bien")
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
              price_data: {
                currency: 'xof',
                product_data: {
                  name: req.body.data[0].name,
                },
                unit_amount: parseInt(req.body.data[0].price),
              },
              quantity: req.body.data[0].quantity,
            },
        ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
    })

    // res.redirect(303, session.url);
    res.json({
        url: session.url
    })
  
  });
app.listen(2000, () => {
    console.log("le port est bien lancé")
})