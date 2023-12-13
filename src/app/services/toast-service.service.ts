import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() { };
  showToast(message = '', seconds = 3000) {
    let toastContainer = document.getElementById("toast");
    let toast = toastContainer.childNodes;
    console.log(toastContainer, toast[0]);
    toastContainer.style.bottom = "3%";
    toastContainer.style.opacity = "1";
    toast[0].textContent = message
    setTimeout(() => {
      toastContainer.style.bottom = "-10%";
      toastContainer.style.opacity = "0";
    }, seconds)
  }
}
