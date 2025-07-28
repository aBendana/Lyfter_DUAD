SET search_path TO lyfter_week_6_transactions;


DO $$
BEGIN

    -- validate if the invoice exists
    IF NOT EXISTS (
        SELECT id FROM invoices
        WHERE id = 1
    ) 
    THEN
        RAISE NOTICE 'Wrong invoice id';
        RETURN; -- abrupt exit from the transaction
    END IF;


    -- return products to stock
    UPDATE products
    SET stock = stock + 1
    WHERE id = 1;


    -- updating invoice status
    UPDATE invoices
    SET quantity = 0,
        invoice_total = 0,
        status = 'returned'   
    WHERE id = 1;

END
$$;
