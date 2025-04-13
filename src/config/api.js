/**
 * Common API method
 * @param {string} method GET | POST | DELETE | PATCH
 * @param {string} url /user/id
 * @param {object} params Query parameters
 * @param {object} body API body / Empty by default
 * @param {object} headers API headers are appended to common headers
 * @param {string} baseURL http://api.example.com
 */

// eslint-disable-next-line
export default async (method, baseURL, endPointUrl, isBodyRequired, params = {}, body = {}, headers = {}, bodyDataType = 'application/x-www-form-urlencoded', returnType) => {
    const controller = new AbortController();
    try {
        
        const commonHeaders = {
            // 'Auth-Token': token
            // 'Device-Type': 'web',
            // 'Content-Type': bodyDataType,
            // 'Access-Control-Allow-Origin': '*'
            //'X-Net18': "true",
            //'Pragma': 'akamai-x-get-client-ip, akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values, akamai-x-get-nonces, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key, akamai-x-get-request-id, akamai-x-get-request-id2, akamai-x-rate-limiting-data, akamai-x-serial-no, x-Akamai-Request-Trace, X-Akamai-CacheTrack, akamai-x-feo-trace'
        };
        let RequestParams = {
            method,
            params: { ...params },
            headers: { ...commonHeaders, ...headers },
            signal: controller.signal
        }
        console.log('body :>> ', body);
        if (isBodyRequired) {
            if (bodyDataType === 'X-WWW-FORM-URLENCODED') {
                RequestParams.body = body;
            } else {
                RequestParams.body = JSON.stringify({ ...body });
            }
        }
        
        const res = await fetch(`${baseURL}${endPointUrl}`, RequestParams);
       
        let response;
        if (returnType === 'TEXT') {
            response = res !== undefined ? await res.text() : '';
        }
        else {
            response = res !== undefined ? await res.json() : {};
        }

        return response
    } catch (error) {
        console.log(`Error in API call: ${endPointUrl} Params for that API: ${JSON.stringify(params)} >>>>`,error);
    }
    return()=>{
        controller.abort();
    }
};
