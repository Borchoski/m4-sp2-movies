import { QueryConfig } from "pg";
import { Request, Response, NextFunction } from "express";
import { client } from "./db";
import { iMovie, movieResult } from "./types";

const verifyId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id = +req.params.id;

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

    const queryResult: movieResult = await client.query(QueryConfig);

    if (!queryResult.rowCount) {
        return res.status(404).json({
            message: "Id not found",
        });
    }
    return next();
};

const verifyName = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const movie: iMovie = req.body;

    const queryString = `
    SELECT  
        *
    FROM
        movies
    WHERE
        name = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [movie.name],
    };

    const queryResult: movieResult = await client.query(QueryConfig);

    if (queryResult.rowCount) {
        return res.status(409).json({
            message: "Name already exists",
        });
    }
    return next();
};

export { verifyId, verifyName };
