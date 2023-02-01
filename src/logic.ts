import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./db";
import { iMovie, iMovieRequest, movieResult } from "./types";

const getMovies = async (req: Request, res: Response): Promise<Response> => {
    let perPage: any = req.query.perPage === undefined ? 5 : req.query.perPage;
    let page: any = req.query.page === undefined ? 1 : req.query.page;

    if (perPage < 0 || perPage > 5) {
        perPage = 5;
    }
    if (page < 0) {
        page = 1;
    }

    const query: string = `
        SELECT 
            * 
        FROM 
            movies
        LIMIT 
            $1 
        OFFSET
            $2;
        `;
    const queryConfig: QueryConfig = {
        text: query,
        values: [perPage, page - 1],
    };
    const queryResult = await client.query(queryConfig);

    const previousPage =
        page === 0 ? null : `localhost:3000/movies?page=${+page - 1}`;
    const nextPage = `localhost:3000/movies?page=${+page + 1}`;

    return res
        .status(200)
        .json([
            `Next page: ${nextPage}`,
            `Previous page: ${previousPage}`,
            `Count: ${queryResult.rowCount}`,
            ...queryResult.rows,
        ]);
};

const newMovie = async (req: Request, res: Response): Promise<Response> => {
    const movie: iMovieRequest = req.body;

    const query: string = format(
        `
            INSERT INTO
                movies(%I)
            VALUES
                (%L)
            RETURNING *;
        `,
        Object.keys(movie),
        Object.values(movie)
    );

    const queryResult: movieResult = await client.query(query);
    const newMovie: iMovie = queryResult.rows[0];

    return res.status(201).json(newMovie);
};

const updateMovie = async (req: Request, res: Response) => {
    const id: number = +req.params.id;

    const queryString = `
    SELECT  
        *
    FROM
        movies
    WHERE
        id = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: movieResult = await (
        await client.query(QueryConfig)
    ).rows[0];
    console.log(queryResult);

    return res.status(200).json();
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString = `
    DELETE FROM 
        movies 
    WHERE 
        id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const QueryResult: movieResult = await client.query(queryConfig);

    return res.status(204).send();
};

export { getMovies, newMovie, updateMovie, deleteMovie };
