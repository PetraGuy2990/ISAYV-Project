-- Fix grocery_lists to reference profiles table instead of auth.users
-- Drop the existing foreign key constraint
ALTER TABLE public.grocery_lists 
DROP CONSTRAINT IF EXISTS grocery_lists_user_id_fkey;

-- Add new foreign key constraint to profiles
ALTER TABLE public.grocery_lists
ADD CONSTRAINT grocery_lists_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

-- Update RLS policies to work with profiles
DROP POLICY IF EXISTS "Users can view their own lists and lists they collaborate on" ON public.grocery_lists;
DROP POLICY IF EXISTS "Users can create their own lists" ON public.grocery_lists;
DROP POLICY IF EXISTS "Users can update their own lists" ON public.grocery_lists;
DROP POLICY IF EXISTS "Users can delete their own lists" ON public.grocery_lists;

CREATE POLICY "Users can view their own lists and lists they collaborate on"
ON public.grocery_lists
FOR SELECT
USING (
  auth.uid() = user_id 
  OR EXISTS (
    SELECT 1 FROM public.grocery_list_collaborators 
    WHERE grocery_list_id = id 
    AND collaborator_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  )
);

CREATE POLICY "Users can create their own lists"
ON public.grocery_lists
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lists"
ON public.grocery_lists
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lists"
ON public.grocery_lists
FOR DELETE
USING (auth.uid() = user_id);