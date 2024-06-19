var msalConfig = {};
var graphConfig = {};
var proxyApiConfig = {};
var requestObj = {};
var requestObjForApi = {};
var myMSALObj = {};
var proxyEndPoint;
var accessToken = null;
var user = null;
var idTokenClaims = null;

// get all required config parameters from msal-config file
async function onLoad(getMsalConfig, isTokenrefreshReq) {
    msalConfig = getMsalConfig.msalConfig;
    graphConfig = getMsalConfig.graphConfig;
    requestObj = getMsalConfig.requestObj;
    requestObjForApi = getMsalConfig.requestObjForApi;
    myMSALObj = new Msal.UserAgentApplication(msalConfig);
    if (isTokenrefreshReq) {
        // go for token refresh if token expired
        await acquireTokenPopupAndCallMSGraph();
    }

    console.log(authenticated, !!myMSALObj.getAccount());
    // console.log("myMSALObj", myMSALObj)
    // console.log("getMsalConfig", getMsalConfig)
    // console.log('account Active', !!myMSALObj.getAccount());
    // Register Callbacks for redirect flow;
    myMSALObj.handleRedirectCallback(authRedirectCallBack);
    // checkBrowserType();
}

async function signIn() {
    await myMSALObj
        .loginPopup(requestObj)
        .then(async function (loginResponse) {
            // console.log('login response', loginResponse);
            //Successful login
            //Call MS Graph using the token in the response
            await acquireTokenPopupAndCallMSGraph();
        })
        .catch(function (error) {
            //Please check the console for errors
            console.log('failing', error);
        });
}

async function acquireTokenPopupAndCallMSGraph() {
    console.log('silent call start', requestObj);
    let _accessToken = null;
    let _result = null;
    //Always start with acquireTokenSilent to obtain a token in the signed in user from cache
    await myMSALObj
        .acquireTokenSilent(requestObj)
        .then(async function (tokenResponse) {
            _result = tokenResponse;
            _accessToken = tokenResponse.accessToken;
        })
        .catch(async function (error) {
            // Upon acquireTokenSilent failure (due to consent or interaction or login required ONLY)
            // Call acquireTokenPopup(popup window)
            if (requiresInteraction(error.errorCode)) {
                await myMSALObj
                    .acquireTokenPopup(requestObj)
                    .then(async function (tokenResponse) {
                        _result = tokenResponse;
                        _accessToken = tokenResponse.accessToken;
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Allow bocked popup");
                    });
            }
        });
    if (_accessToken) {
        idTokenClaims = _result.idToken.claims;
        await getAccessTokenForBackendApi(_accessToken)
            .then(await getUserData(_accessToken));
    }
}

// Silently request an access token
async function getAccessTokenForBackendApi(_accessToken) {
    // create new scope to get the access token for backend api
    console.log('access token from be func call', _accessToken);
    let _backendAccessToken = null;
    await myMSALObj
        .acquireTokenSilent(requestObjForApi)
        .then(async (tokenResponse) => {
            _backendAccessToken = tokenResponse.accessToken;
            console.log('Success BE accessToken', _backendAccessToken);
            if (!_backendAccessToken) {
                console.log('Error BE accessToken', _backendAccessToken);
                await myMSALObj.acquireTokenPopup(requestObjForApi).then(async function (tokenResponse) {
                    _backendAccessToken = tokenResponse.accessToken;
                    console.log('Retry BE accessToken from succees block', _backendAccessToken);
                    if (!_backendAccessToken) {
                        await myMSALObj.acquireTokenPopup(requestObjForApi).then(async function (tokenResponse) {
                            _backendAccessToken = tokenResponse.accessToken;
                            console.log('Retried BE accessToken from succees block', _backendAccessToken);
                        });
                    }
                    if (!_backendAccessToken) {
                        await myMSALObj.acquireTokenPopup(requestObjForApi).then(async function (tokenResponse) {
                            _backendAccessToken = tokenResponse.accessToken;
                            console.log('Third Retry BE accessToken from succees block', _backendAccessToken);
                        });
                    }
                });
            }
        })
        .catch(async function (error) {
            // Upon acquireTokenSilent failure (due to consent or interaction or login required ONLY)
            // Call acquireTokenPopup(popup window)
            console.log('Info from BE Catch', error);
            if (requiresInteraction(error.errorCode)) {
                await myMSALObj
                    .acquireTokenPopup(requestObjForApi)
                    .then(async function (tokenResponse) {
                        _backendAccessToken = tokenResponse.accessToken;
                        console.log('Retry BE accessToken', _backendAccessToken);
                        if (!_backendAccessToken) {
                            await myMSALObj.acquireTokenPopup(requestObjForApi).then(async function (tokenResponse) {
                                _backendAccessToken = tokenResponse.accessToken;
                                console.log('Retried BE accessToken', _backendAccessToken);
                            });
                        }
                    })
                    .catch(async function (error) {
                        console.log('Unable to aquired BE token', error);
                        await myMSALObj.acquireTokenPopup(requestObjForApi).then(async function (tokenResponse) {
                            _backendAccessToken = tokenResponse.accessToken;
                            console.log('Retry again BE accessToken', _backendAccessToken);
                        });
                    })
                    .catch(async function (error) {
                        console.log('Unable to aquired BE token', error);
                        await myMSALObj.acquireTokenPopup(requestObjForApi).then(async function (tokenResponse) {
                            _backendAccessToken = tokenResponse.accessToken;
                            //console.log('Retry again BE accessToken', _backendAccessToken);
                        });
                    });
            }
        });
    if (_backendAccessToken) {
        sessionStorage.setItem('apiAccessToken', _backendAccessToken);
        if (_accessToken !== 'refresh') {
            // await getUserData(_accessToken);
        }
        authenticated = !!myMSALObj.getAccount();
        //console.log('backend access token call', _backendAccessToken)
    }
}

