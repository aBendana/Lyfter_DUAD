SET search_path TO lyfter_week_6_transactions;


DO $$
BEGIN

    -- validate if the product is in stock
    IF EXISTS (
        SELECT 2 FROM products
        WHERE id = 1 
        AND stock < 1
    ) 
    THEN
        RAISE NOTICE 'Not enough stock';
        RETURN; -- abrupt exit from the transaction
    END IF;


    -- validate if an user exists
    IF NOT EXISTS (
        SELECT id FROM users
        WHERE id = 1
    ) 
    THEN
        RAISE NOTICE 'User not exists';
        RETURN; -- -- abrupt exit from the transaction
    END IF;


    -- create an invoice
    INSERT INTO invoices (user_id, product_id, quantity, invoice_total, status)
    VALUES (
        1, 
        1, 
        2, 
        (SELECT price FROM products WHERE id = 1) * 2, -- calculating invoice_total
        'completed'
    );


    -- update the stock
    UPDATE products
    SET stock = stock - 2
    WHERE id = 1;

END
$$ LANGUAGE plpgsql;
