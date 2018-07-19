let m1 = 50; /* высота шапки в пикселях */
let m2 = 0; /* отступ, когда во время прокрутки шапка
 уже не видна */
let menuID = "menu-top-almost-fixed";
/* функция кроссбраузерного определения
отступа от верха документа к текущей позиции
скроллера прокрутки */
function getScrollTop() {
    let scrOfY = 0;
    if( typeof( window.pageYOffset ) == "number" ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
    } else if( document.body
        && ( document.body.scrollLeft
            || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
    } else if( document.documentElement
        && ( document.documentElement.scrollLeft
            || document.documentElement.scrollTop ) ) {
        //IE6 Strict
        scrOfY = document.documentElement.scrollTop;
    }
    return scrOfY;
}
/* функция, которая устанавливает верхний отступ
 для «плавающего» фиксированного горизонтального
меню в зависимости от положения
 скроллера и видимости шапки */
function marginMenuTop() {
    let top  = getScrollTop();
    let s    = document.getElementById(menuID);
    if(typeof s != "undefined" && s){
        if (top+m2 < m1) {
            s.style.top       = (m1-top) + "px";
        } else {
            s.style.top       = m2 + "px";
        }
    }
}
/** функция регистрирует
 вычисление позиции
 «плавающего» меню при прокрутке страницы
 **/
function setMenuPosition(){
    if(typeof window.addEventListener != "undefined"){
        window.addEventListener("scroll", marginMenuTop, false);
    } else if(typeof window.attachEvent != "undefined"){
        window. attachEvent("onscroll", marginMenuTop);
    }
}
/** регистрируем вызов
 необходимых функций после
 загрузки страницы **/
if(typeof window.addEventListener != "undefined"){
    window.addEventListener("load", setMenuPosition, false);
} else if(typeof window.attachEvent != "undefined"){
    window. attachEvent("onload", setMenuPosition);
}