let pageNumber = document.querySelector(".pageNumber");

$(function () {
    $("#slides").slick({
        slide: "div", //슬라이드 되어야 할 태그 ex) div, li
        infinite: true, //무한 반복 옵션
        slidesToShow: 1, // 한 화면에 보여질 컨텐츠 개수
        slidesToScroll: 1, //스크롤 한번에 움직일 컨텐츠 개수
        speed: 500, // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
        arrows: true, // 옆으로 이동하는 화살표 표시 여부
        dots: false, // 스크롤바 아래 점으로 페이지네이션 여부
        autoplay: true, // 자동 스크롤 사용 여부
        autoplaySpeed: 10000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
        pauseOnHover: true, // 슬라이드 이동	시 마우스 호버하면 슬라이더 멈추게 설정
        vertical: false, // 세로 방향 슬라이드 옵션
        prevArrow:
            "<div class='css-prev'><img style='cursor: pointer;' src='/images/arrow_banner_left_52_52.svg' /></div>", // 이전 화살표 모양 설정
        nextArrow:
            "<div class='css-next'><img style='cursor: pointer;' src='/images/arrow_banner_right_52_52.svg' /></div>", // 다음 화살표 모양 설정
        draggable: false, //드래그 가능 여부
    });
});

$("#slides").on("init", function (event, slick, currentSlide, nextSlide) {
    pageNumber.innerHTML = `1 / ${slick["$slides"].length}`;
});

$("#slides").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    pageNumber.innerHTML = `${nextSlide + 1} / ${slick["$slides"].length}`;
});