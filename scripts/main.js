function setup()
{
    createCanvas(700, 700).parent('canvasContainer')
    angleMode(DEGREES)
}

class Particle
{
    constructor(posX, posY, speedX, speedY)
    {
        this.posX = posX
        this.posY = posY
        this.speedX = speedX
        this.speedY = speedY
    }
}

class Vector
{
    constructor(posX, posY, dir, accX, accY)
    {
        this.posX = posX
        this.posY = posY
        this.dir = Math.floor(Math.random() * 360)
        this.accX = accX
        this.accY = accY
    }
}

let system = 
{
    canvasWidth : 700,
    canvasHeight : 700,
    vectorsGridWidth : 50,
    vectorsGridHeight : 50,
    vectorSize : 150,

    vectorsMatrix : [],
    particlesMatrix : [],

    mousePosX : 0,
    mousePosY : 0,

    init()
    {
        const stepX = this.canvasWidth / this.vectorsGridWidth
        const stepY = this.canvasHeight / this.vectorsGridHeight

        for (let i = 0; i < this.vectorsGridHeight; i++)
        {
            const tab = []
            for (let j = 0; j < this.vectorsGridWidth; j++)
            {
                tab.push(new Vector(i * stepY, j * stepX, 0, 0, 0))
            }
            this.vectorsMatrix.push(tab)
        }
        console.log(this.vectorsMatrix)
    },

    drawVectors()
    {
        for (let i = 0; i < this.vectorsMatrix.length; i++)
        {
            for (let j = 0; j < this.vectorsMatrix[i].length; j++)
            {
                const x = cos(this.vectorsMatrix[i][j].dir) * this.vectorSize
                const y = sin(this.vectorsMatrix[i][j].dir) * this.vectorSize
                line(this.vectorsMatrix[i][j].posX, this.vectorsMatrix[i][j].posY, this.vectorsMatrix[i][j].posX + x, this.vectorsMatrix[i][j].posY + y)
            }
        }
    },
}
system.init()

function mouseMoved(event)
{
    system.mousePosX = event.offsetX
    system.mousePosY = event.offsetY
}

function draw()
{
    clear()
    system.drawVectors()
}