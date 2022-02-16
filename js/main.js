$(document).ready(function () {
  // $("#icon-acura").on("click", function () {
  //   $("#ShowCar").attr("src", "./img/car/acura_PNG130.png");
  // });

  // $("#icon-alfa").on("click", function () {
  //   $("#ShowCar").attr("src", "./img/car/alfa_romeo_PNG75.png");
  // });

  // $("#icon-bmw").on("click", function () {
  //   $("#ShowCar").attr("src", "./img/car/bmw_PNG99558.png");
  // });

  // $("#icon-aston-martin").on("click", function () {
  //   $("#ShowCar").attr("src", "./img/car/aston_martin_PNG45.png");
  // });

  // $("#icon-land-rover").on("click", function () {
  //   $("#ShowCar").attr("src", "./img/car/land_rover_PNG54.png");
  // });

  // $("#icon-audi").on("click", function () {
  //   $("#ShowCar").attr("src", "./img/car/audi_PNG99491.png");
  // });

  // переключатель картінок автомобіля

  $(".btn-icon").on("click", function () {
    let btn_icon = $(this).attr("data-img-path");

    // console.log($(this).attr('data-img-path'));

    $("#ShowCar").attr("src", btn_icon);
    let textCar = $(this).attr("data-car-marka");
    holderMarka.text(textCar);
  });

  let holderMarka = $("#holderMarka");
  let holderEnergy = $("#holderEnergy");
  let holderTranmisions = $("#holderTranmisions");
  let holderPackege = $("#holderPackege");
  let holderPrice = $("#holderPrice");
  let holderPriceUSD = $("#holderPriceUSD");

  let carPrice = 0;

  // прораховуємо ціну автомобіля

  function calculetePrice() {
    carPrice =
      +$(".form-block input[name=energy]:checked").val() +
      +$(".form-block input[name=tranmisions]:checked").val() +
      +$(".form-block input[name=packege]:checked").val();
    holderPrice.text(carPrice);
  }

  $(".form-block input").on("change", function () {
    calculetePrice();
    changeEnergy();
    changeTranmisions();
    changePackege();
    calculeteUSD();
  });

  // вставляємо пераметри автомобіля

  function changeEnergy() {
    textEnergy = $(".form-block input[name=energy]:checked + label").text();

    holderEnergy.text(textEnergy);
  }

  function changeTranmisions() {
    textTranmisions = $(
      ".form-block input[name=tranmisions]:checked + label"
    ).text();
    holderTranmisions.text(textTranmisions);
  }

  function changePackege() {
    textPackege = $(".form-block input[name=packege]:checked + label").text();
    holderPackege.text(textPackege);
  }

  let UahUsd = 0;

  // запрос на сервер для отримання курсу

  let USDurl = $.getJSON(
    " https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
    function (data) {
      console.log(data[0].buy);
      UahUsd = data[0].buy;
    }
  );

  // прораховуємо ціну в доларах

  function calculeteUSD() {
    carPriceUSD = +carPrice / UahUsd;
    console.log(carPriceUSD);
    holderPriceUSD.text(carPriceUSD.toFixed(0));
  }
});
