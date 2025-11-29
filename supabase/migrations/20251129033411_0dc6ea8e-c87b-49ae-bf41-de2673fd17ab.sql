-- Create grocery_lists table
CREATE TABLE public.grocery_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grocery_list_items table
CREATE TABLE public.grocery_list_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grocery_list_id UUID NOT NULL REFERENCES public.grocery_lists(id) ON DELETE CASCADE,
  grocery_item_id UUID REFERENCES public.grocery_items(id) ON DELETE CASCADE,
  custom_item_name TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grocery_list_collaborators table
CREATE TABLE public.grocery_list_collaborators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grocery_list_id UUID NOT NULL REFERENCES public.grocery_lists(id) ON DELETE CASCADE,
  collaborator_email TEXT NOT NULL,
  role TEXT DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(grocery_list_id, collaborator_email)
);

-- Enable Row Level Security
ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_list_collaborators ENABLE ROW LEVEL SECURITY;

-- RLS Policies for grocery_lists
CREATE POLICY "Users can view their own lists and lists they collaborate on"
ON public.grocery_lists
FOR SELECT
USING (
  auth.uid() = user_id 
  OR EXISTS (
    SELECT 1 FROM public.grocery_list_collaborators 
    WHERE grocery_list_id = id 
    AND collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
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

-- RLS Policies for grocery_list_items
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
        WHERE grocery_list_id = grocery_lists.id 
        AND collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  )
);

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
        WHERE grocery_list_id = grocery_lists.id 
        AND collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
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
        WHERE grocery_list_id = grocery_lists.id 
        AND collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
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
        WHERE grocery_list_id = grocery_lists.id 
        AND collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  )
);

-- RLS Policies for grocery_list_collaborators
CREATE POLICY "Users can view collaborators on their lists"
ON public.grocery_list_collaborators
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.grocery_lists 
    WHERE id = grocery_list_id 
    AND (
      user_id = auth.uid() 
      OR EXISTS (
        SELECT 1 FROM public.grocery_list_collaborators c2
        WHERE c2.grocery_list_id = grocery_lists.id 
        AND c2.collaborator_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      )
    )
  )
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

-- Trigger for updated_at on grocery_lists
CREATE TRIGGER update_grocery_lists_updated_at
BEFORE UPDATE ON public.grocery_lists
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();