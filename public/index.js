const URI = "http://localhost:1400/api/v1/schedule";
const PUBLIC_KEY = "BD77w_08clNeRoRZJfdYQlG9gcHHba3ZCXMsNIEA6JiqDJGGBy8W3aWhJTulN1PbJ3Y1XzAHf935tGj8QYdjt1I";

const form = document.getElementById("my_form");

form.addEventListener("submit", async function (event) {
    try {
        event.preventDefault();
        let input_array = document.getElementById("input_array").value;
        let schedule_array = JSON.parse(input_array);

        /* A service worker is a type of JavaScript worker that runs in the background 
         of a web browser and is responsible for intercepting and managing network 
         requests made by web pages. It acts as a programmable proxy between the web page 
         and the network, allowing developers to control how resources are fetched, 
         cached, and served.*/
        let register;
        await navigator.serviceWorker.register("./worker.js", {
            scope: "/",
        })
            .then(registration => {
                console.log("Registration done!");
                console.log(registration);
                register = registration;
            });
        console.log("Register ---> ", register);

        // if (!("PushManager" in Window)) {
        //     alert("Push notifications are not supported for your browser!");
        //     return;
        // }

        if (Notification.permission === "denied") {
            alert("Permission denied. Needs notification permission!");
            return;
        }

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_KEY,
        });
        console.log("Subscription ---> ", subscription);
        console.log("Schedule array --->", schedule_array);

        const response = await fetch(URI, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                schedule: schedule_array,
                subscription
            }),
        })

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
})