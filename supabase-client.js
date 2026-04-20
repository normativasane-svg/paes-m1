// ============================================================
//  PAES M1 — Supabase Client
// ============================================================
const SUPABASE_URL = 'https://qxmesxxcpamzkcjslxnn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ITrvZIxwCPtcr4KFVQiXsg_V8HsPi92';

// Iniciar cliente de Supabase (requiere que el script de CDN se cargue antes en el HTML)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Obtener nombre del alumno (si aplica)
let nombreAlumno = localStorage.getItem('paes_alumno_nombre') || null;
