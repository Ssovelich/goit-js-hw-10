import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    const inputDelay = form.elements.delay.value;
    const inputState = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {    
        setTimeout(() => {
        if (inputState === 'fulfilled') {
            resolve();
        } else {
            reject();
        }
        }, inputDelay);
    });
    
    promise.then(
    value => {
        iziToast.show({
            iconUrl: '..//img/bi_check2-circle.png',
            title: 'OK',
            titleColor: 'white',
            message: `Fulfilled promise in ${inputDelay}ms`,
            messageColor: 'white',
            position: 'topRight',
            color: '#59a10d',
        })
     },
    error => {
        iziToast.show({
            iconUrl: '..//img/bi_x-octagon.png',
            title: 'Error',
            titleColor: 'white',
            message: `Rejected promise in ${inputDelay}ms`,
            messageColor: 'white',
            position: 'topRight',
            color: '#ef4040',
        })
    }
);
    form.reset();
};