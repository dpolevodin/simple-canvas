// Init
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const viewCenterX = canvas.width / 2
const viewCenterY = canvas.height / 2

// Квадрат

// Заливка
ctx.fillStyle = '#FFFFFF'

// Линия
ctx.strokeStyle = '#FFFFFF'
ctx.lineWidth = 5

//
// ctx.strokeRect(50, 50, 400, 400)

// Круг

// ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2, false)
// ctx.fill()

// Простая анимация
// setInterval(() => {
//     ctx.fillStyle = '#000000'
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//
//     ctx.fillStyle = '#FFFFFF'
//     ctx.fillRect(positionX++, 50, 400, 400)
// },100)

// увеличивает размер отрисовки
// ctx.scale(5, 5)

// Поворот на 10 градусов (принимает радианы)
// ctx.rotate(3 * Math.PI / 180)

// Треугольник
// ctx.beginPath()
// ctx.moveTo(50, 50)
// ctx.lineTo(25, 100)
// ctx.lineTo(75, 100)
// ctx.closePath() // аналог ctx.lineTo(50, 50)

// отрисовка треугольника
// ctx.stroke()

// Вывод текста
// ctx.fillStyle = '#FFFFFF'
// ctx.textAlign = 'center'

// Cоздание градиента
let gradient = ctx.createLinearGradient(0, 0, 500, 0)
gradient.addColorStop('0', 'magenta')
gradient.addColorStop('.50', 'blue')
gradient.addColorStop('.100', 'red')

ctx.fillStyle = gradient

ctx.font = '48px Georgia'
ctx.fillText("Hello world!", 50, 100)

