import { fetchCars, uploadImage } from "./src/services/cars.ts";
import { login } from "./src/services/auth.ts";

async function main() {
    let access = "";
    try {
        const cars = await fetchCars();
        console.log("Fetched cars:", cars);
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }

    // try {
    //     const loginData = await login({
    //         email: "admin@admin.com",
    //         password: "admin",
    //     });
    //     console.log("Login successful:", loginData);
    //     access = loginData.access;
    // } catch (error) {
    //     console.error("Login failed:", (error as Error).message);
    // }

    // try{
    //     const url = await uploadImage(new File([""], "Dashboard.png"), access);
    //     console.log("Image uploaded:", url);

    // } catch (error) {

    // }
}

main();
