# [React weather application](https://jenhakk.github.io/react-weather-app/)

**Creator: [Jenna Hakkarainen](https://github.com/jenhakk)**

![image](https://user-images.githubusercontent.com/75015030/183864544-a2a1fb2b-cf59-4993-bd89-6779ad309ca3.png)

### This is a step-by-step guide on how to build a simple weather application with React using AccuWeather API. You should have some basic knowledge of web development, such as HTML, CSS and JavaScript.

## 1. Creating React project

To create React applications you need to have **node.js**, **npm (Node Package Manager)** and **code editor** installed. 
Check the basics of React and how to set up required tools from [here.](https://github.com/jenhakk/React.js_Fundamentals) 

After installations, start by opening your chosen code editor. In this project I’m using **Visual Studio Code**. 
Open folder/workspace where you want to create your application. 
Then open a new terminal and create a new React project by typing next command to it:

`npx create-react-app weatherapp`

This creates a new folder that is named according to the project name. Then move to project:

`cd weatherapp`

Start the project with command:

`npm start`

This opens project to browser in the port 3000.

![image](https://user-images.githubusercontent.com/75015030/183838655-3590252e-f658-4055-b4c2-cb1397ebc285.png)

Open **App.js** file from the editor and delete everything **from the first div element in the return statement**. 
Also delete the **logo import line** and the actual logo from the `src` folder. Add imports for **React** and **UseState Hook**. Now your editor should look like this:

![image](https://user-images.githubusercontent.com/75015030/183836672-41e08cfd-e54b-40fe-b3fe-8939c4495d0d.png)

## 2. Getting API Key

We use AccuWeather’s API in this project, so you have to get the free API key to be able to use it. You can get it from [here.](https://developer.accuweather.com/)

Follow the instructions to register and log in. Once you have logged in you can find e.g. different API References, General Info and your Apps from the navigation.

![image](https://user-images.githubusercontent.com/75015030/183838758-3121398a-4cf3-4dcc-9be0-7ab62bbcdc21.png)

Click **My Apps** and create a new App by clicking **“Add a new App”**. Fill following details:

![image](https://user-images.githubusercontent.com/75015030/183838994-fee1b10b-6e31-4868-b502-2c67667a0471.png)

Now you can find your application in **My Apps**. Click the created App and save your **API Key** for later use.  

*Note! You can only have one application at a time and the free version allows you to make up to 50 requests per day.*

From **API Reference** link you can find all the different APIs that you can use. In this project we will use **Locations API** (City Search) and **Current Conditions API** (Current Conditions).

It’s not good to have the key coded in the same file where you use it, so create a new file for the key and url’s in the `src` folder called `constants.js`. Make variables for the `apikey` and urls `citysearch` and `current` **without** the part of api key and location key, these will be added in the actual code. Then export these so you can use them in the **App.js**. 

![image](https://user-images.githubusercontent.com/75015030/183840118-bd7d21fd-10af-40a0-a3bd-c7f6c3eb2a2e.png)

Import these in **App.js**:

`import { apikey, citysearch, current } from "./constants.js";`

## 3. Search field

We want to have a search field for the user to type the city they want to check the current weather. When user presses **Enter**, `search` event invokes and with `fetch` we get city’s **location key** from AccuWeather APi. Then that location key is being used in next fetch to get **current conditions** of that city.

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

If the pressed key is **Enter** then code will execute the **fetch**. We will use the variables from the `constants.js` and previously saved `city` state in the fetched url. **Result** is changed into **JSON** form. Information we need is in the **object's first index (0)** and we can save them to `details` state with `setDetails` for later use. We are printing the location key with `console.log` to be sure that we actually get the key.

![image](https://user-images.githubusercontent.com/75015030/183843546-ca8cd7a6-de80-4528-b217-0ba4b4f6dccd.png)

Next we continue with another fetch to get **current conditions**. Now we use the `current` url and add the `result[0].Key` and `apikey` in the fetch. Again the result is changed into JSON form and the first index of the object is being saved in the `weather` state with `setWeather`. We can add printing to see what fetched data contains. We also add **error catching** which prints possible errors in the browser’s console.
 
Here is the whole search function:

<pre>
const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${citysearch}cities/search?apikey=${apikey}&q=${city}`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result[0].Key);
          setDetails(result[0]);

          <b>fetch(`${current}${result[0].Key}?apikey=${apikey}`)
            .then((res) => res.json())
            .then((result) => {
              setWeather(result[0]);
              console.log(result[0]);
            })
            .catch((err) => {
              console.error(err);
            });</b>
        });
    }
};
</pre>

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

We can display data with **JSX** (curly brackets). We got the cityname and country from the first fetch (City Search), we just have to know the right keywords to get them. You can find those from **AccuWeather’s API Reference documentation**. For the cityname we use `LocalizedName` and for the country `Country.LocalizedName`. Since we saved them in `details` state we just have to use it front of them.

```
<div>
  <div className="location">
     <div className="cityname">{details.LocalizedName}, {details.Country.LocalizedName}</div>
     <div className="date">1.1.2022</div>
     <div className="time">13:13:00</div>
  </div>
</div>
```

Now if you check the browser, you can see that there is only a blank page. That’s because we haven’t fetched anything yet, so the properties of the `details` are "undefined". We have to make some changes for the code to check if the fetch has been made.

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

### dateBuilder()

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

### getTime()

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

**Browser:**

![image](https://user-images.githubusercontent.com/75015030/183852792-d4575099-bcaf-4fc9-a406-5803fb717302.png)

## 7. Icons

In AccuWeather’s API page you can find numbered [icons for different weathers](https://developer.accuweather.com/weather-icons). You can’t make requests for that page, but when fetching **Current Conditions**, the result shows **WeatherIcon number**. I created a new folder, `icons`, in `public` folder where I saved all the icons and named them with number that equals the one found on the website, e.g. **1.png, 2.png..**. This is a bit of hard work and is not mandatory if you don’t want to use icons on in your application.

![image](https://user-images.githubusercontent.com/75015030/183853278-1929b913-f879-40ed-990b-cf59a48f666a.png)

To use these icons, we have to make a new state for the icon’s source `iconSrc`. It is set in the second fetch with the **folder path**, result’s **WeatherIcon number** and ended with **.png**.

<pre>
function App() {
  const [city, setCity] = useState("");
  const [details, setDetails] = useState({});
  const [weather, setWeather] = useState({});
  <b>const [iconSrc, setIconSrc] = useState("");</b>

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
              <b>setIconSrc(`/icons/${result[0].WeatherIcon}.png`);
              console.log(result[0].WeatherIcon);</b>
              console.log(result[0]);
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
};
</pre>

  
Now we can use only `{iconSrc}`as the source when displaying the icon.

```
<div className="icon-box">
    <img className="icon" src={iconSrc} alt="weathericon" />
</div>
```

![image](https://user-images.githubusercontent.com/75015030/183858274-46fac44d-302d-493b-a296-cef2e87c590d.png)


## 8. Changing backgrounds

Last thing before touching CSS, I wanted to add few backgrounds that change depending on temperature or if it’s day or night. I searched suitable images from [pixabay](https://pixabay.com/) and added them to same folder with the icons. I wanted to display summer scene as default and if it’s daytime or temperature is over 0. If on the other hand it’s nighttime, a night scene is shown, and if temperature is below 0 then a nice snowy scene is displayed.

![image](https://user-images.githubusercontent.com/75015030/183858691-4a023cca-721f-45c8-a0b1-8c86b1abc841.png)

**Default summer scene:**

![image](https://user-images.githubusercontent.com/75015030/183858752-f39d13e7-fb29-4ac0-8603-06d9f51ccd48.png)

**Night scene:**

![image](https://user-images.githubusercontent.com/75015030/183858897-148e569f-f5ba-4ee2-889c-5e1770ba3659.png)


**Winter scene:**

![image](https://user-images.githubusercontent.com/75015030/183858963-e2e84112-29d9-434f-9a2e-82e000c79b47.png)


Now let’s move on to modifying `App.css`.

When project is created it automatically adds **two css files**: `App.css` and `index.css`. We use `App.css` in this project since we only use one component. Open `App.css` and delete all default settings.

For the changing background, I created three different versions of `App` class. Only difference between them is the background-image.

```
.App {
  background-image: url('/public/icons/summerday.png');
  background-size: inherit;
  background-position: center;
  background-repeat: no-repeat;
}

.App.night {
  background-image: url('/public/icons/night.png');
}

.App.winter {
  background-image: url('/public/icons/winterday.jpg');
}
```

**You can see the default summer scene now in the browser:**

![image](https://user-images.githubusercontent.com/75015030/183859657-12033491-424c-43f0-90d3-95e34f3f42bd.png)

Now since we want to have changing background, we have to do some modifications to `App.js`. We add similar if-else sentence as before but a bit more complex version to the first `div` element named `App`. 

![image](https://user-images.githubusercontent.com/75015030/183860453-95a36d51-4e13-477e-bbb7-5c2ca8a04dd5.png)


**Line 77**: First we have to check if we have fetched anything, if not then we just jump straight to **line 83** and show the default image.

**Line 78**: If we have fetched, then check if it’s daytime (this information can also be found from the second fetch result). If not then move to **line 82** and show the night image.

**Line 79**: If it is indeed daytime then check if temperature is **below 0**, if true move to **line 80** and show winter image and if not then move to **line 81** and show the default image of summer.

We can check if program works right by changing the temperature check mark for **greater than 0**, so the winter image is displayed:

![image](https://user-images.githubusercontent.com/75015030/183860499-cab1e12f-9df6-4880-bd6e-793ce8e135ed.png)

Daytime is harder to test since our application only works in Finland and can’t then make search for example some city in other side of the world where it actually is night. But I have tested that also by staying up late and running the code at night :D


## 9. Rest of the CSS

I’ve added some basic values for margins, paddings, elements heights and widths etc. I’m not going to go through these in very detail since it’s only for the visual part and doesn’t affect functionality. I wanted all **texts** to be white and have some shadow to get some contrast and get that app look. 

```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

main {
  padding: 50px;
  min-height: 100vh;
}

.top-box .header {
  color: #FFF;
  font-size: 60px;
  font-weight: 500;
  text-align: center;
  text-shadow: 2px 2px rgba(50, 50, 70, 0.5);
  padding: 25px;
  padding-bottom: 30px;
}

.top-box .start {
  color: #FFF;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  text-shadow: 2px 2px rgba(50, 50, 70, 0.5);
  padding: 25px;
  padding-bottom: 15px;
}
```

For the **search field** I added bit transparency and set some default values to **none**, e.g. border. I also added some shadow and rounded the corners.

```
.search {
  width: 100%;
  margin: 0 0 75px;
}

.search .search-field {
  display: block;
  margin: 0 auto;
  width: 30%;
  padding: 15px;

  appearance: none;
  border: none;
  outline: none;

  background-color: rgb(255, 255, 255, 0.9);
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 5px rgba(0, 0, 0, 0.2);

  color: #313131;
  font-size: 20px;
}
```

I wanted to display **temperature** in an own box so it stands out better from the background so I added background-color with transparency and displayed it in inline-block so the box only contains the numbers and doesn’t stretch to whole page wide. 

```
.weather {
  text-align: center;
}

.weather .temperature {
  position: relative;
  display: inline-block;
  margin: 30px auto;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 15px 25px;

  color: #FFF;
  font-size: 100px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(29, 29, 34, 0.7);
  text-align: center;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.2);
}
```

Lastly, I wanted to add **a light gray background when data is displayed** so it stands out from all backgrounds. The winter image is quite white, so it’s a bit hard to read all texts.

![image](https://user-images.githubusercontent.com/75015030/183861518-4a2e267d-6bda-4993-8158-524187a8c043.png)

So I added some CSS for the div `box` that contains all texts when it is visible. 

```
.box {
  position: relative;
  margin: auto;
  width: 70%;
  height: 90%;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(160, 160, 160, 0.15);
}
```

This needed some changes in `App.js` to work correctly. I added **div below main tag** and made again if-else sentence. It checks if fetch has been made and if so, it shows the box. If not, then the box doesn’t show.

```
<main>
   <div className={typeof weather.WeatherText != "undefined" ? "box" : ""}>
```
*Note! Remember to add the ending tag in the end before end of main tag.*

**Before fetch:**

![image](https://user-images.githubusercontent.com/75015030/183862214-de92e28e-1c35-4e02-94a0-d087f46da87f.png)

**After fetch:**

![image](https://user-images.githubusercontent.com/75015030/183862372-ff6b9a27-f7a1-4e7d-9c13-53f7993cf151.png)


That's it! Now your application is ready for use.

*Note! Now the application only runs on your local device. I have deployed my weather app to GitHub pages and it requires some changes in the program. If you wish to do the same, you can follow instruction from [here](https://github.com/gitname/react-gh-pages). You also have to change code and use environment variable for the icons since program can’t find them anymore. [Here](https://create-react-app.dev/docs/using-the-public-folder/) is some more info about that.*

The changed code looks like this:

`<img className="icon" src={process.env.PUBLIC_URL + iconSrc} alt="weathericon" />`


### Check my [weather application](https://jenhakk.github.io/react-weather-app/) and [full codes](https://github.com/jenhakk/react-weather-app/tree/master)








