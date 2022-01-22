
var searchValue = [];

function InitializeWebPageTrafficIncidents() {
	loaddataTrafficIncident();
    var element = document.getElementById('idSearch');
	if (element) {
		element.addEventListener('keyup', SearchForId, false);
	}
    var element = document.getElementById('incidentLocation');
	if (element) {
		element.addEventListener('keyup', SearchForIncidentStreet, false);
	}
    var element = document.getElementById('incidentDescription');
	if (element) {
		element.addEventListener('keyup', SearchForIncidentDescription, false);
	}

}
function loaddataTrafficIncident() {
var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function() {
 if (xhr.readyState == 4 && xhr.status == 200) {
 displayData(xhr);
 }
};
xhr.open("GET", "https://data.calgary.ca/resource/35ra-9556.json",
true);
xhr.send(); 
}


function SearchForId() {
    var element = document.getElementById('idSearch');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoTrafficIncidents(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.id.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowTrafficIncidents(findRecord, rowId);
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
function SearchForIncidentStreet() {
    var element = document.getElementById('incidentLocation');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoTrafficIncidents(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.incident_info.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowTrafficIncidents(findRecord, rowId);
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
function SearchForIncidentDescription() {
    var element = document.getElementById('incidentDescription');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoTrafficIncidents(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.description.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowTrafficIncidents(findRecord, rowId);
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

		var htmlFragment = GridHeaderInfoTrafficIncidents(true);
		var rowId = 0;
		for (var idx = 0; idx < searchdata.length; idx++) {
			var fundData = searchdata[idx];
			rowId++;
			var rowHtmlFragment = OutputDataRowTrafficIncidents(fundData, rowId);
            if (rowHtmlFragment) {
                htmlFragment += rowHtmlFragment;
            }
		}
		element.innerHTML = htmlFragment;
	}
}


function GridHeaderInfoTrafficIncidents(showTotalRecords) {
    var htmlFragment = "";
    if (showTotalRecords) {
        htmlFragment += `<div id='hdr-rows'>There are ${searchValue.length} rows in the data set</div>
        `;
    }
    htmlFragment += `
        <div id='hdr-fundData' class='header'>
			<span id='hdr-rowid'>Row Number</span>
            <span id='hdr-incident_info'>Incident Info</span>
            <span id='hdr-description'>Incident Description</span>
            <span id='hdr-start_dt'>Start</span>
			<span id='hdr-longitude'>Longitude</span>
            <span id='hdr-latitude'>Latitude</span>
            <span id='hdr-count'>Count</span>
            <span id='hdr-id'>ID</span>
            <span id='hdr-google'>Google Maps</span>
        </div>
        <br/>
                `;
    return htmlFragment;
}

function OutputDataRowTrafficIncidents(searchdata, rowId) {
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
        <span class='row-incident_info'>${searchdata.incident_info}</span>
        <span class='row-description'>${searchdata.description}</span>
		<span class='row-start_dt'>${searchdata.start_dt}</span>
		<span class='row-longitude'>${searchdata.longitude}</span>
		<span class='row-latitude'>${searchdata.latitude}</span>
		<span class='row-count'>${searchdata.count}</span>
		<span class='row-id'>${searchdata.id}</span>
        <span class='row-google'><a href="https://maps.google.com/?q=${searchdata.latitude},${searchdata.longitude}">Click Here to see Map</a></span>
	</div> <br>                  
				`;
    return rowHtmlFragment;
}