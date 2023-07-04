let storageSlider = document.querySelector('input[name="storage"]');
let transferSlider = document.querySelector('input[name="transfer"]');
let stSize = document.querySelector(".storage__size");
let trSize = document.querySelector(".transfer__size");
let backblaze = document.querySelector(".backblaze");
let bunny = document.querySelector(".bunny");
let scaleway = document.querySelector(".scaleway");
let vultr = document.querySelector(".vultr");
const backblazeBar = document.querySelector(".backblaze__bar");
const bunnyBar = document.querySelector(".bunny__bar");
const scalewayBar = document.querySelector(".scaleway__bar");
const vultrBar = document.querySelector(".vultr__bar");
let bunnyOption = document.querySelector('select[name="bunny"]');
let scalewayOption = document.querySelector('select[name="scaleway"]');
let priceNums = document.querySelectorAll(".company__price__num");

const objPrice = {
  backblaze: {
    min: 7,
    storage: 0.005,
    transfer: 0.01,
  },
  bunny: {
    max: 10,
    hdd: 0.01,
    ssd: 0.02,
    transfer: 0.01,
  },
  scaleway: {
    multi: 0.01,
    single: 0.03,
    transfer: 0.02,
    free: 75,
  },
  vultr: {
    min: 5,
    storage: 0.01,
    transfer: 0.01,
  },
};

storageSlider.addEventListener("input", (e) => {
  stSize.innerHTML = e.target.value;
});

transferSlider.addEventListener("input", (e) => {
  trSize.innerHTML = e.target.value;
});

bunnyOption.addEventListener("change", () => changePrice());

scalewayOption.addEventListener("change", () => changePrice());

storageSlider.addEventListener("change", (e) => {
  changePrice();
});

transferSlider.addEventListener("change", (e) => {
  changePrice();
});

function changePrice() {
  let storageSize = stSize.innerHTML;
  let transferSize = trSize.innerHTML;
  let backblazePrice = calcBackblazePrice(storageSize, transferSize);
  let bunnyPrice = calcBunnyPrice(storageSize);
  let scalewayPrice = calcScalewayPrice(storageSize, transferSize);
  let vultrPrice = calcVultrPrice(storageSize, transferSize);

  let arr = [+backblazePrice, +bunnyPrice, +scalewayPrice, +vultrPrice];

  let minIndex = arr.indexOf(Math.min.apply(null, arr));

  [...priceNums].map((n, i) => {
    n.previousElementSibling.style.background = "gray";
    n.previousElementSibling.style.width = arr[i] * 15 + 'px'; // изменение ширины блока
    n.innerHTML = arr[i];
    if (i == minIndex) {
      n.previousElementSibling.style.background = "rgb(70 16 91)" ; // изменение цвета самого дешевого тарифа
    }
  });

 
}

function calcBackblazePrice(stSize, trSize) {
  let backblazePrice =
    +stSize * objPrice.backblaze.storage +
    +trSize * objPrice.backblaze.transfer;

  if (backblazePrice > objPrice.backblaze.min) {
    return backblazePrice.toFixed(2);
  } else {
    return objPrice.backblaze.min;
  }
}

function calcBunnyPrice(stSize) {
  let bunnyOpt = bunnyOption.value;

  let bunnyPrice = +stSize * objPrice.bunny[bunnyOpt] + objPrice.bunny.transfer;

  if (bunnyPrice > objPrice.bunny.max) {
    return objPrice.bunny.max;
  } else {
    return bunnyPrice.toFixed(2);
  }
}

function calcScalewayPrice(stSize, trSize) {
  let scalewayOpt = scalewayOption.value;
  let storage = calcScalewayStorage(scalewayOpt, stSize);
  let transfer = calcScalewayTransfer(trSize);

  let scalewayPrice = storage + transfer;

  return scalewayPrice.toFixed(2);
}

function calcScalewayStorage(option, st) {
  if (+st < objPrice.scaleway.free) {
    return 0;
  } else {
    let storage = +st * objPrice.scaleway[option];
    return storage;
  }
}

function calcScalewayTransfer(tr) {
  if (+tr < objPrice.scaleway.free) {
    return 0;
  } else {
    let transfer = +tr * objPrice.scaleway.transfer;
    return transfer;
  }
}

function calcVultrPrice(stSize, trSize) {
  let vultrPrice =
    +stSize * objPrice.vultr.storage + +trSize * objPrice.vultr.transfer;

  if (vultrPrice > objPrice.backblaze.min) {
    return vultrPrice.toFixed(2);
  } else {
    return objPrice.vultr.min;
  }
}
