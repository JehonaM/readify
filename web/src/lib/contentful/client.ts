export async function getEntries(query: string) {
  if (!query) throw new Error("No query provided!");

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    },
  );

  const json = await response.json();
  if (json.errors) {
    console.error("GraphQL Errors:", JSON.stringify(json.errors, null, 2));
  }
  return json.data;
}
