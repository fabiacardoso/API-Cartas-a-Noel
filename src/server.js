const app = require("./src/app")
const port = 8080

app.listen(process.env.PORT || port, () => {
    console.log(`App rodando na porta ${port}`)
})