async function getUserData(aToken) {
    var graphEndpoint = 'https://graph.microsoft.com/v1.0/me?$select=userPrincipalName,mail,displayName,givenName,surname,employeeid,onPremisesSamAccountName';
    const myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json');
    myheaders.append('Authorization', 'Bearer ' + aToken);

    fetch(graphEndpoint, {
        method: "GET",
        headers: myheaders
        })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            const user = {
                userPrincipalName: data.userPrincipalName,
                employeeId: data.employeeId,
                displayName: data.displayName
            }
            sessionStorage.setItem('userInformationData', JSON.stringify(user));
            sessionStorage.setItem('userDisplayName', data.displayName);
        }
    );
}

function signOut() {
    // console.log('msal obj', myMSALObj)
    authenticated = false;
    user = null;
}

function requiresInteraction(errorCode) {
    if (!errorCode || !errorCode.length) {
        return false;
    }
    return errorCode === 'consent_required' || errorCode === 'interaction_required' || errorCode === 'login_required' || errorCode === 'token_renewal_error';
}

async function checkBrowserType() {
    // Browser check variables
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var msie11 = ua.indexOf('Trident/');
    var msedge = ua.indexOf('Edge/');
    var isIE = msie > 0 || msie11 > 0;
    var isEdge = msedge > 0;
    //If you support IE, our recommendation is that you sign-in using Redirect APIs
    //If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
    // can change this to default an experience outside browser use
    var loginType = isIE ? 'REDIRECT' : 'POPUP';
    //To get the username for calling the proxy api
    let userName = localStorage.getItem('userNameFromAzure');
    // runs on page load, change config to try different login types to see what is best for your application
    if (loginType === 'POPUP') {
        if (myMSALObj.getAccount()) {
            // avoid duplicate code execution on page load in case of iframe and popup window.
            //showWelcomeMessage();
            await acquireTokenPopupAndCallMSGraph();
        }
    } else if (loginType === 'REDIRECT') {
        document.getElementById('SignIn').onclick = function () {
            myMSALObj.loginRedirect(requestObj);
        };

        if (myMSALObj.getAccount() && !myMSALObj.isCallback(window.location.hash)) {
            // avoid duplicate code execution on page load in case of iframe and popup window.
            await acquireTokenRedirectAndCallMSGraph();
        }
    } else {
        console.error('Please set a valid login type');
    }
}

var getMsalConfig = JSON.parse(sessionStorage.getItem('msal-configData'));
if (getMsalConfig) {
    myMSALObj = new Msal.UserAgentApplication(msalConfig);
    // Register Callbacks for redirect flow;
    myMSALObj.handleRedirectCallback(authRedirectCallBack);
    // checkBrowserType();
    var authenticated = !!myMSALObj.getAccount();
}

function authRedirectCallBack(error, response) {
    if (error) {
        console.log('error from authRedirectCallBack', error);
    } else {
        if (response.tokenType === 'access_token') {
            console.log('access token type is:' + response.tokenType);
        } else {
            console.log('token type is:' + response.tokenType);
        }
    }
}
