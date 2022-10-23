/* Global Variables */
const API_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = "ab63294fb187e07252e88aef05947277";
// Choosing the elements we need to get the user data from
const zipEle = document.getElementById("zip");
const feelingsEle = document.getElementById("feelings");
const generateButton = document.getElementById("generate");
// Create a new date instance dynamically with JS
const date = new Date();
const today = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
// Generating the data usign the button
generateButton.addEventListener("click", async () => {
  try {
    const data = await weatherTemp(API_URL, zipEle.value, API_KEY);
    const sendingData = await sendToServer({
      date: today,
      temp: data.main.temp,
      feelings: feelingsEle.value,
    });
    console.log(sendingData);
    await updateUI();
  } catch (error) {
    console.log(error);
  }
});
// Getting the weather temperature
async function weatherTemp(url, zipCode, apiKey) {
  const request = await fetch(
    `${url}${zipCode}&appid=${apiKey}&units=imperial`
  );
  try {
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
// Sending the data to the server
async function sendToServer(data = {}) {
  const request = await fetch("/postData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
// Updating the UI
async function updateUI() {
  const request = await fetch("/getData");
  try {
    const response = await request.json();
    document.getElementById("date").innerHTML = response.date;
    document.getElementById("temp").innerHTML = response.temp;
    document.getElementById("content").innerHTML = response.feelings;
  } catch (error) {
    console.log(error);
  }
}
