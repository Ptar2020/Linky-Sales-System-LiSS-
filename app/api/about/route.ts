export async function GET() {
  const about = [
    {
      id: 1,
      title: "Title 1",
      description:
        "This is the description for the first title, The title is named 'Title 1'",
    },
    {
      id: 2,
      title: "Title 2",
      description:
        "This is the description for the second title, The title is named 'Title 2'",
    },
    {
      id: 3,
      title: "Title 3",
      description:
        "This is the description for the third title, The title is named 'Title 3'",
    },
  ];
  return new Response(JSON.stringify(about));
}
