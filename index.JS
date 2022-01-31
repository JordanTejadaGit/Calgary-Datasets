

var asynchrequest;

window.addEventListener("load", registerListeners, false);

function RetrieveHTMLPageWithClearAdvanced(id) {
    var formElement = document.getElementById(id);
    if (formElement) {
        formElement.addEventListener("focus", getContentFromData, false);
        formElement.addEventListener("blur", clearContent, false);
    }
    else {
        console.log(`I could not find id of '${id}' so I could not attach a onmouseover event listener`);
    }
}
function getContentFromData(event) {
    debugger;
    var whoWasMousedOver = event.currentTarget;
    if (whoWasMousedOver && whoWasMousedOver.id !== undefined) {
        var element = document.getElementById(whoWasMousedOver.id);
        if (element) {
            var loadFile = element.getAttribute('data_LoadFile');
            if (loadFile) {
                getContent(loadFile);
            }
        }
        else {
            console.log(`I could find the target id of '${whoWasMousedOver.id}' so I could not load it`);
        }
    }
    else {
        console.log("Could not determine the target");
    }

}

function RetrieveHTMLPageWithClear(id, url, isAsync) {
    var findElement = document.getElementById(id);
    if (findElement) {
        findElement.addEventListener("focus", function () { getContent(url); }, isAsync);
        findElement.addEventListener("blur", clearContent, isAsync);
    }
    else {
        console.log(`Could not find element '${id}'. May be too early in page lifecycle, or check id is valid`);
    }
}
function getContent(infopage) {


    asynchrequest = new XMLHttpRequest();


    asynchrequest.onreadystatechange = function () {

        if (asynchrequest.readyState == 4 && asynchrequest.status == 200) {

            var updateElement = document.getElementById("outputform");
            if (updateElement && updateElement.innerHTML !== undefined) {

                var radioButtonPressed = RetrieveRadioButtonValue('injectMethod');

                switch (radioButtonPressed) {

                    case "responseText":

                        console.log(`Text response was \n${asynchrequest.responseText}`);
                        updateElement.innerHTML = asynchrequest.responseText;
                        break;

                    case "parseXMLfromResponseText":

                        var htmlFragment = ParseTextAsXML(asynchrequest.responseText, 'body');
                        console.log(`Text response was \n${asynchrequest.responseText}`);
                        updateElement.innerHTML = asynchrequest.responseText;
                        break;

                    case "responseXML":

                        console.log(`XML response was \n${asynchrequest.responseXML}`);
                        updateElement.innerHTML = asynchrequest.responseXML;
                        break;

                    default:

                        console.log(`Text response was \n${asynchrequest.responseText}`);
                        updateElement.innerHTML = asynchrequest.responseText;
                        break;
                }
                ToggleClassState('outputform', 'hidden', false);
            }
            else {
                console.log(`Could not find element with id 'carinfo' or it doesn't support .innerHTML`);
            }
        }
        else {
            console.log(`Async callback to our logic but .readyState == ${asynchrequest.readyState} && .status == ${asynchrequest.status}`);
        }
    };


    asynchrequest.open("GET", infopage, true);


    asynchrequest.send();


}

function clearContent() {

    ToggleClassState('outputform', 'hidden', true);
}
function registerListeners() {
    var selection = RetrieveRadioButtonValue('selection');
    if (selection == "Traffic Incidents") {
        formElement.addEventListener("focus", function () { getContent("TrafficIncidents.html"); }, false);
        formElement.addEventListener("blur", clearContent, false);
    }
    else if (selection == "Traffic Cameras") {
        formElement.addEventListener("focus", function () { getContent("TrafficCameras.html"); }, false);
        formElement.addEventListener("blur", clearContent, false);
    }
    else if (selection == "Crime Stats") {
        formElement.addEventListener("focus", function () { getContent("CrimeStats.html"); }, false);
        formElement.addEventListener("blur", clearContent, false);
    }
    else if (selection == "Building Permits") {
        formElement.addEventListener("focus", function () { getContent("BuildingPermits.html"); }, false);
        formElement.addEventListener("blur", clearContent, false);
    }
    else {
        RetrieveHTMLPageWithClear('Traffic Incidents', 'TrafficIncidents.html', false);
        RetrieveHTMLPageWithClear('Traffic Cameras', 'TrafficCameras.html', false);
        RetrieveHTMLPageWithClear('Crime Stats', 'CrimeStats.html', false);
        RetrieveHTMLPageWithClear('Building Permits', 'BuildingPermits.html', false);
        RetrieveHTMLPageWithClearAdvanced("demoLab8PartA");

    }

}

alert("Takes a few seconds for the database to load. Please wait a few seconds before searching for data.")