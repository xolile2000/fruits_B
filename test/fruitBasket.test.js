const assert = require('assert');
const fruitbasket = require('../fruitBasket');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruitBasket';

const pool = new Pool({
    connectionString
}); 
beforeEach(async function(){
    // clean the tables before each test run
    await pool.query("delete from fruit_basket;");
    
});

describe('fruit basket', function(){

    it('should create new fuit basket for each type,qty,price', async function(){
        let baskets = fruitbasket(pool)

        await baskets.newBasket('banana',20,40);

        assert.deepEqual([
            {
              fruit: 'banana',
              price: 'R40.00',
              qty: 20
            }
          ]
          ,await baskets.allFruit('banana'));
    });

    it('should find all the fruit basket for each fruit type', async function(){


        let baskets = fruitbasket(pool)
        await baskets.newBasket('apple',10,15);

    
        assert.deepEqual([
            {
              fruit: 'apple',
              price: 'R15.00',
              qty: 10
            }
          ]
          ,await baskets.allFruit('apple'));
    });


    it('should update qty for a given basket', async function(){
        let baskets = fruitbasket(pool)

        await baskets.newBasket("mango",30,40)
        await baskets.update("mango",10)

        assert.deepEqual([{
            fruit: 'mango',
            price: 'R40.00',
            qty: 40
          }
        ],await baskets.allFruit("mango"));

    });

    it('should display the total of a fruit basket', async function(){
        let baskets = fruitbasket(pool)

        await baskets.total()

        assert.equal([],await baskets.allFruit());

    });

    after(function(){
        pool.end();
    });
});