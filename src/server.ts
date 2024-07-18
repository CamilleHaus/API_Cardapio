import { app } from "./app"

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`API Sucessfully started at port ${port}`)
})