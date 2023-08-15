import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded.");
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://qajkxqcizepqbkmmwoem.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. create cabin
  let query = supabase.from("cabins");
  // A ) Create
  if (!id)
    query = query
      .insert([{ ...newCabin, image: imagePath }]) // by using select() will return []
      .select();

  // B ) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath }) // not an array
      .eq("id", id)
      .select();

  const { data, error } = await query.select();
  if (error) {
    console.error("Cabins could not be created.");
    throw new Error("Cabins could not be created.");
  }

  // 2.upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); // params2: give all File object (js)

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id); // need to adapt a bit
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Cabins could not be deleted.");
    throw new Error("Cabins could not be deleted.");
  }

  return true;
}
