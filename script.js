// Инициализация
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const body = document.getElementsByTagName('body')[0];
const bgColorForm = document.getElementById('bg-color-form');
const formFileInput = document.getElementById('formFile');

bgColorForm.addEventListener('change', (e) => {
    changeBrushColor(e.target.value)
})

formFileInput.addEventListener('change', (e) => {
    changeBackgroundImage(e.target.files[0])
})

const saveButton = document.getElementById('saveButton')
const replayButton = document.getElementById('replayButton')
const deleteButton = document.getElementById('deleteButton')

const dropdownThickness4 = document.getElementById('thickness4')
const dropdownThickness8 = document.getElementById('thickness8')
const dropdownThickness16 = document.getElementById('thickness16')
const dropdownThickness24 = document.getElementById('thickness24')
const dropdownThickness32 = document.getElementById('thickness32')

dropdownThickness4.addEventListener('click', () => changeThickness(2))
dropdownThickness8.addEventListener('click', () => changeThickness(4))
dropdownThickness16.addEventListener('click', () => changeThickness(8))
dropdownThickness24.addEventListener('click', () => changeThickness(12))
dropdownThickness32.addEventListener('click', () => changeThickness(16))

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const WIDTH = canvas.width
const HEIGHT = canvas.height

// Переменные, которые можно менять с фронта
let DEFAULT_BACKGROUND_COLOR = '#FFFFFF'
let DEFAULT_STROKE_COLOR = '#000000'
let CIRCLE_RADIUS = 5
let coordinates = []
let isMousedown = false;

// Функция изменения толщины кисти
function changeThickness(thickness) {
    CIRCLE_RADIUS = thickness
}

// Функция изменения цвета кисти
function changeBrushColor(color) {
    DEFAULT_STROKE_COLOR = color
}

// Функция изменения изображения фоа
function changeBackgroundImage(file) {
    const reader = new FileReader();
    reader.onloadend = function(){
        body.style.backgroundImage = "url(" + reader.result + ")";
    }
    if (file){
        reader.readAsDataURL(file);
    }
}

// Скорость воспроизведения по координатам, мс
let replaySpeed = 30

// Хак для непрерывного рисования линия
canvas.addEventListener('mousedown', () => {
    isMousedown = true
})

// Хак для непрерывного рисования линия
canvas.addEventListener('mouseup', () => {
    isMousedown = false

    // Сбрасываем путь, для корректного воспроизведения
    ctx.beginPath();
    coordinates.push('mouseup')
})

// Основная функция рисования, принимает event
const draw = (e) => {
    ctx.lineWidth = CIRCLE_RADIUS * 2
    ctx.fillStyle = DEFAULT_STROKE_COLOR
    ctx.strokeStyle = DEFAULT_STROKE_COLOR

    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, CIRCLE_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
}

// Слушатель для рисования
canvas.addEventListener('mousemove', (e) => {
    if (isMousedown) {
        coordinates.push([e.clientX, e.clientY])
        draw(e)
    }
})

// Очистка рисунка
function clear() {
    ctx.fillStyle = DEFAULT_BACKGROUND_COLOR
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.beginPath();
    ctx.fillStyle = DEFAULT_STROKE_COLOR
}

// Сохранение рисунка
function save() {
    localStorage.setItem('coordinates', JSON.stringify(coordinates))
    localStorage.setItem('thickness', JSON.stringify(CIRCLE_RADIUS))
    alert('Рисунок сохранен')
}

// Воспроизведение рисунка
function replay() {
    let timer = setInterval(async () => {
        if (!coordinates.length) {
            clearInterval(timer)
            ctx.beginPath()
            return;
        }
        let firstPoint = coordinates.shift()
        let e = {
            clientX: firstPoint[0],
            clientY: firstPoint[1]
        }
        draw(e)
    }, replaySpeed)
}

saveButton.addEventListener('click', () => {
    save()
})

replayButton.addEventListener('click', () => {
    coordinates = JSON.parse(localStorage.getItem('coordinates'))
    CIRCLE_RADIUS = JSON.parse(localStorage.getItem('thickness'))
    clear()
    replay()
})

deleteButton.addEventListener('click', () => {
    clear()
})