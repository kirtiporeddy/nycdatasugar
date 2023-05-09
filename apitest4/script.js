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

      // Sort the sugarData array in ascending and descending order based on the sugar property
      const sortedSugarData = sugarData.sort((a, b) => parseFloat(a.sugar) - parseFloat(b.sugar));
      const topFourHighestSugar = sortedSugarData.slice(-100).reverse(); // extract the top 100 highest sugar items
      const topFourLowestSugar = sortedSugarData.slice(0, 100); // extract the top 100 lowest sugar items

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
      console.log('hello')
      topFourHighestSugar.forEach(item => {
        const highSugarContainer = document.createElement('div')
        highSugarContainer.innerHTML = `
        <h3>${item.item_name}</h1>
        <p>restaurant: ${item.restaurant}</p>
        <p>sugar: ${item.sugar} g </p>
        `
        highestElement.appendChild(highSugarContainer);
        console.log('hello')
      });

      let lowestSugarText = '';
      topFourLowestSugar.forEach(item => {
        const lowestSugarContainer = document.createElement('div')
        lowestSugarContainer.innerHTML = `
        <h3>${item.item_name}</h1>
        <p>restaurant: ${item.restaurant}</p>
        <p>sugar: ${item.sugar} g </p>
        `
        lowestElement.appendChild(lowSugarContainer);
        console.log('hello')
        lowestSugarText += `${item.item_name} (restaurant: ${item.restaurant || 'Unknown'}, sugar: ${item.sugar}g), `;
      });
      lowestElement.textContent = `Top 100 items with the lowest sugar: ${lowestSugarText.slice(0, -2)}`;
    })
    .catch(error => console.error(error));
});

