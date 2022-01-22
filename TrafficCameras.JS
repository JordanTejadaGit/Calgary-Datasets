
var searchValue = [];

function InitializeWebPageTrafficCameras() {
	loaddataTrafficCameras();
    var element = document.getElementById('quadrant');
	if (element) {
		element.addEventListener('keyup', SearchForQuadrant, false);
	}
    var element = document.getElementById('cameraLocation');
	if (element) {
		element.addEventListener('keyup', SearchForCameraLocation, false);
	}
    var element = document.getElementById('cameraNumber');
	if (element) {
		element.addEventListener('keyup', SearchForCameraNumber, false);
	}

}
function loaddataTrafficCameras() {
var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function() {
 if (xhr.readyState == 4 && xhr.status == 200) {
 displayData(xhr);
 }
};
xhr.open("GET", "https://data.calgary.ca/resource/k7p9-kppz.json",
true);
xhr.send(); 
}

function SearchForQuadrant() {
    var element = document.getElementById('quadrant');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoTrafficCameras(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.quadrant.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowTrafficCameras(findRecord, rowId);
                        htmlFragment += match;
                    }
                }

            }

            if (rowId == 0) {
                
                htmlFragment += "<span> No matches found </span>";
            }

            
            var searchResults = document.getElementById('SearchResults');
            if (searchResults && searchResults.innerHTML !== undefined) {
                searchResults.innerHTML = htmlFragment;
            }
        }
    }
}
function SearchForCameraLocation() {
    var element = document.getElementById('cameraLocation');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoTrafficCameras(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.camera_location.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowTrafficCameras(findRecord, rowId);
                        htmlFragment += match;
                    }
                }

            }

            if (rowId == 0) {
                
                htmlFragment += "<span> No matches found </span>";
            }

            
            var searchResults = document.getElementById('SearchResults');
            if (searchResults && searchResults.innerHTML !== undefined) {
                searchResults.innerHTML = htmlFragment;
            }
        }
    }
}
function SearchForCameraNumber() {
    var element = document.getElementById('cameraNumber');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoTrafficCameras(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.camera_url.description.toLowerCase().startsWith("camera " + findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowTrafficCameras(findRecord, rowId);
                        htmlFragment += match;
                    }
                }

            }

            if (rowId == 0) {
                
                htmlFragment += "<span> No matches found </span>";
            }

            
            var searchResults = document.getElementById('SearchResults');
            if (searchResults && searchResults.innerHTML !== undefined) {
                searchResults.innerHTML = htmlFragment;
            }
        }
    }
}


function displayData(xhr) {

	var searchdata = JSON.parse(xhr.responseText);
	searchValue = searchdata;

	var element = document.getElementById('searchdata');
	if (element && element.innerHTML !== undefined) {

		var htmlFragment = GridHeaderInfoTrafficCameras(true);
		var rowId = 0;
		for (var idx = 0; idx < searchdata.length; idx++) {
			var fundData = searchdata[idx];
			rowId++;
			var rowHtmlFragment = OutputDataRowTrafficCameras(fundData, rowId);
            if (rowHtmlFragment) {
                htmlFragment += rowHtmlFragment;
            }
		}
		element.innerHTML = htmlFragment;
	}
}


function GridHeaderInfoTrafficCameras(showTotalRecords) {
    var htmlFragment = "";
    if (showTotalRecords) {
        htmlFragment += `<div id='hdr-rows'>There are ${searchValue.length} rows in the data set</div>
        `;
    }
    htmlFragment += `
        <div id='hdr-fundData' class='header'>
			<span id='hdr-rowid'>Row Number</span>
            <span id='hdr-url'>Camera URL</span>
            <span id='hdr-description'>Camera Number</span>
            <span id='hdr-quadrant'>Quadrant</span>
            <span id='hdr-camera_location'>Camera Location</span>
            <span id='hdr-longitude'>Longitude</span>
            <span id='hdr-latitude'>Latitude</span>
            <span id='hdr-google'>Google Maps</span>
        </div>
        <br/>
                `;
    return htmlFragment;
}

function OutputDataRowTrafficCameras(searchdata, rowId) {
    var evenRow = "odd-row";
    if ((rowId + 1) % 2 == 0) {
        evenRow = "even-row"
    }
    else {
        evenRow = "odd-row"
    };

    var rowHtmlFragment = `
	<div id='row-${rowId}' class='row ${evenRow}'>
	<span class ='row-rowid'>${rowId}</span>
        <span class='row-url'><a href="${searchdata.camera_url.url}">${searchdata.camera_url.url}</a></span>
        <span class='row-description'>${searchdata.camera_url.description}</span>
		<span class='row-quadrant'>${searchdata.quadrant}</span>
		<span class='row-camera_location'>${searchdata.camera_location}</span>
        <span class='row-longitude'>${searchdata.point.coordinates[0]}</span>
        <span class='row-latitude'>${searchdata.point.coordinates[1]}</span>
        <span class='row-google'><a href="https://maps.google.com/?q=${searchdata.point.coordinates[1]},${searchdata.point.coordinates[0]}">Click Here to see Map</a></span>
	</div> <br>                  
				`;
    return rowHtmlFragment;
}