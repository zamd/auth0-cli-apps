const request = require('request-promise'),
    express= require('express'),
    opn = require('opn'),
 _ = require('lodash');

const app = express();

const authorizeCodeRequest =
new Promise( (resolve) => {
    app.use('/cb', (req,res)=>{
        res.send("<html><body><p>Please return to application.</p></body></html>")
        resolve(req.query.code);
    });
});

app.listen(9000);

const params = {
    client_id: "2wQ4uSuxhGzlkeDDSvFeVRCvIFXOh5NX",
    scope: "openid",
    response_type: "code",
    redirect_uri: "http://localhost:9000/cb"
};

const endpoint = "https://zamd.au.auth0.com/authorize";
const qs = _.toPairs(params).map(p=>`${p[0]}=${p[1]}`).join('&');

const authorizationUrl = `${endpoint}?${qs}`;

opn(authorizationUrl);

authorizeCodeRequest.then(code=>{
    console.log(`${code}`);
    // TODO: code exchange
    //TODO: Add PKCE
    process.exit(0);
});