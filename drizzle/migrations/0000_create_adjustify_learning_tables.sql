CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  kelas TEXT NOT NULL DEFAULT 'A',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Siswa membaca profil sendiri" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Siswa mengubah profil sendiri" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, kelas)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), ''), 'Siswa'),
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data ->> 'kelas'), ''), 'A')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.materi_progress (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  materi_slug TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  last_slide INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, materi_slug)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.materi_progress TO authenticated;
GRANT ALL ON public.materi_progress TO service_role;
ALTER TABLE public.materi_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Siswa mengelola progres materi sendiri" ON public.materi_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  correct_count INT NOT NULL,
  total_count INT NOT NULL,
  duration_seconds INT NOT NULL DEFAULT 0,
  answers JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.quiz_attempts TO authenticated;
GRANT ALL ON public.quiz_attempts TO service_role;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Siswa membaca kuis sendiri" ON public.quiz_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Siswa menyimpan kuis sendiri" ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.simulation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sim_id TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempts INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.simulation_history TO authenticated;
GRANT ALL ON public.simulation_history TO service_role;
ALTER TABLE public.simulation_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Siswa membaca simulasi sendiri" ON public.simulation_history FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Siswa menyimpan simulasi sendiri" ON public.simulation_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);