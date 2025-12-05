import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GroceryList {
  id: string;
  user_id: string;
  name: string;
  color: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GroceryListItem {
  id: string;
  grocery_list_id: string;
  grocery_item_id: string | null;
  custom_item_name: string | null;
  quantity: number;
  created_at: string;
  products?: {
    id: string;
    name: string;
    size: string | null;
    gtin: string | null;
    image_url: string | null;
    brands?: {
      name: string;
    } | null;
    category?: string | null;
  } | null;
}

export interface Collaborator {
  id: string;
  grocery_list_id: string;
  collaborator_email: string;
  role: string;
  created_at: string;
}

export function useGroceryLists() {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('grocery_lists')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setLists(data || []);
      
      // Set first list as active if none selected
      if (data && data.length > 0 && !activeListId) {
        setActiveListId(data[0].id);
      }
    } catch (error: any) {
      console.error('Error loading lists:', error);
      toast.error('Error loading lists: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (
    name: string, 
    color: string, 
    imageUrl?: string,
    initialItems?: { name: string; quantity: number }[]
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('grocery_lists')
        .insert([
          {
            user_id: user.id,
            name,
            color,
            image_url: imageUrl || null,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Add initial items if provided
      if (initialItems && initialItems.length > 0 && data) {
        const itemsToInsert = initialItems.map(item => ({
          grocery_list_id: data.id,
          custom_item_name: item.name,
          quantity: item.quantity,
        }));

        const { error: itemsError } = await supabase
          .from('grocery_list_items')
          .insert(itemsToInsert);

        if (itemsError) {
          console.error('Error adding initial items:', itemsError);
        }
      }

      setLists([...lists, data]);
      setActiveListId(data.id);

      const itemCount = initialItems?.length || 0;
      toast.success(`"${name}" has been created${itemCount > 0 ? ` with ${itemCount} items` : ''}.`);

      return data;
    } catch (error: any) {
      toast.error('Error creating list: ' + error.message);
      return null;
    }
  };

  const updateList = async (
    listId: string,
    updates: { name?: string; color?: string; image_url?: string }
  ) => {
    try {
      const { error } = await supabase
        .from('grocery_lists')
        .update(updates)
        .eq('id', listId);

      if (error) throw error;

      setLists(
        lists.map((list) =>
          list.id === listId ? { ...list, ...updates } : list
        )
      );

      toast.success('List updated');
    } catch (error: any) {
      toast.error('Error updating list: ' + error.message);
    }
  };

  const deleteList = async (listId: string) => {
    try {
      const { error } = await supabase
        .from('grocery_lists')
        .delete()
        .eq('id', listId);

      if (error) throw error;

      setLists(lists.filter((list) => list.id !== listId));
      
      // Set next available list as active
      if (activeListId === listId) {
        const remainingLists = lists.filter((list) => list.id !== listId);
        setActiveListId(remainingLists.length > 0 ? remainingLists[0].id : null);
      }

      toast.success('List deleted');
    } catch (error: any) {
      toast.error('Error deleting list: ' + error.message);
    }
  };

  const activeList = lists.find((list) => list.id === activeListId) || null;

  return {
    lists,
    activeListId,
    activeList,
    setActiveListId,
    loading,
    createList,
    updateList,
    deleteList,
    refreshLists: loadLists,
  };
}
