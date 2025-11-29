-- Fix grocery_list_items policies to reference profiles instead of auth.users
DROP POLICY IF EXISTS "Users can add items to their lists" ON public.grocery_list_items;
DROP POLICY IF EXISTS "Users can delete items from their lists" ON public.grocery_list_items;
DROP POLICY IF EXISTS "Users can update items in their lists" ON public.grocery_list_items;
DROP POLICY IF EXISTS "Users can view items in their lists" ON public.grocery_list_items;

-- Recreate policies using profiles table
CREATE POLICY "Users can add items to their lists"
ON public.grocery_list_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.grocery_lists
    WHERE id = grocery_list_id
    AND (
      user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.grocery_list_collaborators
        WHERE grocery_list_collaborators.grocery_list_id = grocery_lists.id
        AND grocery_list_collaborators.collaborator_email = (
          SELECT email FROM public.profiles WHERE id = auth.uid()
        )
      )
    )
  )
);

CREATE POLICY "Users can delete items from their lists"
ON public.grocery_list_items
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.grocery_lists
    WHERE id = grocery_list_id
    AND (
      user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.grocery_list_collaborators
        WHERE grocery_list_collaborators.grocery_list_id = grocery_lists.id
        AND grocery_list_collaborators.collaborator_email = (
          SELECT email FROM public.profiles WHERE id = auth.uid()
        )
      )
    )
  )
);

CREATE POLICY "Users can update items in their lists"
ON public.grocery_list_items
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.grocery_lists
    WHERE id = grocery_list_id
    AND (
      user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.grocery_list_collaborators
        WHERE grocery_list_collaborators.grocery_list_id = grocery_lists.id
        AND grocery_list_collaborators.collaborator_email = (
          SELECT email FROM public.profiles WHERE id = auth.uid()
        )
      )
    )
  )
);

CREATE POLICY "Users can view items in their lists"
ON public.grocery_list_items
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.grocery_lists
    WHERE id = grocery_list_id
    AND (
      user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.grocery_list_collaborators
        WHERE grocery_list_collaborators.grocery_list_id = grocery_lists.id
        AND grocery_list_collaborators.collaborator_email = (
          SELECT email FROM public.profiles WHERE id = auth.uid()
        )
      )
    )
  )
);