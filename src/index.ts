import "@config/index";
import app from "./app";

const port = process.env.PORT || 4000;

app.get("/", (_req, res) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});
