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

![image](https://user-images.githubusercontent.com/75015030/183836427-640f64a4-e301-45f8-b783-ee1c82f86876.png)

Open App.js file from the editor and delete everything from the first div element in the return statement. 
Also delete the logo import line and the actual logo from the src folder. Add imports for React and UseState Hook. Now your editor should look like this:

![image](https://user-images.githubusercontent.com/75015030/183836672-41e08cfd-e54b-40fe-b3fe-8939c4495d0d.png)

## 2. Getting API Key

We use AccuWeather’s API in this project, so you have to get the free API key to be able to use it. You can get it from [here.](https://developer.accuweather.com/)

Follow the instructions to register and log in. Once you have logged in you can find e.g. different API References, General Info and your Apps from the navigation.

![image](https://user-images.githubusercontent.com/75015030/183836988-480aafb1-79a6-4469-acc6-28efdb92aace.png)






