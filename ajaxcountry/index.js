
        "use strict";

        document.getElementById("btn").addEventListener("click", searchCountry);
        var resultContainer = document.getElementById("resultContainer");

        function searchCountry() {
            var input = document.getElementById('countryInput').value.trim();
            if (input.length < 3) {
                resultContainer.innerHTML = `Please enter at least 3 letters`;
                resultContainer.style.color = "tomato";
                resultContainer.style.fontSize = "20px";
                return;
            }

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var countries = JSON.parse(xmlhttp.responseText);
                    console.log(countries);
                    if (countries.length == 0) {
                        resultContainer.innerHTML = "No Countries Found";
                    } else {
                        resultContainer.innerHTML = ""; 
                        countries.forEach(function(country) {
                            var div = document.createElement('div');
                            div.className = 'country-item col-xl-6';
                            div.innerHTML = `
                                <img src="${country.flags.svg}" alt="${country.name.common} Flag">
                                <span>${country.name.common}</span>
                            `;
                            resultContainer.appendChild(div);
                        });
                    }
                }
            };
            var apipath = `https://restcountries.com/v3.1/name/${input}`;
            xmlhttp.open("GET", apipath, true);
            xmlhttp.send();
        }
   