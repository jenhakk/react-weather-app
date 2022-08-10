# React weather application

### This is a step-by-step guide on how to build a simple weather application with React using AccuWeather API. You should have some basic knowledge of web development, such as HTML and CSS.

## 1. Creating React project

To create React applications you need to have node.js, npm (Node Package Manager) and code editor installed. 
Check the basics of React and how to set up required tools from [here.](https://github.com/jenhakk/React.js_Fundamentals) 

After installations, start by opening your chosen code editor. In this project I’m using Visual Studio Code. 
Open folder/workspace where you want to create your application. 
Then open a new terminal and create a new React project by typing next command to it:

`npx create-react-app weatherapp`

This creates a new folder that is named according to the project name. Then move to project folder and start the project by typing:

`cd weatherapp`

Start the project with command:

`npm start`

This opens project to browser in the port 3000.

![image](https://user-images.githubusercontent.com/75015030/183838655-3590252e-f658-4055-b4c2-cb1397ebc285.png)

Open **App.js** file from the editor and delete everything from the first div element in the return statement. 
Also delete the logo import line and the actual logo from the src folder. Add imports for React and UseState Hook. Now your editor should look like this:

![image](https://user-images.githubusercontent.com/75015030/183836672-41e08cfd-e54b-40fe-b3fe-8939c4495d0d.png)

## 2. Getting API Key

We use AccuWeather’s API in this project, so you have to get the free API key to be able to use it. You can get it from [here.](https://developer.accuweather.com/)

Follow the instructions to register and log in. Once you have logged in you can find e.g. different API References, General Info and your Apps from the navigation.

![image](https://user-images.githubusercontent.com/75015030/183838758-3121398a-4cf3-4dcc-9be0-7ab62bbcdc21.png)

Click **My Apps** and create a new App by clicking **“Add a new App”**. Fill following details:

![image](https://user-images.githubusercontent.com/75015030/183838994-fee1b10b-6e31-4868-b502-2c67667a0471.png)

Now you can find your application in My Apps. Click the created App and save your API Key for later use.  
*Note! You can only have one application at a time and the free version allows you to make up to 50 requests per day.*

From **API Reference** link you can find all the different APIs that you can use. In this project we will use **Locations API** (City Search) and **Current Conditions API** (Current Conditions).

It’s not good to have the key coded in the same file where you use it, so create a new file for the key and url’s in the `src` folder called `constants.js`. Make variables for the `apikey` and urls for `citysearch` and `current` without the part of api key and location key, these will be added in the actual code. Then export these so you can use them in the **App.js**. 

![image](https://user-images.githubusercontent.com/75015030/183840118-bd7d21fd-10af-40a0-a3bd-c7f6c3eb2a2e.png)

Import these in **App.js**:

`import { apikey, citysearch, current } from "./constants.js";`

## 3. Search field

We want to have a search field for user to type the city they want to check the current weather. When user presses Enter, `search` event invokes and with fetch we get city’s **location key** from AccuWeather APi. Then that location key is being used in next fetch to get current conditions of that city.

Let’s create all necessary states inside function App:

```
const [city, setCity] = useState("");
const [details, setDetails] = useState({});
const [weather, setWeather] = useState({});
```

`city` is for saving typed city name, `details` is for saving objects from the first fetch (City Search) and `weather` is for saving objects from the second fetch (Current Conditions).

Next add new `div` for search field inside `return` statement and `<div className="App">` and add following attributes for it:

```
<div className="search">
     <input
        className="search-field"
        placeholder="Enter city.."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={search}
      />
 </div>
 ```
 
Input's value is the `city` state which is saved with `onChange` event as the user is typing city name to the input field. `onKeyPress` event triggers the `search` function.


## 4. Fetching data

Next we create the `search` function:

```
const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${citysearch}cities/search?apikey=${apikey}&q=${city}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0].Key);
          setDetails(result[0]);
    })
  }
};
```

If the pressed key is **Enter** then code will execute the **fetch**. We will use the variables from the `constants.js` and previously saved `city` state in the fetched url. **Result** is changed in the **JSON** form. Information we need is in the **object's first index (0)** and we can save them to `details` state with `setDetails` for later use. We are printing the location key with `console.log` to be sure that we actually get the key.

![image](https://user-images.githubusercontent.com/75015030/183843546-ca8cd7a6-de80-4528-b217-0ba4b4f6dccd.png)

Next we continue with another fetch to get **current conditions**. Now we use the `current` url and add the `result[0].Key` and `apikey` in the fetch. Again the result is changed into JSON form and the first index of the object is being saved in the `weather` state with `setWeather`. We can add printing to see what fetched data contains. We also add **error catching** which prints possible errors in the browser’s console.
 
Here is the whole search function:

```
const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${citysearch}cities/search?apikey=${apikey}&q=${city}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0].Key);
          setDetails(result[0]);

          fetch(`${current}${result[0].Key}?apikey=${apikey}`)
            .then((res) => res.json())
            .then((result) => {
              setWeather(result[0]);
              console.log(result[0]);
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
};
```

Fetched data in the console:

![image](https://user-images.githubusercontent.com/75015030/183844341-98842afb-7dfd-4e41-b641-e1a76ff8adfd.png)

## 5. Displaying data

Now that we have successfully fetched the data we want, we can start creating UI for it. For this we need to create elements for different information. I created everything inside `<main>` and one big `div` called **box** which contains following divs:

- **top-box**: welcome and instruction texts
- **search**: search-field
- **location**: cityname, date and time
- **weather**: temperature, conditions and weather icon (this will be handled later)

In the code:

![image](https://user-images.githubusercontent.com/75015030/183845572-985e181d-dbc0-4282-98ca-70d2cc7c8c49.png)

In the browser:

![image](https://user-images.githubusercontent.com/75015030/183845698-7a31ad3b-39a0-4ce7-8966-53b8e2a6e74f.png)

Now all the information are just hard-coded, so let’s display the actual data we fetched.

We can display data with **JSX** (curly brackets). We got the cityname and country from the first fetch (City Search), we just have to know the right keywords to get them. You can find those from **AccuWeather’s API Reference documentation**. For the cityname we use `LocalizedName` and for the country `Country.LocalizedName`. Since we saved then in `details` state we just have to use it front of them.

```
<div>
  <div className="location">
     <div className="cityname">{details.LocalizedName}, {details.Country.LocalizedName}</div>
     <div className="date">1.1.2022</div>
     <div className="time">13:13:00</div>
  </div>
</div>
```

Now when you check the browser, you can see that there is only a blank page. That’s because we haven’t fetched anything yet, so the properties of the `details` are "undefined". We have to make some changes for the code to check if the fetch has been made.

We add some **if-else** sentence for the `<div>` to see if details property **Key** is not "undefined". If sentence is **true** (`details.Key` is defined), the page shows everything inside the `<div>`. If **false** then page only renders empty space but the page itself doesn’t crash.

```
{typeof details.Key != "undefined" ? (
  <div>
    <div className="location">
      <div className="cityname">{details.LocalizedName}, {details.Country.LocalizedName}</div>
      <div className="date">1.1.2022</div>
      <div className="time">13:13:00</div>
    </div>
  </div>
) : (" ")}
```

**Before fetching:**

![image](https://user-images.githubusercontent.com/75015030/183849008-d461b232-ecb6-4298-a910-21cca10daaa3.png)


**After fetching:**

![image](https://user-images.githubusercontent.com/75015030/183849068-6e25bc2c-c88a-4e04-8e4d-580c0d879d3a.png)


Now let’s do the same with `weather div`. Now the data we want to display is from the **second fetch** and is saved in `weather` state. That’s why we have to use some property of weather state in the if-else sentence. I have used `WeatherText`. We also want to show the **temperature** rounded so it doesn’t show any decimals. For that we can use `Math.round` function which returns the value of a number to the nearest integer.

```
{typeof weather.WeatherText != "undefined" ? (
    <div>
       <div className="weather">
           <div className="temperature">
              {Math.round(weather.Temperature.Metric.Value)}°C
           </div>
           <div className="conditions">
              {weather.WeatherText}
           </div>
           <div className="icon-box">
              <img className="icon" src="" alt="weathericon" />
           </div>
        </div>
    </div>
 ) : (" ")}
 ```
 
 ## 6. Date and time functions
 
There are multiple ways to get date and time in Javascript but here I have made my own `Datebuilder` function for date and `getTime` function for time. They use Javascript [Date object’s](https://www.w3schools.com/jsref/jsref_obj_date.asp) methods. 

### dateBuilder

We create lists for **month names** and **weekday names** so instead of just getting numbers we can get name of current day and month. We also want to display **day number** and **full year** so we save all those in different variables and then return them.

```
const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
};
```

### getTime

We create one variable `time` that contains **hours**, **minutes** and **seconds** that are separated with `:` . In the end we return `time` variable.

```
const getTime = () => {
  let today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return `${time}`;
};
```

  
When displaying date and time, we only have to call functions inside curly brackets with `new Date()`. I chose to combine both date and time in one div, so now the `time div` is useless and can be removed.

```
{typeof details.Key != "undefined" ? (
   <div>
      <div className="location">
         <div className="cityname">{details.LocalizedName}, {details.Country.LocalizedName}</div>
         <div className="date">{dateBuilder(new Date())} {getTime(new Date())}</div>
      </div>
   </div>
) : (" ")}
```
 
 
















