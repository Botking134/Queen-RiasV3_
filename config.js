const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ",",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347040401291",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Triple X",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0N0Y1FkeVdETVJkV2pTWGJJUWpwaVpOc3krNFFlTlMvWmRIMTRqNUZFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1NhbEp0c0hQMHdzSWw3aDhUNmpBL3BFcWY3bkduTWsxdEFPa1I0ckdDUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQXF4THdMNTIwSm1hWFQ5ZFhoQmpLZitDNkFTMWFnWTFPU3Z1cWhEekVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTitKSHJTbUJpZGlDOW1rTUNKTnlPRjdKQU9ySEU0SnBBdlV1Y1d4dEZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFINFFyVk5BNjhWVnVBc3IzbG5lVFVZN2Q3L21Kd3lIVU1IdGN2dXhKVXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNFRWtQV1hrV25pWWJnM2NYdHZjemxzK1Z3YmtqcXRvVGg1V3BhTzlvM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZIUis2Y3MvZXRjNG03ZGc1TGdIOVZSSkNtK3lpcjExeGJ0NVdjTUVrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2U1WnVqTjR6b1YzM1hqRHZPeGs2WEQyeHI0NnBPaXR5Sit2UHhCb3Nrdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJGK3ZyTExSbERQaDRmVUdUOHQ2cWtwVTdaWC9IUkZZL1pXaW56dXN0eDdJblY3bmFKV3h2ejV4Q1VkRm0zNVZVTGJyRnlGalZqMTV4bUpqdTJOaGdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6InJzQnhFQ3lRa0w0NTVFRWxWRytoKy9lS2pMRnRsS2dXZDFsUFhoakdodTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkpBRjRBR1FUIiwibWUiOnsiaWQiOiIyMzQ3MDQwNDAxMjkxOjJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI3MDQ0MjQxMjk5NDY3NToyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVNXb2JFSEVMRzF0Y0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUXo4aGY0V2dhMzk0UWdqa2hTYjdwekpqQ0czTEJsclV3RDNyU1hWb0FuQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOVg2U3RaZmRaTlVmQStFVnJ1ejBTMDZxamZzVXJxS1IvL0tWU3ZSdi8xQnFDa2owamtmNjlFdUxjZmpkTnJBcmpWSEJEcHkxYUt5Z0dkbno3bkR0QWc9PSIsImRldmljZVNpZ25hdHVyZSI6IkdXc3grSjFQOTJmMXRBbFBDSGppM1UxN3lTN3RQaThNQnlETmY0RzBjTSt5NlhZeGtEazZGZ2ZsU29SNTNtcmNGZTc1WEdCSGhlVkhBTk5RUHo0SGhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA0MDQwMTI5MToyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVNL0lYK0ZvR3QvZUVJSTVJVW0rNmN5WXdodHl3WmExTUE5NjBsMWFBSncifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTcwNTY2MiwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQVGcifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;