function setup()
{
    createCanvas(700, 700).parent('canvasContainer')
    angleMode(DEGREES)
    frameRate(60)

    system.init()
}

class Particle
{
    constructor(posX, posY, velX, velY)
    {
        this.posX = posX
        this.posY = posY
        this.velX = velX
        this.velY = velY
    }
}

class Vector
{
    constructor(posX, posY, accX, accY)
    {
        this.posX = posX
        this.posY = posY
        this.dir
        this.accX = accX
        this.accY = accY
    }
}

let system = 
{
    // SYSTEM PROPERTIES
    canvasWidth : 700,
    canvasHeight : 700,
    vectorsGridWidth : 50,
    vectorsGridHeight : 50,
    vectorSize : 10,

    vectorsMatrix : [],
    particlesMatrix : [],

    // NOISE PROPERTIES
    noiseScaleXY : 0.2,
    noiseScaleZ : 0.01,
    zoff : 0,

    // IF NEEDED LATER
    mousePosX : 0,
    mousePosY : 0,

    init()
    {
        // CREATING A MATRIX OF VECTORS ACCORDING TO PROPERTIES OF THE SYSTEM
        const stepX = this.canvasWidth / this.vectorsGridWidth
        const stepY = this.canvasHeight / this.vectorsGridHeight
        for (let i = 0; i < this.vectorsGridHeight; i++)
        {
            const tab = []
            for (let j = 0; j < this.vectorsGridWidth; j++)
            {
                tab.push(new Vector(i * stepY + stepY / 2, j * stepX + stepY / 2, 0, 0))
            }
            this.vectorsMatrix.push(tab)
        }
        console.log(this.vectorsMatrix)
    },

    defineVectors()
    {
        for (let i = 0; i < this.vectorsMatrix.length; i++)
        {
            for (let j = 0; j < this.vectorsMatrix[i].length; j++)
            {
                this.vectorsMatrix[i][j].dir = noise(i * this.noiseScaleXY, j * this.noiseScaleXY, this.zoff * this.noiseScaleZ) * 720

                // DRAWING VECTORS
                const x = cos(this.vectorsMatrix[i][j].dir) * this.vectorSize
                const y = sin(this.vectorsMatrix[i][j].dir) * this.vectorSize
                line(this.vectorsMatrix[i][j].posX, this.vectorsMatrix[i][j].posY, this.vectorsMatrix[i][j].posX + x, this.vectorsMatrix[i][j].posY + y)
            }
        }
        this.zoff++
    },
}

// IF NEEDED LATER
function mouseMoved(event)
{
    system.mousePosX = event.offsetX
    system.mousePosY = event.offsetY
}

function draw()
{
    clear()
    system.defineVectors()
}