const { google } = require("googleapis");
const SiteConfig = require("../config/site.config.json")
const oauth2Client = new google.auth.OAuth2(
  SiteConfig.GOOGLE_CLIENT_ID,
  SiteConfig.GOOGLE_CLIENT_SECRET,
  SiteConfig.GOOGLE_CALLBACK,
  
);
const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const googleURL = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});
  async function VerifyTokenForPayload(token, client) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: SiteConfig.GOOGLE_CLIENT_ID,
  });
  return await ticket.getPayload();
}
module.exports = {
  VerifyTokenForPayload,
  googleURL,
  oauth2Client,
};
