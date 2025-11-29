import { useState, useEffect } from 'react';
import { Trash2, UserPlus, X, Edit2, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { GroceryList, GroceryListItem, Collaborator } from '@/hooks/useGroceryLists';

interface GroceryListDetailProps {
  list: GroceryList;
  onUpdateList: (listId: string, updates: any) => void;
  onDeleteList: (listId: string) => void;
}

export function GroceryListDetail({
  list,
  onUpdateList,
  onDeleteList,
}: GroceryListDetailProps) {
  const [items, setItems] = useState<GroceryListItem[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(list.name);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
    loadCollaborators();
  }, [list.id]);

  const loadItems = async () => {
    try {
      const { data, error } = await supabase
        .from('grocery_list_items')
        .select(`
          *,
          grocery_items (
            id,
            item_name,
            brand,
            price,
            company,
            size,
            category
          )
        `)
        .eq('grocery_list_id', list.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading items',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const loadCollaborators = async () => {
    try {
      const { data, error } = await supabase
        .from('grocery_list_collaborators')
        .select('*')
        .eq('grocery_list_id', list.id);

      if (error) throw error;
      setCollaborators(data || []);
    } catch (error: any) {
      toast({
        title: 'Error loading collaborators',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('grocery_list_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setItems(items.filter((item) => item.id !== itemId));
      toast({ title: 'Item removed' });
    } catch (error: any) {
      toast({
        title: 'Error removing item',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const addCollaborator = async () => {
    if (!newCollaboratorEmail.trim()) return;

    try {
      const { data, error } = await supabase
        .from('grocery_list_collaborators')
        .insert([
          {
            grocery_list_id: list.id,
            collaborator_email: newCollaboratorEmail,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setCollaborators([...collaborators, data]);
      setNewCollaboratorEmail('');
      toast({ title: 'Collaborator added' });
    } catch (error: any) {
      toast({
        title: 'Error adding collaborator',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeCollaborator = async (collabId: string) => {
    try {
      const { error } = await supabase
        .from('grocery_list_collaborators')
        .delete()
        .eq('id', collabId);

      if (error) throw error;

      setCollaborators(collaborators.filter((c) => c.id !== collabId));
      toast({ title: 'Collaborator removed' });
    } catch (error: any) {
      toast({
        title: 'Error removing collaborator',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const saveName = () => {
    if (editedName.trim() && editedName !== list.name) {
      onUpdateList(list.id, { name: editedName });
    }
    setIsEditingName(false);
  };

  return (
    <div className="space-y-6">
      {/* List Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {list.image_url ? (
                <img
                  src={list.image_url}
                  alt={list.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl text-white font-bold"
                  style={{ backgroundColor: list.color }}
                >
                  {list.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              {isEditingName ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveName();
                      if (e.key === 'Escape') setIsEditingName(false);
                    }}
                    className="max-w-xs"
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={saveName}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{list.name}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeleteList(list.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete List
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* List Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No items yet. Search and add items to this list.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const displayName = item.grocery_items?.item_name || item.custom_item_name || 'Unknown Item';
                const brand = item.grocery_items?.brand;
                const price = item.grocery_items?.price;
                
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{displayName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {brand && (
                          <Badge variant="secondary" className="text-xs">
                            {brand}
                          </Badge>
                        )}
                        {price && (
                          <span className="text-sm text-muted-foreground">
                            ${price.toFixed(2)}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Collaborators */}
      <Card>
        <CardHeader>
          <CardTitle>Collaborators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="collaborator@example.com"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addCollaborator();
              }}
            />
            <Button onClick={addCollaborator}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {collaborators.length > 0 && (
            <div className="space-y-2">
              {collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {collab.collaborator_email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{collab.collaborator_email}</span>
                    <Badge variant="outline" className="text-xs">
                      {collab.role}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCollaborator(collab.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
