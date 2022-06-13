const COUNTRIES = ["Afghanistan",
    "Angola",
    "Albania",
    "United Arab Emirates",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Burundi",
    "Belgium",
    "Belgium",
    "Burkina Faso",
    "Bangladesh",
    "Bulgaria",
    "Bosnia and Herzegovina",
    "Belarus",
    "Belize",
    "Bolivia",
    "Brazil",
    "Brunei Darussalam",
    "Bhutan",
    "Botswana",
    "Central African Republic",
    "Canada",
    "Switzerland",
    "China",
    "Ivory Coast",
    "Cameroon",
    "Democratic Republic of the Congo",
    "Republic of Congo",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Czech Republic",
    "Germany",
    "Djibouti",
    "Denmark",
    "Dominican Republic",
    "Algeria",
    "Ecuador",
    "Egypt",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Finland",
    "Gabon",
    "United Kingdom",
    "Georgia",
    "Ghana",
    "Guinea",
    "The Gambia",
    "Guinea-Bissau",
    "Equatorial Guinea",
    "Greece",
    "Greenland",
    "Guatemala",
    "Guyana",
    "Honduras",
    "Croatia",
    "Haiti",
    "Hungary",
    "Indonesia",
    "India",
    "Ireland",
    "Iran",
    "Iraq",
    "Iceland",
    "Israel",
    "Italy",
    "Jamaica",
    "Jordan",
    "Japan",
    "Kazakhstan",
    "Kenya",
    "Kyrgyzstan",
    "Cambodia",
    "Republic of Korea",
    "Kuwait",
    "Lao PDR",
    "Lebanon",
    "Liberia",
    "Libya",
    "Sri Lanka",
    "Lesotho",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Morocco",
    "Moldova",
    "Madagascar",
    "Mexico",
    "Macedonia",
    "Mali",
    "Myanmar",
    "Montenegro",
    "Mongolia",
    "Mozambique",
    "Mauritania",
    "Malawi",
    "Malaysia",
    "Namibia",
    "Niger",
    "Nigeria",
    "Nicaragua",
    "Norway",
    "Nepal",
    "Oman",
    "Pakistan",
    "Panama",
    "Peru",
    "Philippines",
    "Papua New Guinea",
    "Poland",
    "North Korea",
    "Paraguay",
    "Palestine",
    "Qatar",
    "Romania",
    "Rwanda",
    "Western Sahara",
    "Saudi Arabia",
    "Sudan",
    "South Sudan",
    "Senegal",
    "Sierra Leone",
    "El Salvador",
    "Serbia",
    "Suriname",
    "Slovakia",
    "Slovenia",
    "Sweden",
    "Swaziland",
    "Syria",
    "Chad",
    "Togo",
    "Thailand",
    "Tajikistan",
    "Turkmenistan",
    "Timor-Leste",
    "Tunisia",
    "Turkey",
    "Taiwan",
    "Tanzania",
    "Uganda",
    "Ukraine",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Somalia",
    "Kosovo",
    "South Africa",
    "New Zealand",
    "Chile",
    "Netherlands",
    "Portugal",
    "Russian Federation",
    "Spain",
    "France",
    "United States",
    "French Guiana",
    "Aruba",
    "Anguilla",
    "American Samoa",
    "Antigua and Barbuda",
    "Bahrain",
    "Bahamas",
    "Saint-Barthélemy",
    "Bermuda",
    "Barbados",
    "Comoros",
    "Cape Verde",
    "Curaçao",
    "Cayman Islands",
    "Cyprus",
    "Dominica",
    "Falkland Islands",
    "Faeroe Islands",
    "Federated States of Micronesia",
    "Grenada",
    "Guam",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint-Martin",
    "Maldives",
    "Marshall Islands",
    "Malta",
    "Northern Mariana Islands",
    "Montserrat",
    "Mauritius",
    "New Caledonia",
    "Nauru",
    "Palau",
    "Puerto Rico",
    "French Polynesia",
    "Solomon Islands",
    "São Tomé and Principe",
    "Sint Maarten",
    "Seychelles",
    "Turks and Caicos Islands",
    "Tonga",
    "Trinidad and Tobago",
    "Tuvalu",
    "Saint Vincent and the Grenadines",
    "British Virgin Islands",
    "United States Virgin Islands",
    "Vanuatu",
    "Samoa",
    "Canary Islands",
    "Mayotte",
    "Reunion",
    "Guadeloupe",
    "Fiji"
]

const KEYS = {
    "KeyR": "red",
    "KeyG": "green",
    "KeyB": "blue"
}

const COLORS = {
    "empty": "",
    "red": "rgb(255,0,0)",
    "green": "rgb(0,255,0)",
    "blue": "rgb(0,0,255)",
}

const EXPORT_JSON_FILENAME = "map.json"

function autocompleteMatch(input) {
    if (input == '') {
      return [];
    }
    var reg = new RegExp(input.trim().toUpperCase())
    return COUNTRIES.filter(function(term) {
        if (term.toUpperCase().match(reg)) {
          return term;
        }
    });
}

