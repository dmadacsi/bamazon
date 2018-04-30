SELECT * FROM bamazon_db.products;

UPDATE products SET stock_quantity = 100 WHERE id = 1;

UPDATE products SET stock_quantity=stock_quantity -5 WHERE id = 1
