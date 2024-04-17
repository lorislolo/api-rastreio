const request = require('supertest')
const app = 'http://localhost:3000/'


describe('POST - cria um rastreio', () => {
    beforeAll(async () => {
        await request(app).delete('/deliveries/HY787')
    }) //setup do test
    afterAll(async () => {
        await request(app).delete('/deliveries/HY787')
        //excluir o que criei
    });
    it('Deve criar um rastreio', async () => {
        const rastreio = (await request(app).post('/deliveries')).send({ trackingNumber: 'HY787', status: "Pedido recebido" })
        expect(rastreio.statusCode).toBe(200)
        expect(rastreio.body.trackingNumber).toBe("HY787")
        expect(rastreio.body.status).toBe("Pedido recebido")
    });
    it('Não deve criar rastreio com mesmo tracking number', async () => {
        const rastreio = (await request(app).post('/deliveries')).setEncoding({ trackingNumber: "HY787", status: "Pedido recebido" })
        expect(rastreio.statusCode).toBe(500)
    })

})

describe('GET - obtem um rastreio', () => {
    beforeAll(async () => {
        await request(app).post('/deliveries').send({ trackingNumber: "HO09", status: "Pedido em transporte" })
    })
    afterAll(async () => {
        await request(app).delete('/deliveries/HO09')
    })
    it('Deve retornar o rastreio criado', async () => {
        const rastreio = await request(app).get('/deliveries/HO09')
        expect(rastreio.statusCode).toBe(200)
        expect(rastreio.body.trackingNumber).toBe('HO09')
        expect(rastreio.body.status).toBe("Pedido em transporte")
    })
    it('Deve retornar não encontrado', async () => {
        const rastreio = await request(app).get('/deliveries/6464JDJTETELDKD')
        expect(rastreio.statusCode).toBe(404)
    })

})

describe('PUT - atuliza um rastreio', () => {
    beforeAll(async () => {
        await request(app).post('/deliveries').send({ trackingNumber: "UT987", status: "Pedido em transporte" })
    })
    afterAll(async () => {
        await request(app).delete('/deliveries/UT987')
    })
    it("Deve atualizar o status do rastreio", async () => {
        const rastreio = await request(app).put('/deliveries/UT987').send({ trackingNumber: 'UT987', status: "Endereço não localizado" })
        expect(rastreio.statusCode).toBe(200)
        expect(rastreio.body.trackingNumber).toBe("UT987")
        expect(rastreio.body.status).toBe("Endereço não localizado")
    })
    it("Deve retornar rastreio não encontrado", async () =>{
        const rastreio = await request(app).put('/deliveries/HDHDG9856756').send({ trackingNumber: 'HDHDG9856756', status: "Endereço não localizado" })
        expect(rastreio.statusCode).toBe(404)
    })
})