let pageNumber = document.querySelector(".pageNumber");

$(function () {
    $("#slides").slick({
        slide: "div", //�����̵� �Ǿ�� �� �±� ex) div, li
        infinite: true, //���� �ݺ� �ɼ�
        slidesToShow: 1, // �� ȭ�鿡 ������ ������ ����
        slidesToScroll: 1, //��ũ�� �ѹ��� ������ ������ ����
        speed: 500, // ���� ��ư ������ ���� ȭ�� �ߴµ����� �ɸ��� �ð�(ms)
        arrows: true, // ������ �̵��ϴ� ȭ��ǥ ǥ�� ����
        dots: false, // ��ũ�ѹ� �Ʒ� ������ ���������̼� ����
        autoplay: true, // �ڵ� ��ũ�� ��� ����
        autoplaySpeed: 10000, // �ڵ� ��ũ�� �� �������� �Ѿ�µ� �ɸ��� �ð� (ms)
        pauseOnHover: true, // �����̵� �̵�	�� ���콺 ȣ���ϸ� �����̴� ���߰� ����
        vertical: false, // ���� ���� �����̵� �ɼ�
        prevArrow:
            "<div class='css-prev'><img style='cursor: pointer;' src='/images/arrow_banner_left_52_52.svg' /></div>", // ���� ȭ��ǥ ��� ����
        nextArrow:
            "<div class='css-next'><img style='cursor: pointer;' src='/images/arrow_banner_right_52_52.svg' /></div>", // ���� ȭ��ǥ ��� ����
        draggable: false, //�巡�� ���� ����
    });
});

$("#slides").on("init", function (event, slick, currentSlide, nextSlide) {
    pageNumber.innerHTML = `1 / ${slick["$slides"].length}`;
});

$("#slides").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    pageNumber.innerHTML = `${nextSlide + 1} / ${slick["$slides"].length}`;
});