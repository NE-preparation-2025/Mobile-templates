import express from 'express';
const router = express.Router();
import db from '../config/db.js';

const generateToken = ()=>{
    return Math.floor(10000000 + Math.random() * 90000000).toString();

}
router.post('/generate',(req,res)=>{
    const {amount,meter_number}=req.body;
    if(!amount || !meter_number){
        return res.status(400).json({error: 'Amount and meter number are required'});
    }
    if(isNaN(amount) || amount <= 100){
        return res.status(400).json({error:'Amount must be a number and at least 100 RWF'});


    }
    if(!/^\d{6}$/.test(meter_number)){
        return res.status(400).json({error:'Meter number must be 6-digit number'})

    }

    const token_value_days=Math.floor(amount/100);
    const token=generateToken();

    const purchase_date=new Date();
    const query=`INSERT INTO purchased_tokens (meter_number, token, token_status, token_value_days, purchased_date, amount)
    VALUES (?, ?, 'NEW', ?, ?, ?)`;
    db.query(query,[meter_number,token,token_value_days,purchase_date,amount],(err,result)=>{
        if(err){
            if(err.code == 'ER_DUP_ENTRY'){
                return res.status(400).json({error:'Token already exists, please try again'});

            }
            return res.status (500).json({error:'Database error: ' +err.message});
        }
        res.status(200).json({
            message:'Token generated successfully',
            token,
            meter_number,
            token_value_days,
            purchase_date,
            amount,

        });
    })
})

router.get('validate/:meter_number',(req,res)=>{
    const {meter_number}=req.params;
    if(!/^\d{6}$/.test(meter_number)){
        return res.status(400).json({error:'Meter number must be a 6-digit number'})
    }
    const query= `SELECT * FROM purchased_tokens WHERE meter_number= ?`;
    db.query(query,[meter_number],(err,results)=>{
        if(err){
            return res.status(500).json({error:'Database error:' +err.message});
        }

        if(results.length === 0){
            return res.status(404).json({error:'No tokens found for this meter number'});
        }

        const updatedResults=results.map(token =>{
            const purchasedDate=new Date(token.purchase_date);
            const currentDate=new Date();
            const daysSincePurchase=Math.floor((currentDate - purchasedDate)/(1000 * 60 * 60 *24));

            if(daysSincePurchase >366 & token.token_status !== 'EXPIRED')
                {
                    const updateQuery= `UPDATE purchased_tokens SET token_status="EXPIRED" WHERE id= ?`;
                    db.query(updateQuery,[token.id],(updateErr) =>{
                        if(updateErr){
                            console.error('Error updating token status:', updateErr);
                        }

                    });
                    token.token_status='EXPIRED';
                }
                return token;
               
        });
        res.status(200).json(updatedResults);

       
    });


});
export default router;
    
