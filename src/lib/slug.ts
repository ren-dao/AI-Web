export function generateSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\w一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    || title;
}

export async function generateUniqueSlug(
  title: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  let slug = generateSlug(title);
  let counter = 2;

  while (await checkExists(slug)) {
    slug = `${generateSlug(title)}-${counter}`;
    counter++;
  }

  return slug;
}
