-- Fix grocery_list_collaborators policies to reference profiles instead of auth.users
DROP POLICY IF EXISTS "Users can view collaborators on their lists" ON public.grocery_list_collaborators;
DROP POLICY IF EXISTS "List owners can add collaborators" ON public.grocery_list_collaborators;
DROP POLICY IF EXISTS "List owners can remove collaborators" ON public.grocery_list_collaborators;

-- Recreate policies using profiles table
CREATE POLICY "Users can view collaborators on their lists"
ON public.grocery_list_collaborators
FOR SELECT
USING (
  user_owns_grocery_list(grocery_list_id, auth.uid()) 
  OR collaborator_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "List owners can add collaborators"
ON public.grocery_list_collaborators
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.grocery_lists 
    WHERE id = grocery_list_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "List owners can remove collaborators"
ON public.grocery_list_collaborators
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.grocery_lists 
    WHERE id = grocery_list_id 
    AND user_id = auth.uid()
  )
);