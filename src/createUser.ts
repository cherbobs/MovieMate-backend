import { supabase } from "./supabaseClient";

async function createUser() {
  const email = "bob@example.com";
  const password = "BobSecure123!";
  const username = "Bob";
  const avatar_url = "https://i.pravatar.cc/150?u=bob@example.com";

  // Créer l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError || !authData.user) {
    console.error("Erreur Auth:", authError?.message);
    return;
  }

  const userId = authData.user.id;

  // Insérer dans la table `users`
  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([
      {
        id: userId,
        username,
        avatar_url,
      },
    ]);

  if (userError) {
    console.error("Erreur insertion dans users:", userError.message);
  } else {
    console.log("Utilisateur ajouté dans la table users:", userData);
  }
}

createUser();
