export async function DELETE(request: Request) {
  const json = await request.json();
  console.log("message is", json.message);

  return Response.json("success", { status: 200 });
}
