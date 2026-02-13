export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            merchants: {
                Row: {
                    id: string
                    created_at: string
                    business_name: string
                    slug: string
                    brand_color: string
                    logo_url: string | null
                    stripe_account_id: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    business_name: string
                    slug: string
                    brand_color?: string
                    logo_url?: string | null
                    stripe_account_id?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    business_name?: string
                    slug?: string
                    brand_color?: string
                    logo_url?: string | null
                    stripe_account_id?: string | null
                }
            }
            loyalty_cards: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    merchant_id: string
                    current_stamps: number
                    max_stamps: number
                    is_completed: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    merchant_id: string
                    current_stamps?: number
                    max_stamps?: number
                    is_completed?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    merchant_id?: string
                    current_stamps?: number
                    max_stamps?: number
                    is_completed?: boolean
                }
            }
        }
    }
}
