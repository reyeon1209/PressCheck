const { getRec, getSmp } = require("./crawl.js");
const cron = require("node-cron");

async function handleAsync() {
  const rec = await getRec();
  const smp = await getSmp();
  console.log("rec", rec, "smp", smp);
}

cron.schedule("*/2 * * * *", async () => {
  console.log("running a task every two minutes");
  await handleAsync();
});