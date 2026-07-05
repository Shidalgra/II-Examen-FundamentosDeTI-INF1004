//////////////////////////////////
//MenuHamburguesa.js
/////////////////////////////////
var $visible_menu = false;
let $menu = $("nav");
let $nav_bar = $("nav-bar");
let $links = $("nav a");

// Función para mostrar y ocultar el menú
function showHideMenu() {
    if ($visible_menu == false) {
        $menu.style.display = "block";
        $nav_bar.style.display = "block";
        $visible_menu = true;
    } else {
        $menu.style.display = "none";
        $nav_bar.style.display = "fixed";
        $visible_menu = false;
    }

    //   Agregar un event listener para cerrar el menú si se hace clic fuera de él
    $(document).on("click", function (event) {
        var target = event.target;
        if (!$menu[0].contains(target) && target != $nav_bar[0]) {
            $menu.style.display = "none";
            $nav_bar.style.display = "fixed";
            $visible_menu = false;
        }
        for (var x = 0; x < $links.length; x++) {
            $links[x].onclick = function () {
                $menu.style.display = "none";
                $visible_menu = false;
            }
        }
    });
}