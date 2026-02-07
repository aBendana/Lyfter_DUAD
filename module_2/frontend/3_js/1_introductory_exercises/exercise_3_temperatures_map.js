const myTemperaturesList = [0, 8, 13, 17, 22, 28, 32, 45, 75, 100];

// convert Celsius to Fahrenheit
function celsiusToFanhrenheit(temperaturesCelsiusList) {
  return temperaturesCelsiusList.map(
    (celsiusTemperature) => celsiusTemperature * (9 / 5) + 32,
  );
}

const farenheitTemperatureList = celsiusToFanhrenheit(myTemperaturesList);
console.log(farenheitTemperatureList);
