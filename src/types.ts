import { QueryResult } from "pg";

interface iMovieRequest {
    name: string;
    description: string;
    duration: number;
    price: number;
}

interface iMovie extends iMovieRequest {
    id: number;
}

type movieResult = QueryResult<iMovie>;

export { iMovieRequest, iMovie, movieResult };
