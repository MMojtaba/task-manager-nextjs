export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dbConnect = require("./app/utils/dbConnect");
    await dbConnect.default();
  }
}
