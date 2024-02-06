import express from "express";

const router = express.Router();
import { Stripe } from 'stripe';

const addZeros =(number) =>{
    let decimalNumber = number *100;
    return decimalNumber
}

const stripe = new Stripe("sk_test_51OMKOULDk2U4kXApgX6T5MvUpmUWX69LSmsDTBRdgU8oWbmEH6aMA7WnaPlIeGgzzhx0km1soQN5g69YdBITpYMk00EbapIjI7");

router.post("/",async(req,res)=> {
    console.log('reached');
    const {products} = req.body;
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.airlines,
                images:[product.image]
            },
            unit_amount: Math.round(addZeros(product.price)),
        },
        quantity:product.quantity
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/Confirmation",
        cancel_url:"http://localhost:3000/failure"
    })
    res.json({id:session.id})
})

export default router;