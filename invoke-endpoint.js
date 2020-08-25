require('log-timestamp');
var AWS = require('aws-sdk');
var sageMakerRuntime = new AWS.SageMakerRuntime();

const ENDPOINT_NAME = 'object-detection-2020-07-13-19-26-21-768';
const VARIANT_NAME = 'AllTraffic';

const main = async (event) => {

  // Initial number (approx.) of requests to send per minute
  var requestsPerMinute = 60;

  // For each request rate, how long do you want to send that level of traffic?
  var minutesPerStepSize = 5;

  // When the rate increases, by how much should it increase?
  var requestStepSize = 30;

  // How many times do you want to increase the rate? 
  var numberOfSteps = 10;

  const MS_PER_MINUTE = 60000;
  var count = 0;

  for (var z = 0; z < numberOfSteps; z++) {
    // Make requests at fixed rate for X number of minutes:
    for (var x = 0; x < minutesPerStepSize; x++) {
        // Make requests within a single minute:
        for (var i = 0; i < requestsPerMinute; i++) {
            await invokeSageMaker();
            var sleepTimeMs = MS_PER_MINUTE / requestsPerMinute;
            await sleep(sleepTimeMs);
            count += 1;
            console.log(`Request ${i}, minute ${x+1} with frequency = ${requestsPerMinute} per minute...`);
    }
  }
  // Requests per minute increase:
  requestsPerMinute += requestStepSize;
}  
  
 
 
  const response = {
    statusCode: 200,
    body: JSON.stringify('Invoke Complete'),
  };
  return response;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function invokeSageMaker() {
    
    var endpointName = ENDPOINT_NAME;
    var variantName = VARIANT_NAME;
    
    var params = {
        Body: 'derp',
        EndpointName: endpointName
    };
    try {
        var responseData = await sageMakerRuntime.invokeEndpoint(params).promise();
        responseData = JSON.parse(Buffer.from(responseData).toString('utf8'));
        console.log(responseData);   
    }
    catch(e) {
        // I didn't bother to modify the invokeEndpoint() params to send a proper request, 
        // and that generates a 4xx error. So, I'm just catching and throwing the error away:
        1;
    }
}

(async () => {
    try {
        await main();
    }
    catch (e) {
        console.log('error: ', e);
    }
})();