-- Fix infinite recursion in RLS policies for grocery_list_collaborators
-- Drop the problematic policies first
DROP POLICY IF EXISTS "Users can view collaborators on their lists" ON public.grocery_list_collaborators;

-- Create a security definer function to check if user owns the list
CREATE OR REPLACE FUNCTION public.user_owns_grocery_list(list_id UUID, user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.grocery_lists
    WHERE id = list_id
    AND grocery_lists.user_id = user_id
  );
$$;

-- Recreate the policy using the security definer function
CREATE POLICY "Users can view collaborators on their lists"
ON public.grocery_list_collaborators
FOR SELECT
USING (
  public.user_owns_grocery_list(grocery_list_id, auth.uid())
  OR collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);