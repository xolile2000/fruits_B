module.exports = function fruitBasket(pool){

    const  newBasket = async(fruit,qty,price)=>{
        await pool.query(`insert into fruit_basket(fruit,qty,price) values ($1,$2,$3)`,[fruit,qty,price])
    }
    // function get new fruitBasket async
    const allFruit = async(fruit)=>{
        var all = await pool.query(`select fruit,qty,price from fruit_basket where fruit = $1`,[fruit])
       return all.rows
    }
    
     const update = async(fruit,qty)=>{
        await pool.query(`update fruit_basket set qty = qty + $2 where fruit =$1`,[fruit,qty])
     }

     const total = async()=>{
         var price = await pool.query(`select sum(price) from fruit_basket`)
         return price.rowCount
     }
    //  show total of qty


    return{
        newBasket, 
        allFruit,
        update,
        total
    }
}

// await pool.qurey(`insert into fruit_basket(fruit,qty,price)values ($1,$2,$3)`,[fruit,qty,price]) 
    