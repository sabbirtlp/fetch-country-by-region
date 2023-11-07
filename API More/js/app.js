const loadCountriesRegions = () => {
    const url = `https://restcountries.com/v3.1/all`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayCountriesRegions(data))
}

const displayCountriesRegions = countries => {

    const allRegion = new Set(); 
    countries.forEach(country => {
        allRegion.add(country.region)
        
    })
    
    const uniqueRegions = Array.from(allRegion)
    for(const singleRegion of uniqueRegions){
        const regions = document.getElementById('regions'); 
        const optionTagForRegion = document.createElement('option'); 
        optionTagForRegion.value = singleRegion;
        optionTagForRegion.textContent = singleRegion; 
        regions.appendChild(optionTagForRegion)
    }
}

loadCountriesRegions()



const loadAllCountry = async (region) => {
    try{
        const uri = `https://restcountries.com/v3.1/region/${region}`
        const res = await fetch(uri)
        const data = await res.json() 
        displayAllCountries(data)
    }
    catch(error){
        console.error(error)
    }
}

const displayAllCountries = countries => {
    const countryListContainer = document.getElementById('country-list-container'); 
    countryListContainer.innerHTML = ''; 
    countries.forEach(country => {
        const countryDiv = document.createElement('div'); 
        countryDiv.classList.add('m-4','shadow')
        countryDiv.innerHTML = `
        
        <img class="w-full md:h-[250px] lg:h-[250px]  m-auto block rounded object-cover mt-3" src="${country.flags.png}"/>
        <h2 class="text-[16px] uppercase md:text-xl lg:text-xl font-semibold text-center my-4"> ${country.name.common} </h2>
        
        `
        countryListContainer.appendChild(countryDiv)
    })
}

const filterCountryRegion = () => {
    const regions = document.getElementById('regions');
    const selectedRegion = regions.value; 

    loadAllCountry(selectedRegion);
}

loadAllCountry('americas')



