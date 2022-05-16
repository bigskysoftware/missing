import type { Site, Page } from "lume/core.ts";
import { exec } from "./util.ts";

/**
 * Set created and last modified dates for pages by looking at Git history.
 */
export default () => {
    return (site: Site) => {
        site.preprocess("*", async (page: Page) => {
            // Pull content dates from git.
        
            const gitLog = await exec([
                "git", "log", // git commits
                "--follow", // handle renames
                "--format=%aI", // commit date, as ISO date
                "www" + page.src.path + page.src.ext // for this file
            ])
        
            const dates = gitLog.split("\n")
            dates.pop() // remove trailing newline

            if (dates.length === 0) return
        
            if (dates.length > 1) page.data["last modified"] = new Date(dates[0])
            page.data.date = new Date(dates[dates.length - 1])
        })
    }
}
