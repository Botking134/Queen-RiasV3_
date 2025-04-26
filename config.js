const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUh0OEN3b0dZSGwyM0NDR0F1K0dSMCs3clhWSW1OQXBsV20ydkp5VEpGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEY1UWh1U0JkK0N6NkNGNW9keGZReURkMmRNZyt1S3NKVzFHZmxtMnpYZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLR0oyU2dub3gvaXE0a2hJL24wNFhiMVUvUjY2STBjVUk3SWFCcUtZc0dvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzYzVGTGJCcWdnSm1oak5iM2QxbTc1dnJ0MzArOHU1aXVrZmtudS9hYlRnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1CNExrenN3MDQ4UVd1NzRJMXNTMXd0YXdWN1ZxSWlRaFFyRjE0aHh1VzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRPekozQXZ0d2RibDNaMTRRQXBOSURFMU13RnlPcVl2MkxpVG9JOWhKaUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUFJQ3RmajNQOWdsWVR1eUowNWY3Y3M4dWpUNmhyRG11cE1NL1E4ajJHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3c5WHUvcW5POUlweWhFeDZPWlltMDBvUnRsdDdPb0M1bzhYU0ZmOHVTZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF3bFZpeFpoM1RMOGczMThWSmkvb1JGdktrcXJPODhEQy9MaHJESnZOdFpOdTR0ZjVHOEFmNjRZYnZIWUlxK08yaGk4VU1DRDZvQml2eS96RVVXeEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6Ik5BbmV0Q2c5djJVR1RMVmZtQmdiZDRtNGpTUi9DWm5WQ0srbDlsZC9oTXM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlJUSks2WDdRIiwibWUiOnsiaWQiOiIyMzQ3MDQwNDAxMjkxOjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI3MDQ0MjQxMjk5NDY3NToxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSU9Xb2JFSEVOMlV0Y0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUXo4aGY0V2dhMzk0UWdqa2hTYjdwekpqQ0czTEJsclV3RDNyU1hWb0FuQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZm1wTTA4LzdiYmgrRzBQZmJHcDlQb3pLc1BDSnRTTWZxaXhDclNqR2xoRy9zSFlya1JtWVd1Q3RSeEVXcmJCYnNFQmlIVElQMExEN1gwTnRKRzJ1QWc9PSIsImRldmljZVNpZ25hdHVyZSI6IlhKcEVOOE9JQ25oNGJrV2RhRmhESmNIMEtpdlFLWWEzOHV2bXJuVmlLT2RRTWV2QTdTeTBDemFzaUhseWU5VXlldStNd1Y0aHd0bzdqdE9aa21yTERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA0MDQwMTI5MToxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVNL0lYK0ZvR3QvZUVJSTVJVW0rNmN5WXdodHl3WmExTUE5NjBsMWFBSncifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTcwMTQ4MiwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQVGcifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
