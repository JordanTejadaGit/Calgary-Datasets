
var searchValue = [];

function InitializeWebPageCrimeStats() {
	loaddataCrimeStats();
    var element = document.getElementById('sector');
	if (element) {
		element.addEventListener('keyup', SearchForSector, false);
	}
    var element = document.getElementById('communities');
	if (element) {
		element.addEventListener('keyup', SearchForCommunityCrime, false);
	}
    var element = document.getElementById('groupCategory');
	if (element) {
		element.addEventListener('keyup', SearchForGroupCategory, false);
	}

}
function loaddataCrimeStats() {
var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function() {
 if (xhr.readyState == 4 && xhr.status == 200) {
 displayData(xhr);
 }
};
xhr.open("GET", "https://data.calgary.ca/resource/848s-4m4z.json",
true);
xhr.send(); 
}

function SearchForSector() {
    var element = document.getElementById('sector');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoCrimeStats(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.sector.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowCrimeStats(findRecord, rowId);
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
function SearchForCommunityCrime() {
    var element = document.getElementById('communities');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoCrimeStats(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.community_name.toLowerCase().startsWith(findValue)) {
                        
                        rowId++;
                        var match = OutputDataRowCrimeStats(findRecord, rowId);
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
function SearchForGroupCategory() {
    var element = document.getElementById('groupCategory');
    if (element && element.value !== undefined) {
        var findValue = element.value;

        if (findValue && findValue.length > 0) {
            var htmlFragment = GridHeaderInfoCrimeStats(false);
            var rowId = 0;

            for (let idx = 0; idx < searchValue.length; idx++) {
                
                var findRecord = searchValue[idx];
                if (findRecord) {
                    
                    if (findRecord.group_category.toLowerCase().startsWith(findValue.toLowerCase())) {
                        
                        rowId++;
                        var match = OutputDataRowCrimeStats(findRecord, rowId);
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

		var htmlFragment = GridHeaderInfoCrimeStats(true);
		var rowId = 0;
		for (var idx = 0; idx < searchdata.length; idx++) {
			var fundData = searchdata[idx];
			rowId++;
			var rowHtmlFragment = OutputDataRowCrimeStats(fundData, rowId);
            if (rowHtmlFragment) {
                htmlFragment += rowHtmlFragment;
            }
		}
		element.innerHTML = htmlFragment;
	}
}


function GridHeaderInfoCrimeStats(showTotalRecords) {
    var htmlFragment = "";
    if (showTotalRecords) {
        htmlFragment += `<div id='hdr-rows'>There are ${searchValue.length} rows in the data set</div>
        `;
    }
    htmlFragment += `
        <div id='hdr-fundData' class='header'>
			<span id='hdr-rowid'>Row Number</span>
            <span id='hdr-sector'>Sector</span>
            <span id='hdr-community_name'>Community Name</span>
            <span id='hdr-group_category'>Group Category</span>
            <span id='hdr-category'>Description</span>
            <span id='hdr-count'>Count</span>
            <span id='hdr-resident_count'>Resident Count</span>
            <span id='hdr-date'>Dare</span>
            <span id='hdr-id'>ID</span>
            <span id='hdr-latitude'>Latitude</span>
            <span id='hdr-longitude'>Longitude</span>
            <span id='hdr-google'>Google Maps</span>
        </div>
        <br/>
                `;
    return htmlFragment;
}

function OutputDataRowCrimeStats(searchdata, rowId) {
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
        <span class='row-sector'>${searchdata.sector}</span>
        <span class='row-community_name'>${searchdata.community_name}</span>
		<span class='row-group_category'>${searchdata.group_category}</span>
		<span class='row-category'>${searchdata.category}</span>
        <span class='row-count'>${searchdata.count}</span>
        <span class='row-resident_count'>${searchdata.resident_count}</span>
        <span class='row-date'>${searchdata.date}</span>
        <span class='row-id'>${searchdata.id}</span>
        <span class='row-latitude'>${searchdata.geocoded_column.latitude}</span>
        <span class='row-longitude'>${searchdata.geocoded_column.longitude}</span>
        <span class='row-google'><a href="https://maps.google.com/?q=${searchdata.geocoded_column.latitude},${searchdata.geocoded_column.longitude}">Click Here to see Map</a></span>
	</div> <br>                  
				`;
    return rowHtmlFragment;
}