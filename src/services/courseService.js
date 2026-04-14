import { supabase } from "../lib/supabase";

export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      "id, title, description, image_url, price, rating, category, duration",
    );

  if (error) {
    console.error(error);
    return [];
  }

  console.log(data);

  return data;
};

export const getCourseById = async (id) => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      modules (
        id,
        title,
        lessons (
          id,
          title,
          duration
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
