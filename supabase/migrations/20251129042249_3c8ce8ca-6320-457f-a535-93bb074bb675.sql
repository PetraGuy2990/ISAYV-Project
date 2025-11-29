-- Drop the old foreign key constraint
ALTER TABLE grocery_list_items 
DROP CONSTRAINT IF EXISTS grocery_list_items_grocery_item_id_fkey;

-- Add new foreign key constraint referencing products table
ALTER TABLE grocery_list_items 
ADD CONSTRAINT grocery_list_items_grocery_item_id_fkey 
FOREIGN KEY (grocery_item_id) 
REFERENCES products(id) 
ON DELETE SET NULL;