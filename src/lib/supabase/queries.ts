import { createClient } from "./server";

export async function getPublishedPosts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data?.length) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPublishedCases() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error || !data?.length) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getCaseBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPublishedProducts() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("toolkit_products")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error || !data?.length) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("toolkit_products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}
