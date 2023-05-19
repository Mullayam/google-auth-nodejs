const {
  googleURL,
  VerifyTokenForPayload,
} = require("../services/custom-oauth2");
const SiteConfig = require("../config/site.config.json");
const { OAuth2Client } = require("google-auth-library");
class GoogleAuth {
  async RedirectHandler(req, res) {
    res.redirect(googleURL);
    res.end();
  }
  async CallbackHandler(req, res) {
    //get  code from the url
    let q = req.query;
// hit api endpoint to get encrypted data in response
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: q.code,
        client_id: SiteConfig.GOOGLE_CLIENT_ID,
        client_secret: SiteConfig.GOOGLE_CLIENT_SECRET,
        redirect_uri: SiteConfig.GOOGLE_CALLBACK,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    // decode tokendata.idToken with jwt 
    const client = new OAuth2Client(SiteConfig.GOOGLE_CLIENT_ID);
    // verify token  to get payload from server
    const payload = await VerifyTokenForPayload(tokenData.id_token, client);
    // extracxt info from payload or save into db or  write own function
    res.send({ payload });

  }
}

module.exports = new GoogleAuth();