function showResults(val) {
    searchBoxCleanUp()
    let list = '';
    let terms = autocompleteMatch(val);
    for (i=0; i<terms.length; i++) {
      list += '<li>' + terms[i] + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}

function searchBoxCleanUp() {
    res = document.getElementById("result");
    res.innerHTML = '';
}

// select country from list
$(document).ready(function() {
    $("#result").on('click', 'li', function() {
        var text = $(this).text();
        var input = $('#q');
        input.val(text);
    });
});

function mapCleanUp() {
    const elements = document.querySelectorAll('path');
    Array.from(elements).forEach((element, index) => {
        if (element.style.opacity == 1) {
            element.style.opacity = .5
        }
    });
}

// find button event
$(document).ready(function(){
    $("i").click(function(){
        searchedCountry = $('#q').val().trim().toUpperCase()
        $('#q').val('');
        searchBoxCleanUp();
        console.log(searchedCountry)
        mapCleanUp()
        const elements = document.querySelectorAll('path');
        Array.from(elements).forEach((element, index) => {
            if (ClassIsCountryName(element.classList, searchedCountry) ||
            (element.getAttribute('name') != null && element.getAttribute('name').toUpperCase() == searchedCountry)) {
                element.style.opacity = 1
            }
        });
});
});

function ClassIsCountryName(classList, searchedCountry) {
    if (classList === null){
        return false
    }
    searchedTokens = searchedCountry.split(' ')
    if (classList.length != searchedTokens.length){
        return false
    }
    let i = 0
    while (i < classList.length){
        if (classList[i].toUpperCase() != searchedTokens[i]){
            return false
        }
        i++;
    }
    return true
}

document.addEventListener('keypress', colorCountry);

function colorCountry(e) {
    console.log($('#q').is(':focus'));
    if (KEYS[e.code] === undefined || $('#q').is(':focus')){
        return;
    }
    const elements = document.querySelectorAll('path');
    Array.from(elements).forEach((element, index) => {
        if (element.style.opacity == 1 || element.matches(':hover')) {
            element.style.fill = blendColor(element.style.fill, COLORS[KEYS[e.code]])
        }
    });
}

function blendColor(elementColor, color) {
    elementColor = elementColor.replaceAll(', ', ',')
    if (elementColor == COLORS["empty"]){
        elementColor = color
    }
    else if (elementColor == COLORS["red"] && color != COLORS["red"]){
        elementColor = $.xcolor.average(elementColor, color).getCSS();
    }
    else if (elementColor == COLORS["green"] && color != COLORS["green"]){
        elementColor = $.xcolor.average(elementColor, color).getCSS();
    }
    else if (elementColor == COLORS["blue"] && color != COLORS["blue"]){
        elementColor = $.xcolor.average(elementColor, color).getCSS();
    }
    else if (elementColor == $.xcolor.average(COLORS["red"], COLORS["green"]).getCSS() && color != COLORS["red"] && color != COLORS["green"]){
        elementColor = "rgb(0,0,0)";
    }
    else if (elementColor == $.xcolor.average(COLORS["red"], COLORS["blue"]).getCSS() && color != COLORS["red"] && color != COLORS["blue"]){
        elementColor = "rgb(0,0,0)";
    }
    else if (elementColor == $.xcolor.average(COLORS["green"], COLORS["blue"]).getCSS() && color != COLORS["green"] && color != COLORS["blue"]){
        elementColor = "rgb(0,0,0)";
    }
    return elementColor
}

function importJson() {
    var files = document.getElementById('selectFiles').files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }

    var fr = new FileReader();

    fr.onload = function(e) {
      console.log(e);
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);
      colorMap(JSON.parse(formatted))
    }
    fr.readAsText(files.item(0));
};

function exportJson() {
    // Create a blob of the data
    const elements = document.querySelectorAll('path');
    var container = document.getElementById('export');
    if (container.childElementCount != 0) {
        container.innerHTML = "Export: "
    }
    let exportDict = {}
    Array.from(elements).forEach((element, index) => {
        if (element.style.fill != "" && element.style.fill != "#cccccc") {
            let searchedCountry = getCountryName(element)
            exportDict[searchedCountry] = element.style.fill
        }
    });
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportDict));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = EXPORT_JSON_FILENAME;
    a.innerHTML = 'download';
    container.appendChild(a);
}


function colorMap(formatted) {
    const elements = document.querySelectorAll('path');
    let searchedCountry = null
    Array.from(elements).forEach((element, index) => {
        searchedCountry = getCountryName(element)
        if (formatted[searchedCountry] !== undefined) {
            element.style.fill = formatted[searchedCountry]
        }
    });
}

function getCountryName(element) {
    let searchedCountry = null
    if (element.classList != null && element.classList.length != 0) {
        searchedCountry = Array.from(element.classList).join(' ')
    }
    else {
        searchedCountry = element.getAttribute('name')
    }
    return searchedCountry
}