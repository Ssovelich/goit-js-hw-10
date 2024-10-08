import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconUrl1 from "../img/bi_check2-circle.png";
import iconUrl2 from "../img/bi_x-octagon.png";

const iconOk = iconUrl1;
const iconError = iconUrl2;

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const inputDelay = event.currentTarget.elements.delay.value;
    const inputState = event.currentTarget.elements.state.value;
   
    const promise = new Promise((resolve, reject) => {    
        setTimeout(() => {
        if (inputState === 'fulfilled') {
            resolve(inputDelay);
        } else {
            reject(inputDelay);
        }
        }, inputDelay);
    });
    
    promise
    .then(value => {
        iziToast.show({
            iconUrl: `${iconOk}`,
            title: 'OK',
            titleColor: 'white',
            message: `Fulfilled promise in ${value}ms`,
            messageColor: 'white',
            position: 'topRight',
            color: '#59a10d',
        })
        })
    .catch(error => {
        iziToast.show({
            iconUrl: `${iconError}`,
            title: 'Error',
            titleColor: 'white',
            message: `Rejected promise in ${error}ms`,
            messageColor: 'white',
            position: 'topRight',
            color: '#ef4040',
        })
    });
    form.reset();
};