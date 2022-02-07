import fs from "fs-extra";
import logger from "./src/logger";

(async () => {
  try {
    // Remove current build
    await remove("./dist");
  } catch (err) {
    logger.error(err);
  }
})();

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      return err ? rej(err) : res();
    });
  });
}
