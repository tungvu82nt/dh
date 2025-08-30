import { useState, useEffect } from 'react';
import { supabase, convertToSupabaseFormat, convertFromSupabaseFormat, ShippingForm as SupabaseShippingForm } from '../utils/supabase';
import { ShippingForm } from '../types';

export function useSupabaseShippingForms() {
  const [forms, setForms] = useState<ShippingForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch forms from Supabase
  const fetchForms = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('shipping_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Convert Supabase format to our app format
      const convertedForms = data?.map(convertFromSupabaseFormat) || [];
      setForms(convertedForms);
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  // Add new form to Supabase
  const addForm = async (form: ShippingForm) => {
    try {
      setError(null);

      const supabaseForm = convertToSupabaseFormat(form);
      const { data, error: insertError } = await supabase
        .from('shipping_forms')
        .insert([supabaseForm])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Add the new form to local state
      const newForm = convertFromSupabaseFormat(data);
      setForms(prevForms => [newForm, ...prevForms]);

      return newForm;
    } catch (err) {
      console.error('Error adding form:', err);
      setError(err instanceof Error ? err.message : 'Failed to add form');
      throw err;
    }
  };

  // Delete form from Supabase
  const deleteForm = async (formId: number) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('shipping_forms')
        .delete()
        .eq('id', formId.toString());

      if (deleteError) {
        throw deleteError;
      }

      // Remove from local state
      setForms(prevForms => prevForms.filter(form => form.id !== formId));
    } catch (err) {
      console.error('Error deleting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete form');
      throw err;
    }
  };

  // Update form in Supabase
  const updateForm = async (formId: number, updates: Partial<ShippingForm>) => {
    try {
      setError(null);

      // Convert updates to Supabase format
      const supabaseUpdates: any = {};
      if (updates.customer) {
        supabaseUpdates.customer_name = updates.customer.name;
        supabaseUpdates.customer_address = updates.customer.address;
        if (updates.customer.phone) {
          supabaseUpdates.customer_phone = updates.customer.phone;
        }
      }
      if (updates.items) {
        supabaseUpdates.items = updates.items;
        supabaseUpdates.total_quantity = updates.items.reduce((sum, item) => sum + item.quantity, 0);
        supabaseUpdates.total_weight = updates.items.reduce((sum, item) => sum + (item.quantity * item.weight), 0);
      }

      const { data, error: updateError } = await supabase
        .from('shipping_forms')
        .update(supabaseUpdates)
        .eq('id', formId.toString())
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      // Update local state
      const updatedForm = convertFromSupabaseFormat(data);
      setForms(prevForms =>
        prevForms.map(form =>
          form.id === formId ? updatedForm : form
        )
      );

      return updatedForm;
    } catch (err) {
      console.error('Error updating form:', err);
      setError(err instanceof Error ? err.message : 'Failed to update form');
      throw err;
    }
  };

  // Clear all forms
  const clearAllForms = async () => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('shipping_forms')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (deleteError) {
        throw deleteError;
      }

      setForms([]);
    } catch (err) {
      console.error('Error clearing forms:', err);
      setError(err instanceof Error ? err.message : 'Failed to clear forms');
      throw err;
    }
  };

  // Import forms from JSON
  const importForms = async (formsToImport: ShippingForm[]) => {
    try {
      setError(null);

      const supabaseForms = formsToImport.map(convertToSupabaseFormat);
      const { data, error: insertError } = await supabase
        .from('shipping_forms')
        .insert(supabaseForms)
        .select();

      if (insertError) {
        throw insertError;
      }

      // Convert back and update local state
      const importedForms = data?.map(convertFromSupabaseFormat) || [];
      setForms(prevForms => [...importedForms, ...prevForms]);

      return importedForms;
    } catch (err) {
      console.error('Error importing forms:', err);
      setError(err instanceof Error ? err.message : 'Failed to import forms');
      throw err;
    }
  };

  // Load forms on component mount
  useEffect(() => {
    fetchForms();
  }, []);

  return {
    forms,
    loading,
    error,
    addForm,
    deleteForm,
    updateForm,
    clearAllForms,
    importForms,
    refreshForms: fetchForms
  };
}

// Hook for managing user settings
export function useSupabaseUserSettings() {
  const [settings, setSettings] = useState({
    language: 'vi' as 'vi' | 'zh',
    theme: 'light' as 'light' | 'dark'
  });
  const [loading, setLoading] = useState(true);

  // Fetch user settings
  const fetchSettings = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setSettings({
          language: data.language,
          theme: data.theme
        });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update user settings
  const updateSettings = async (newSettings: Partial<typeof settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: 'anonymous', // For now, using anonymous user
          language: updatedSettings.language,
          theme: updatedSettings.theme
        });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error updating settings:', err);
    }
  };

  // Load settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    updateSettings
  };
}
