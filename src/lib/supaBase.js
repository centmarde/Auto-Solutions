import { createClient } from '@supabase/supabase-js';

// Create and export Supabase client
export const supabase = createClient(
  'https://xgjgtijbrkcwwsliqubk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnamd0aWpicmtjd3dzbGlxdWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MzYxMzAsImV4cCI6MjA0MDQxMjEzMH0.C8nvHjy-fHXY4bxI1OBTf3NqVf76RznvwoO1-ReC-5s'
);