import { fetchCars, uploadImage } from "./src/services/cars.ts";
import { login } from "./src/services/auth.ts";
import { fetchImageSlider, createImageSlider } from "./src/services/image_slider.ts";

const imageSliderData = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1705747401901-28363172fe7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NTkyNjE4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Luxury Car Showroom",
        title: "Premium Collection",
        description: "Discover our carefully curated selection of luxury vehicles"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1644749700856-a82a92828a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc1OTI2MTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Modern Car Dealership",
        title: "Expert Service",
        description: "Professional guidance from our experienced team"
    },
]

async function api_login(){
    let access = "";
    try {
        const loginData = await login({
            email: "admin@admin.com",
            password: "admin",
        });
        console.log("Login successful:", loginData);
        access = loginData.access;
    } catch (error) {
        console.error("Login failed:", (error as Error).message);
    }

    if (access === ""){
        throw new Error("Access token is empty");
    }

    return access;
}

async function main() {
    let access = "";
    access = await api_login();

    try {
        const cars = await fetchCars();
        console.log("Fetched cars:", cars);
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }

    try{
        const imageSlider = await createImageSlider(imageSliderData[0], access);
        console.log("Created image slider:", imageSlider);
    } catch (error){
        console.error("Error:", (error as Error).message)
    }

    try{
        const imageSliders = await fetchImageSlider();
        console.log("Fetched image sliders:", imageSliders);
    } catch (error){
        console.error("Error: ", (error as Error).message)
    }


    // try{
    //     const url = await uploadImage(new File([""], "Dashboard.png"), access);
    //     console.log("Image uploaded:", url);

    // } catch (error) {

    // }
}

main();
