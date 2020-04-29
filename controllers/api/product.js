 const Product = require("../../models/product");


module.exports.createProduct=(req,res)=>
{
    if(!req.body.quantity)
    {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }

   // create product

    const product =new Product({
        name:req.body.name,
        quantity:req.body.quantity
    });

    //save product in database

    product.save()
    .then(data =>{ res.send(data);
    }).catch(err =>
        {
            res.status(500).send({
                message:err.message || "some error occured"
            });
        });

};

module.exports.getProducts = (req, res) =>{
    Product.find().then(products =>{
        res.send(products);
        }).catch(err => {
            res.status(500).send({
                message:err.message ||"some error occured"
            });
        });
};




//update quantity of ecommerse product 

module.exports.update_quantity = function(req,res){

    try {

    //     app.put('/book/:id', (req, res) =>
    //     Book.findOneAndUpdate({
    //     _id: req.params.id
    //      },
    //      { $set: { title: req.body.title }
    //     }, {upsert: true}, (err, newBook) => {
    //      if (err) {
    //       res.send('error updating ');
    //      } else {
    //       console.log(newBook);
    //       res.send(newBook);
    //     }
    //    }));
        Product.findOneAndUpdate({
            _id:req.params.id
        },
            {$set:{quantity:req.params.number}
        },function(err,product){
                if(err){
                    console.log("Not possible");
                }
                return res.json(200,{
                    data:{
                        product:product,
                    },
                    message:"Congtats"
                });

            }
            );
        
    }catch (err) {
        console.log("Error!! cant update the product",err);
        return res.json(500,{
                message:"Internal server error"
        });
    }
}



//destroy the the product 

module.exports.destroy =(req,res) =>
{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(!product)
        {
            return res.status(404).send({
                message:"product not found"
            });
        }
        res.send({message:"product delete "});
    }).catch(err =>{
        if(err.kind==='ObjectId' || err.name==='NotFound')
        {
            return res.status(404).send({
                message: "product not found with id " + req.params.id
        });
    }
    return res.status(500).send({
        message:"Error retrieving product with id" + req.params.id
    });
});
   
};



