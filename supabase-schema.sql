-- Supabase Database Schema for PackSheet Lite
-- Execute this SQL in your Supabase SQL Editor

-- Create shipping_forms table
CREATE TABLE IF NOT EXISTS public.shipping_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_weight DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  language TEXT NOT NULL DEFAULT 'vi' CHECK (language IN ('vi', 'zh')),
  theme TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipping_forms_user_id ON public.shipping_forms(user_id);
CREATE INDEX IF NOT EXISTS idx_shipping_forms_created_at ON public.shipping_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.shipping_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for shipping_forms
CREATE POLICY "Users can view their own shipping forms" ON public.shipping_forms
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own shipping forms" ON public.shipping_forms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shipping forms" ON public.shipping_forms
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shipping forms" ON public.shipping_forms
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for user_settings
CREATE POLICY "Users can view their own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_shipping_forms_updated_at
  BEFORE UPDATE ON public.shipping_forms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to get user's shipping forms
CREATE OR REPLACE FUNCTION public.get_user_shipping_forms()
RETURNS TABLE (
  id UUID,
  customer_name TEXT,
  customer_address TEXT,
  customer_phone TEXT,
  items JSONB,
  total_weight DECIMAL(10,2),
  total_quantity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT
    sf.id,
    sf.customer_name,
    sf.customer_address,
    sf.customer_phone,
    sf.items,
    sf.total_weight,
    sf.total_quantity,
    sf.created_at
  FROM public.shipping_forms sf
  WHERE sf.user_id = auth.uid()
  ORDER BY sf.created_at DESC;
END;
$$;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.shipping_forms TO anon, authenticated;
GRANT ALL ON public.user_settings TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_shipping_forms() TO authenticated;
