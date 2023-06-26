import fs from "fs";
import lighthouse from "lighthouse";
import desktop_config from "lighthouse/core/config/desktop-config.js";
import mobile_config from "lighthouse/core/config/full-config.js";
import puppeteer from "puppeteer-core";

const chromium_path = process.argv[2];
const sites_urls_name = process.argv[3];
const sites_scores_name = process.argv[4];
const reports_dir = 'lighthouse_reports';

if (!fs.existsSync(reports_dir)) {
    fs.mkdirSync(reports_dir);
}

const browser = await puppeteer.launch({ executablePath: chromium_path });
const port = new URL(browser.wsEndpoint()).port
const lighthouse_flags = {
    disableStorageReset: true,
    logLevel: "info",
    output: "html",
    onlyCategories: ["accessibility", "performance", "seo", "best-practices"],
    port: port,
};

const date = new Date().toLocaleDateString("es-CL"); // date format dd-MM-yyyy
const sites = JSON.parse(fs.readFileSync(sites_urls_name, { encoding: "utf-8" }));
const stats = {};

for (const siteName in sites) {
  console.log("Producing reports for", siteName);

  try {
    const desktopRunnerResult = await lighthouse(sites[siteName], lighthouse_flags, desktop_config);
    const mobileRunnerResult = await lighthouse(sites[siteName], lighthouse_flags, mobile_config);
    // `.lhr` is the Lighthouse Result as a JS object
    console.log("Reports are done for", mobileRunnerResult.lhr.finalDisplayedUrl);

    const round_score = (score) => Math.round(score * 100);

    stats[siteName] = {
      d_accessibility_score:
        round_score(desktopRunnerResult.lhr.categories.accessibility.score),
      d_performance_score: round_score(desktopRunnerResult.lhr.categories.performance.score),
      d_seo_score: round_score(desktopRunnerResult.lhr.categories.seo.score),
      d_best_practices_score:
      round_score(desktopRunnerResult.lhr.categories["best-practices"].score),
      m_accessibility_score:
        round_score(mobileRunnerResult.lhr.categories.accessibility.score),
      m_performance_score: round_score(mobileRunnerResult.lhr.categories.performance.score),
      m_seo_score: round_score(mobileRunnerResult.lhr.categories.seo.score),
      m_best_practices_score:
      round_score(mobileRunnerResult.lhr.categories["best-practices"].score),
    };

    fs.writeFileSync(
      `${reports_dir}/lhreport-${siteName}-desktop-${date}.html`,
      desktopRunnerResult.report
    );
    fs.writeFileSync(
      `${reports_dir}/lhreport-${siteName}-mobile-${date}.html`,
      mobileRunnerResult.report
    );
  } catch (error) {
    console.log(error);
  }
}

fs.writeFileSync(sites_scores_name, JSON.stringify(stats), { encoding: "utf-8" });

await browser.close();