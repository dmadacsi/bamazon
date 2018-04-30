# bamazon

I first made the csv below and imported it into the db.

1,Rolex Luxomatic,Watches,5000,100
2,Yeti Travel Mug,Travel and Camping,30,100
3,MacBook Pro,Computers,2000,10
4,Internets,Computers,50,100
5,Wifi Drone,Games,400, 200 
6,U2 tickets- pair,Concerts,200,10
7,The Beatles (The White Album),Music,30,20
8,Lego Adventure Set,Toys,20,100
9,Washing Powder,homegoods,10,200
10,A Higher Loyalty-James Comey,Books,30,3000

the script in SQL is something like this for example:
SELECT * FROM bamazon_db.products;

UPDATE products SET stock_quantity = 100 WHERE id = 1;

UPDATE products SET stock_quantity=stock_quantity -5 WHERE id = 1

but that was a little challenging in javascript took a while to figure out. at first i updated the table to my subtracted 
quantity.
but then I worked out the equation:
   //determine is quantity exists
            if(chosenItem.stock_quantity >= parseInt(answer.quantity)){
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                [
                    {//HOW TO SUBTRACT - needed to remember the name of the var 
                        stock_quantity:chosenItem.stock_quantity-parseInt(answer.quantity)
                    },
                    {
                        id:chosenItem.id
                    }
                ],
