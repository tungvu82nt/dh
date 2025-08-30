import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://lnqvjmdffzlxzavfxmek.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucXZqbWRmZnpseHphdmZ4bWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzAwMjMsImV4cCI6MjA3MjE0NjAyM30.QNzr2rrce4CDAIZCuzQ7tIwfRqfnTdmLlrDAtE-oc74'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Database {
  public: {
    Tables: {
      shipping_forms: {
        Row: {
          id: string
          user_id: string | null
          customer_name: string
          customer_address: string
          customer_phone: string | null
          items: any[] // JSON array of form items
          total_weight: number
          total_quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          customer_name: string
          customer_address: string
          customer_phone?: string | null
          items: any[]
          total_weight: number
          total_quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          customer_name?: string
          customer_address?: string
          customer_phone?: string | null
          items?: any[]
          total_weight?: number
          total_quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          language: 'vi' | 'zh'
          theme: 'light' | 'dark'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          language?: 'vi' | 'zh'
          theme?: 'light' | 'dark'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          language?: 'vi' | 'zh'
          theme?: 'light' | 'dark'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Export types for use in components
export type ShippingForm = Database['public']['Tables']['shipping_forms']['Row']
export type UserSettings = Database['public']['Tables']['user_settings']['Row']

// Helper function to convert our existing types to Supabase format
export const convertToSupabaseFormat = (form: any): Database['public']['Tables']['shipping_forms']['Insert'] => {
  return {
    customer_name: form.customer.name,
    customer_address: form.customer.address,
    customer_phone: form.customer.phone || null,
    items: form.items,
    total_weight: form.totalWeight,
    total_quantity: form.totalQuantity,
  }
}

// Helper function to convert Supabase format back to our app format
export const convertFromSupabaseFormat = (dbForm: ShippingForm): any => {
  return {
    id: dbForm.id,
    customer: {
      id: Date.now(), // Generate a temporary ID for compatibility
      name: dbForm.customer_name,
      address: dbForm.customer_address,
      phone: dbForm.customer_phone || undefined,
    },
    items: dbForm.items,
    createdAt: dbForm.created_at,
    totalWeight: dbForm.total_weight,
    totalQuantity: dbForm.total_quantity,
  }
}
