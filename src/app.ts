import express, { Application } from "express";
import { startDatabase } from "./db";
import { deleteMovie, getMovies, newMovie, updateMovie } from "./logic";
import { verifyId, verifyName, verifyPostMovie } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.listen(3000, async () => {
    await startDatabase();
    console.log("Server is running on port 3000");
});

app.get("/movies", getMovies);
app.post("/movies", verifyPostMovie, verifyName, newMovie);
app.patch("/movies/:id", verifyPostMovie, verifyId, verifyName, updateMovie);
app.delete("/movies/:id", verifyId, deleteMovie);
