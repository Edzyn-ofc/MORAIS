// Login
const handleLogin = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location.href = '/admin'; // Redireciona para o painel
};

// Cadastro
const handleSignUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert('Verifique seu e-mail para confirmar o cadastro.');
};