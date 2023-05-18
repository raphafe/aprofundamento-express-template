import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE, TAccount } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts/all", (req: Request, res: Response) => {
    res.send(accounts)
})


app.get("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const results: TAccount = accounts.find(account => account.id === id)
    res.status(200).send(results)
})

app.delete("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const index = accounts.findIndex(account => account.id === id)

    if (index >= 0) {
        accounts.splice(index, 1)
    }

    res.status(200).send("Deletado com sucesso")
})

app.put("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const newId = req.body.idRecebido as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const result : TAccount = accounts.find(account => account.id === id)

    if (result) {
        result.id = newId || result.id
        result.ownerName = newOwnerName || result.ownerName
        result.balance = isNaN(newBalance) ? result.balance : newBalance
        result.type = newType || result.type
    }

    res.status(200).send("Atualização com sucesso")
})