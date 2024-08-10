import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputData = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const spanDays = document.querySelector(`span[data-days]`);
const spanHours = document.querySelector(`span[data-hours]`);
const spanMinutes = document.querySelector(`span[data-minutes]`);
const spanSeconds = document.querySelector(`span[data-seconds]`);

// кнопка Start неактивна поки не обрана валідна дата
startBtn.disabled = true;

startBtn.addEventListener('click', onClick);
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
//   перевірка валідації дати(минуле чи майбутнє)
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
        iziToast.show({
        iconUrl: '..//img/bi_x-octagon.png',
        title: 'Error',
        titleColor: 'white',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        position: 'topRight',
        color: '#ef4040',
      });
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
        userSelectedDate = selectedDates[0];
    }
  },
};

const flatpickrFn = flatpickr('#datetime-picker', options);

const timer = {
    start() {
        // розрахунок інтервалу часу для таймеру
    const id = setInterval(() => {
      const currentTime = new Date();
      const ms = userSelectedDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms);
        // при досягненні лічильником 0, він зупиняється
      if (ms < 1000) {
        clearInterval(id);
        inputData.disabled = false;
      }
    //   записуємо значення днів, годин, хвилин та секунд в span
      spanDays.textContent = addLeadingZero(days);
      spanHours.textContent = addLeadingZero(hours);
      spanMinutes.textContent = addLeadingZero(minutes);
      spanSeconds.textContent = addLeadingZero(seconds);
    }, 1000);
  },
};
// робимо кнопку та інпут неактивними пістя натискання старт
function onClick() {
    startBtn.disabled = true;
    inputData.disabled = true;

    timer.start();
};

// конвертація днів, годин, хвилин та секунд в мілісекунди
function convertMs(ms) {
  // Кількість мілісекунд на одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Решта днів
  const days = Math.floor(ms / day);
  // Решта годин
  const hours = Math.floor((ms % day) / hour);
  // Решта минут
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Решта секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
// додавання 0 в інтерфейсі таймера, якщо в числі менше двох символів
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}