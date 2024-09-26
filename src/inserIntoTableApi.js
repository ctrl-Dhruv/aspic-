import Axios from "axios";

export var insertIntoModule = async () => {
  try {
    const axiosInstance = Axios.create({
      baseURL: "http://localhost:3001",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("hit");
    await axiosInstance
      .post("/modules/insert", {
        id: "3457688",
      })
      .catch((err) => {
        console.log(err);
      });
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
