function setup()
{
    createCanvas(700, 700).parent('canvasContainer')
    angleMode(DEGREES)
    frameRate(60)

    system.init()
}

class Particle
{
    constructor()
    {
        this.pos = createVector(random(width), random(height))
        this.maxVel = 1
        this.vel = createVector(0, 0)
        // this.vel = p5.Vector.random2D()
        this.acc = createVector(0, 0)
    }

    update()
    {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.vel.limit(this.maxVel)
        this.acc.mult(0)
    }

    applyForce()
    {
        let x = Math.abs(Math.round(this.pos.x / width * system.vectorsGridWidth - 1.5))
        let y = Math.abs(Math.round(this.pos.y / height * system.vectorsGridHeight - 1.5))
        let vector = system.vectorsMatrix[x][y]
        this.acc = vector.force.mult(0.05)
    }

    draw()
    {
        noStroke()
        fill('black')
        ellipse(this.pos.x, this.pos.y, system.particlesRadius)
    }

    infiniteConstraint()
    {
        this.pos.x > width ? this.pos.x = 0 : null
        this.pos.x < 0 ? this.pos.x = width : null
        this.pos.y > height ? this.pos.y = 0 : null
        this.pos.y < 0 ? this.pos.y = height : null
    }
}

class Vector
{
    constructor(posX, posY)
    {
        this.pos = createVector(posX, posY)
        this.dir = null
        this.force = createVector()
    }
}

let system = 
{
    // SYSTEM PROPERTIES
    canvasWidth : null,
    canvasHeight : null,

    // VECTORS PROPERTIES
    vectorsGridWidth : 50,
    vectorsGridHeight : 50,
    vectorLength : 10,
    vectorStroke : 2,
    vectorsMatrix : [],

    // PARTICLES PROPERTIES
    numberOfParticles : 1000,
    particlesRadius : 0.5,
    particlesArray : [],

    // NOISE PROPERTIES
    noiseScaleXY : 0.03,
    noiseScaleZ : 0.007,
    zoff : 0,

    // IF NEEDED LATER
    mousePosX : 0,
    mousePosY : 0,

    init()
    {
        this.canvasWidth = width
        this.canvasHeight = height

        this.createVectors()
        this.createParticles()
    },

    createVectors()
    {
        // CREATING A MATRIX OF VECTORS ACCORDING TO PROPERTIES OF THE SYSTEM
        const stepX = this.canvasWidth / this.vectorsGridWidth
        const stepY = this.canvasHeight / this.vectorsGridHeight
        for (let i = 0; i < this.vectorsGridHeight; i++)
        {
            const tab = []
            for (let j = 0; j < this.vectorsGridWidth; j++)
            {
                tab.push(new Vector(i * stepY + stepY / 2, j * stepX + stepY / 2))
            }
            this.vectorsMatrix.push(tab)
        }
        console.log(this.vectorsMatrix)
    },


    updateVectors()
    {

        for (let i = 0; i < this.vectorsMatrix.length; i++)
        {
            for (let j = 0; j < this.vectorsMatrix[i].length; j++)
            {
                // DEFINE DIRECTIONS OF VECTORS ACCORDING TO THE NOISE
                this.vectorsMatrix[i][j].dir = noise(i * this.noiseScaleXY, j * this.noiseScaleXY, this.zoff * this.noiseScaleZ) * 720

                this.vectorsMatrix[i][j].force.x = cos(this.vectorsMatrix[i][j].dir) * this.vectorLength
                this.vectorsMatrix[i][j].force.y = sin(this.vectorsMatrix[i][j].dir) * this.vectorLength
            }
        }
        this.zoff++
    },

    drawVectors()
    {
        for (let i = 0; i < this.vectorsMatrix.length; i++)
        {
            for (let j = 0; j < this.vectorsMatrix[i].length; j++)
            {
                // DRAWING VECTORS
                stroke(10, 100)
                strokeWeight(this.vectorStroke)
                line(this.vectorsMatrix[i][j].pos.x, this.vectorsMatrix[i][j].pos.y, this.vectorsMatrix[i][j].pos.x + this.vectorsMatrix[i][j].force.x, this.vectorsMatrix[i][j].pos.y + this.vectorsMatrix[i][j].force.y)
            }
        }
    },

    createParticles()
    {
        for (let i = 0; i < this.numberOfParticles; i++)
        {
            this.particlesArray.push(new Particle())
        }
        console.log(this.particlesArray)
    },

    updateParticles()
    {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particlesArray[i].applyForce()
            this.particlesArray[i].update()
            this.particlesArray[i].draw()
            this.particlesArray[i].infiniteConstraint()
        }
    }
}

// IF NEEDED LATER
function mouseMoved(event)
{
    system.mousePosX = event.offsetX
    system.mousePosY = event.offsetY
}

function draw()
{
    // clear()
    system.updateVectors()
    // system.drawVectors()
    system.updateParticles()
}