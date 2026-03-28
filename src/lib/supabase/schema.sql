-- ═══════════════════════════════════
-- Diana Perez Site — Supabase Schema
-- ═══════════════════════════════════

-- Blog posts
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text, -- markdown
  excerpt text,
  cover_image text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case studies
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  client text,
  tags text[] default '{}',
  metrics jsonb default '[]',
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Toolkit products
create table if not exists toolkit_products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  price numeric not null default 0,
  currency text not null default 'USD',
  type text not null check (type in ('diagnostic', 'playbook', 'template', 'workshop')),
  features text[] default '{}',
  lemon_squeezy_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contact submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Newsletter subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════

alter table blog_posts enable row level security;
alter table case_studies enable row level security;
alter table toolkit_products enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public read for published content
create policy "Public can read published blog posts"
  on blog_posts for select using (status = 'published');

create policy "Public can read published case studies"
  on case_studies for select using (status = 'published');

create policy "Public can read published toolkit products"
  on toolkit_products for select using (status = 'published');

-- Public insert for contact and newsletter
create policy "Public can submit contact forms"
  on contact_submissions for insert with check (true);

create policy "Public can subscribe to newsletter"
  on newsletter_subscribers for insert with check (true);

-- Authenticated full CRUD
create policy "Authenticated full access to blog posts"
  on blog_posts for all using (auth.role() = 'authenticated');

create policy "Authenticated full access to case studies"
  on case_studies for all using (auth.role() = 'authenticated');

create policy "Authenticated full access to toolkit products"
  on toolkit_products for all using (auth.role() = 'authenticated');

create policy "Authenticated can read contact submissions"
  on contact_submissions for select using (auth.role() = 'authenticated');

create policy "Authenticated can delete contact submissions"
  on contact_submissions for delete using (auth.role() = 'authenticated');

create policy "Authenticated can read newsletter subscribers"
  on newsletter_subscribers for select using (auth.role() = 'authenticated');

create policy "Authenticated can delete newsletter subscribers"
  on newsletter_subscribers for delete using (auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at before update on blog_posts
  for each row execute function update_updated_at();

create trigger case_studies_updated_at before update on case_studies
  for each row execute function update_updated_at();

create trigger toolkit_products_updated_at before update on toolkit_products
  for each row execute function update_updated_at();
