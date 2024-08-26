export async function register() {
  console.log("inside instru");
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dbConnect = require("./app/utils/dbConnect");
    await dbConnect.default();
  }
}
