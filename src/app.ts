import routes from "@api/routes";
import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { isProduction, origin } from "@config/index";
import {
    errorHandler,
    notFoundHandler,
} from "@api/middlewares/errorMiddleware";
import swaggerDocs from "@utils/swagger";

const port = process.env.PORT || 4000;

const app = express();

// HTTP Request Pipeline
app.set("json spaces", 2);
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors(origin));
app.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.header(
            "Access-Control-Allow-Origin",
            origin.origin === false ? `http://localhost:${port}` : "*"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
            res.status(200).json({});
        }
        next();
    }
);

if (!isProduction) {
    app.use(morgan("dev"));
}

if (isProduction) {
    app.use(
        helmet.contentSecurityPolicy({
            useDefaults: true,
            directives: {
                "img-src": ["'self'", "https: data: blob:"],
            },
        })
    );
    app.use(morgan("combined"));
}

app.use(routes);

app.get("/", (_req: express.Request, res: express.Response) => {
    res.json({
        message: "Node.js Web API",
        docs: `http://localhost:${port}/api/docs`,
    });
});
swaggerDocs(app);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
