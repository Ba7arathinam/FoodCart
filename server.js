const express=require('express');
const app=express()
const cors=require('cors');
const { foodCart, foodproduct, sequelize, foodUsers } = require('./ORM');
const { UpdateCartService } = require('./updateCartService');
app.use(express.json())
app.use(cors())
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
const upload = multer({ storage: storage })

app.post('/imageupload',upload.single('images'),async function(req,res,next){
    await sequelize.sync();
    let images=req.file.originalname;
    let id=req.body.id;
    console.log(req['body']);

     await foodproduct.update({ "Product_image":images}, {
        where: {
            "id":id,
        },
    });
    console.log("bye")
    res.json({"message":"data updated"})
})

app.get('/getImage', async(req,res)=>{
    console.log("hello")
    await sequelize.sync();
    let id=req['query']['id'];
    console.log(id)
    let result=await foodproduct.findOne({where: 
        {id:`${id}`}
    });
    console.log(result)
    if(result.dataValues.Product_image==null){
        res.sendFile(`uploads/no_img.jpg`,{root:__dirname})
    }
    else{
        res.sendFile(`uploads/${result.dataValues.Product_image}`,{root:__dirname})
    }
})


app.get('/getProduct', async (req, res) => {
    await sequelize.sync();
    let result=await foodproduct.findAll();
    result.forEach(i=>console.log(i.dataValues));
    res.json({message:result})

})

//addCart
app.post('/addCart/:u_id/:p_id',async(req,res)=>{
   let    user_id=req.params.u_id
   let  product_id=req.params.p_id
    await sequelize.sync();
    let f_product=await foodproduct.findByPk(product_id)
    let f_user=await foodUsers.findByPk(user_id)
   try {
    if(f_product){
        if(f_user){
            let f_Cart=await foodCart.create({
                p_id:product_id,
                u_id:user_id,
                p_name:f_product.dataValues.Product_name,
                quantity:f_product.dataValues.Quantity,
                total_price:f_product.dataValues.Price
            })
         res.status(200).json(f_Cart)
        }else{
            throw 'User Not found,Please Login'
        }

    }else{
      throw 'Product Id Not match'
    }
   } catch (e) {
    res.status(400).json(e)
   }
})
//getCart
app.get('/getCart/:id', async (req, res) => {
    try{
           let uid = req['params']['id'];
           console.log(uid);
          let res1 = await foodCart.findOne({ where: { u_id: uid } });
           console.log(res1);
           if (res1 == null) {
               throw "your cart is empty" 
           }
           else {
                res.json(res1)
           }
       }
       catch(e)
       {
           res.status(400)
          console.log(e)
          res.json({"error":e})
       }
       
   })

   //deleteCart
   app.delete('/deleteCart',async(req,res)=>{
 
    let UserId=req.query.u_id;
    let product_id=req.query.p_id;
   
    console.log(UserId,product_id)
    try{
        await sequelize.sync();

        await foodCart.destroy({
            
            where:{
                p_id:product_id,
                u_id:UserId
            }
        });  
;
        res.json({message:"item removed from cart"});
    }
    catch(e){
        console.log(e);
        res.status(400);
        res.json({"erroe":"sdsdsd"});
    }

})
//update cart
let service = new UpdateCartService()
// sample model of endpoint for update "http://localhost:8080/updateCart?p_id=3&qty=6&u_id=3"
app.post('/updateCart',async (req,res)=>{
    try {
        let query = req['query'];
        let result = await service.updateCart(query['p_id'],query['qty'],query['u_id']);
        // console.log("RESULT API",result);
        res.json({"Message":result})
    } catch (error) {
        res.json(error.message)
    }
});
   
app.listen(8080,()=>{
    console.log('server is running')
}
)