export interface Prompt {
  id: string;
  title: string;
  help_text: string;
  image_url: string;
  prompt: string;
  created_at: string;
  category_id: string;
  Category: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}
