


const calculateButton = document.querySelector('#calculateButton');
calculateButton.addEventListener('click', () => {
  fetch('https://data.cityofnewyork.us/resource/qgc5-ecnb.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const sugarData = data.filter(item => item.sugar);
      console.log('Sugar data:', sugarData);
      if (sugarData.length === 0) {
        console.log('No data found for the Sugar category.');
        return;
      }

      // Calculate the average amount of sugar
      sugarAmounts = sugarData.map(item => {
        const value = parseFloat(item.sugar);
        return isNaN(value) ? 0 : value;
      });
      console.log('Sugar amounts:', sugarAmounts);
      const sugarAverage = (sugarAmounts.reduce((acc, cur) => acc + cur, 0) / sugarAmounts.length).toFixed(2);

      // Find the highest amount of sugar
      const finiteSugarAmounts = sugarAmounts.filter(amount => isFinite(amount));
      console.log('Finite sugar amounts:', finiteSugarAmounts);
      const sugarHighest = finiteSugarAmounts.length > 0 ? Math.max(...finiteSugarAmounts).toFixed(2) : 'N/A';

      // Find the lowest amount of sugar
      const sugarLowest = finiteSugarAmounts.length > 0 ? Math.min(...finiteSugarAmounts).toFixed(2) : 'N/A';

      // Display the results on the HTML page
      const averageElement = document.querySelector('#result p:nth-of-type(1)');
      const highestElement = document.querySelector('#result p:nth-of-type(2)');
      const lowestElement = document.querySelector('#result p:nth-of-type(3)');
      averageElement.textContent = `Average amount of sugar: ${sugarAverage} grams`;
      highestElement.textContent = `Highest amount of sugar: ${sugarHighest} grams`;
      lowestElement.textContent = `Lowest amount of sugar: ${sugarLowest} grams`;

      const womenValue = 24;
      const menValue = 36;
      const highestValue = 184;
      const averageValue = 31;
      const lowestValue = 0;

      const womenBar = document.getElementById("women");
      const menBar = document.getElementById("men");
      const highestBar = document.getElementById("highest");
      const averageBar = document.getElementById("average");
      const lowestBar = document.getElementById("lowest");

      womenBar.style.height = (womenValue / highestValue * 100) + "%";
      menBar.style.height = (menValue / highestValue * 100) + "%";
      highestBar.style.height = "100%";
      averageBar.style.height = (averageValue / highestValue * 100) + "%";
      lowestBar.style.height = (lowestValue / highestValue * 100) + "%";
    })
    .catch(error => console.error(error));
});







