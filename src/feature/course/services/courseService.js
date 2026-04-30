import { supabase } from "../../../lib/supabase";

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
          duration,
          video_url
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

  return data
};

export const getCourseByUser = async (userId) => {
  const { data, error } = await supabase
    .from("enrollments")
    .select(`
      courses (
        id,
        title,
        image_url,
        modules (
          id,
          title,
          lessons (
            id, title
          )
        )
      )
    `)
    .eq("usuario_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((item) => item.courses);
};

export const getProgressByUser = async (userId) => {
  const { data, error } = await supabase
    .from("progress")
    .select(`
      lesson_id,
      completed
    `)
    .order('id', { ascending: false })
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};


export const upsertProgress = async (userId, lessonId, completed = false) => {
  const { error } = await supabase
    .from("progress")
    .upsert(
      { user_id: userId, lesson_id: lessonId, completed },
      { onConflict: "user_id,lesson_id" }
    );

  if (error) console.error(error);
};