const btn_planet = document.getElementById('btn_planet');
const intro = document.getElementById('intro');
const main = document.querySelector('.main-wrap');
const header = document.querySelector('.header-wrap');
const titleWrap = document.querySelector('.begin_title_wrap');

btn_planet.addEventListener("click", () => {
        intro.style.left = '-100%';
        intro.style.right = '100%';

        main.style.left = '-50%';
        // main.style.right = '0vw';
        // intro.style.opacity = '0';

        // intro.style.opacity = '0';
        main.style.pointerEvents = 'auto';
        main.style.opacity = '1';
        header.style.opacity = '1';

        
        const el_dialog = document.getElementById("content_dialog");
        
        header.addEventListener("transitionend", () => {
                const el_popover = document.createElement("div");
                el_popover.setAttribute("popover", true);
                el_popover.style.cssText = `
                                background-color: rgb(0 0 0 / 0.7);
                                border-style: none;
                                padding: 10px;
                                border-radius: 20px;
                                transition: opacity 0.3s;
                        `;

                document.body.append(el_popover);

                const img = new Image();
                img.src = "/media/wheel_down_icon.svg";
                img.width = 200;
                el_popover.append(img);
                
                el_popover.showPopover();

                window.setTimeout(() => {
                        // el_popover.hidePopover();
                        // // el_popover.remove();
                        el_popover.style.opacity = 0;
                        el_popover.addEventListener("transitionend", e => {
                                e.currentTarget.remove();
                        });
                }, 2000);
        });
});