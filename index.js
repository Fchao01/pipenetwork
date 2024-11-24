const { loginWithAllAccounts } = require("./services/login");
const { register } = require("./services/register");
const { sendHeartbeat } = require("./services/heartbeat");
const { runNodeTests } = require("./services/nodes");
const { askQuestion } = require("./utils/userInput");
const { banner } = require("./utils/banner");
const { logger } = require("./utils/logger");

(async () => {
  logger(banner, "warn");
  const choice = await askQuestion("Choose an option:\n1.注册\n2. 登陆\n3. 运行\n> ");

  switch (choice) {
    case "1":
      logger(`注册新的账户...`);
      await register();
      break;
    case "2":
      logger(`获取account并登陆`);
      await loginWithAllAccounts();
      break;
    case "3":
      logger(`运行中............`);
      await sendHeartbeat();
      setInterval(sendHeartbeat, 5 * 60 * 1000); // Send heartbeat every 5 minutes
      await runNodeTests();
      setInterval(runNodeTests, 30 * 60 * 1000); // Run Node tests every 30 minutes
      logger("HeartBeat会每5分钟发送一次，而节点结果则会每30分钟发送一次。", "debug");
      logger("不要这样做，否则你的账户将会被封禁。.", "debug");
      break;
    default:
      logger("无效选择。退出。.", "error");
  }
})();
