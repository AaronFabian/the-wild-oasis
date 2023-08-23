import supabase from "./supabase";

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	})

	if (error)
		throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data: user, error } = await supabase.auth.getUser();
	console.log(user);

	if (error)
		throw new Error(error.message);

	return user?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}
