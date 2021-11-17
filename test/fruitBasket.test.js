const assert = require('assert');
const fruitbasket = require('../fruitBasket');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_b';

const pool = new Pool({
    connectionString
}); 
beforeEach(async function(){
    // clean the tables before each test run
    await pool.query("delete from fruit_basket;");
    
});

describe('fruit basket', function(){

    it('should create new banana fuit basket for each type,qty,price', async function(){
        let baskets = fruitbasket(pool)

        await baskets.newBasket('banana',20,40);
        

        assert.deepEqual([
            {
              fruit: 'banana',
              price: '$40.00',
              qty: 20
            }
          ]
          ,await baskets.allFruit('banana'));
    });
    it('should create new orange fuit basket for each type,qty,price', async function(){
        let baskets = fruitbasket(pool)

        await baskets.newBasket('oranges',10,15);
        

        assert.deepEqual([
            {
              fruit: 'oranges',
              price: '$15.00',
              qty: 10
            }
          ]
          ,await baskets.allFruit('oranges'));
    });

    it('should find all the fruit basket for each fruit type apple', async function(){


        let baskets = fruitbasket(pool)
        await baskets.newBasket('apple',10,15);

    
        assert.deepEqual([
            {
              fruit: 'apple',
              price: '$15.00',
              qty: 10
            }
          ]
          ,await baskets.allFruit('apple'));
    });

    it('should find all the fruit basket for each fruit type peach', async function(){


        let baskets = fruitbasket(pool)
        await baskets.newBasket('peach',5,10);

    
        assert.deepEqual([
            {
              fruit: 'peach',
              price: '$10.00',
              qty: 5
            }
          ]
          ,await baskets.allFruit('peach'));
    });

    it('should update qty for a given basket mango', async function(){
        let baskets = fruitbasket(pool)

        await baskets.newBasket("mango",30,40)
        await baskets.update("mango",10)
       

        assert.deepEqual([{
            fruit: 'mango',
            price: '$40.00',
            qty: 40
          }
        ],await baskets.allFruit("mango"));

    });

    it('should display the total of a fruit basket apple', async function(){
        let baskets = fruitbasket(pool)
       
        
        await baskets.newBasket("apple",10,20)
        await baskets.newBasket("apple",10,20)
       const price = await baskets.total('apple')
        

        assert.deepEqual([
          {
            sum: '$40.00'
          }
        ]
        , await price);

    });
    it('should display the total of a fruit basket cocopine', async function(){
        let baskets = fruitbasket(pool)
       
        
        await baskets.newBasket("cocopine",15,30)
        await baskets.newBasket("cocopine",15,30)
        await baskets.newBasket("cocopine",15,30)
        
       const price = await baskets.total('cocopine')

        

        assert.deepEqual([
          {
            sum: '$90.00'
          }
        ]
        , await price);

    });
    it('should show the sum of the total of the fruit baskets for a given fruit type mango', async function(){
        let baskets = fruitbasket(pool)
        
        await baskets.newBasket("mango",30,40)
        await baskets.newBasket("mango",30,40)
       const total = await baskets.totalSum("mango")


        assert.deepEqual([{
               "sum": 60
              }]
      ,await total);

    });
    it('should show the sum of the total of the fruit baskets for a given fruit type apple', async function(){
        let baskets = fruitbasket(pool)
        
        await baskets.newBasket("apple",20,30)
        await baskets.newBasket("apple",20,30)
       const total = await baskets.totalSum("apple")


        assert.deepEqual([{
               "sum": 40
              }]
      ,await total);

    });

    after(function(){
        pool.end();
    });
});