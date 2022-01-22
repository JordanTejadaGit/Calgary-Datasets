
var searchValue = [];

function InitializeWebPageBuildingPermits() {
	loaddataBuildingPermits();
    var element = document.getElementById('permitnum');
	if (element) {
		element.addEventListener('keyup', SearchForPermitNum, false);
	}
    var element = document.getElementById('communityName');
	if (element) {
		element.addEventListener('keyup', SearchForCommunity, false);
	}
    var element = document.getElementById('address');
	if (element) {
		element.addEventListener('keyup', SearchForAddress, false);
	}

}
function loaddataBuildingPermits() {
var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function() {
 if (xhr.readyState == 4 && xhr.status == 200) {
 displayData(xhr);
 }
};
xhr.open("GET", "https://data.calgary.ca/resource/c2es-76ed.json",
true);
xhr.send(); 
}

function SearchForPermitNum() {
    var element = document.getElementById('permitnum');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoBuildingPermits(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.permitnum.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowBuildingPermits(findRecord, rowId);
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
function SearchForCommunity() {
    var element = document.getElementById('communityName');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoBuildingPermits(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (!findRecord.communityname) {}
                else if (findRecord) {
                    
                    if (findRecord.communityname.toLowerCase().startsWith(findValue)) {
                        
                        rowId++;
                        var match = OutputDataRowBuildingPermits(findRecord, rowId);
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
function SearchForAddress() {
    var element = document.getElementById('address');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoBuildingPermits(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (!findRecord.locationaddresses) {}
                else if (findRecord) {
                    
                    if (findRecord.locationaddresses.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowBuildingPermits(findRecord, rowId);
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

		var htmlFragment = GridHeaderInfoBuildingPermits(true);
		var rowId = 0;
		for (var idx = 0; idx < searchdata.length; idx++) {
			var fundData = searchdata[idx];
			rowId++;
			var rowHtmlFragment = OutputDataRowBuildingPermits(fundData, rowId);
            if (rowHtmlFragment) {
                htmlFragment += rowHtmlFragment;
            }
		}
		element.innerHTML = htmlFragment;
	}
}


function GridHeaderInfoBuildingPermits(showTotalRecords) {
    var htmlFragment = "";
    if (showTotalRecords) {
        htmlFragment += `<div id='hdr-rows'>There are ${searchValue.length} rows in the data set</div>
        `;
    }
    htmlFragment += `
        <div id='hdr-fundData' class='header'>
			<span id='hdr-rowid'>Row Number</span>
            <span id='hdr-permitnum'>Permit Number</span>
            <span id='hdr-locationaddresses'>Location Address</span>
            <span id='hdr-communityname'>Community</span>
            <span id='hdr-latitude'>Latitude</span>
            <span id='hdr-longitude'>Longitude</span>
            <span id='hdr-estprojectcost'>Estimated Cost</span>
            <span id='hdr-google'>Google Maps</span>
        </div>
        <br/>
                `;
    return htmlFragment;
}

function OutputDataRowBuildingPermits(searchdata, rowId) {
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
        <span class='row-permitnum'>${searchdata.permitnum}</span>
		<span class='row-locationaddresses'>${searchdata.locationaddresses}</span>
		<span class='row-communityname'>${searchdata.communityname}</span>
        <span class='row-latitude'>${searchdata.latitude}</span>
        <span class='row-longitude'>${searchdata.longitude}</span>
        <span class='row-estprojectcost'>$${searchdata.estprojectcost}</span>
        <span class='row-google'><a href="https://maps.google.com/?q=${searchdata.latitude},${searchdata.longitude}">Click Here to see Map</a></span>
	</div> <br>                  
				`;
    return rowHtmlFragment;
}