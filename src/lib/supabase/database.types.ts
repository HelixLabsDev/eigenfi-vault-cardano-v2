export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          // the data expected from .select()
          id: string;
          address: string;
          amount: number;
          point: number;
          created_at: string;
        };
        Insert: {
          // the data to be passed to .insert()
          address: string;
          amount: number;
          point: number;
          created_at?: string | null;
        };
        Update: {
          // the data to be passed to .update()
          address?: string;
          amount?: number;
          point?: number;
          created_at?: string;
        };
      };
    };
  };
}
