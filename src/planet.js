const el_orbit = document.querySelector(".orbit");
const el_content_container = document.querySelectorAll(".orbit > div:not(.planet)");
const el_planet = el_orbit.querySelector(".planet");
const angle_unit = 20;
const loop_count = Math.round(360 / angle_unit);
const debugging = {
    allow: false,
    el: undefined,
    log: (log) => {
        if(debugging.allow === true) {
            debugging.el.textContent += `${log}\n`;
        }
    }
};


// container idx
(function init() {
    [...el_orbit.children].forEach((el, idx) => {
        // active할 순번이 아니면(맨 앞이 아니면(0번이 아니면)) filter blur 클래스 줌
        if(idx !== 0 && idx !== 5) {
            // el.classList.remove("none_filter");
            el.classList.add("filter_blur");
        }
    });   
})();

// wireframe ////////////////////////////////////////////////
for(let i = 1; i < loop_count; i++) {
    const el_wire_x = document.createElement("div");
    const el_wire_y = document.createElement("div");
    const angle = i * angle_unit;
    
    el_wire_x.style.cssText = `transform: rotateX(${angle}deg)`;
    el_wire_y.style.cssText = `transform: rotateY(${angle}deg)`;
    el_planet.append(el_wire_x, el_wire_y);
}

// el_content_container.forEach((el, idx, els) => {
//     const angle = idx * (360/el_content_container.length);
//     el.addEventListener("click", e => {
//         console.log("???");
//         el_orbit.style.cssText = `transform: translateX(-50%) translateZ(-600px) rotateX(-10deg) rotateY(-${angle}deg)`;
//     });
// });

/**
 * Navigation
 */
const nl_menulist = document.querySelectorAll('#menulist > li');
nl_menulist.forEach(el_menu => {
    el_menu.addEventListener("click", e => {
        const angle = e.currentTarget.dataset.angle;
        do_rotate(angle);
    });
});



let do_not_rotate = false;
document.addEventListener("mousemove", e => {
    // console.log(e.target);
    if(e.target.closest("#project_list")) {
        do_not_rotate = true;
    } else {
        do_not_rotate = false;
    }
});

document.addEventListener("touchstart", e => {
    if(e.target.closest("#project_list")) {
        do_not_rotate = true;
    } else {
        do_not_rotate = false;
    }
});


const orbit_angle_unit = 360 / el_content_container.length;
let angle = 0;
let wheel_timer;

// pointer //////////////////////////////////////////////////
const media_quary = "(pointer: fine)";
if(window.matchMedia(media_quary).matches) {
    document.addEventListener("wheel", e => {
        if(!do_not_rotate) {
            // 휠 돌리면 이벤트 한 번만 발생하도록(=한 페이지만 돌아가도록) 이벤트 발생 직후 이벤트 취소
            window.clearTimeout(wheel_timer);
    
            wheel_timer = window.setTimeout(() => {
                // 휠 값이 음수인지 양수인지
                if(e.deltaY > 0) {
                    // 양수면 아래로 스크롤
                    angle -= orbit_angle_unit;            
                } else {
                    // 음수면 위로 스크롤
                    angle += orbit_angle_unit;
                }
                // rotate 함수 실행
                do_rotate(angle);
            // 함수 실행을 위해 지정된 예약 시간(1/1000초)
            }, 100);
        }

    });
    
} else {
    const a_touch_x = [];
    const a_touch_y = [];
    
    window.addEventListener("touchmove", e => {
        if (do_not_rotate) {
            return; 
        }
        const touch = e.touches[0];
        // 터치했을때 좌표
        a_touch_x.push(touch.clientX);
        a_touch_y.push(touch.clientY);

        if(a_touch_x.length === 2) {
            const comp_x = Math.abs(a_touch_x[0] - a_touch_x[1]);
            const comp_y = Math.abs(a_touch_y[0] - a_touch_y[1]);
            if(comp_y > comp_x) return;
            // 두 개의 터치 값을 비교해서 5보다 작으면 스와이프 실행하지 않음(세로로 스와이프 했을 때)
            if(comp_x < 5) return;
        }

        // 좌표값 두개를 가져와서(두개 이상(두 손가락 이상 터치)이나 이하면 실행되지 않음)
        if(a_touch_x.length === 2) { 
            // 첫번째값이 두번째 값보다 작으면
            if(a_touch_x[0] < a_touch_x[1]) {
                // alert("right");
                // 오른쪽 스와이프
                angle += orbit_angle_unit;
            } else {
                // 크면 왼쪽 슬라이드
                angle -= orbit_angle_unit;
            }
            debugging.log(`${a_touch_x[0]} / ${a_touch_x[1]}`);
            do_rotate(angle);
        }
    });
    // touched 이벤트 발생 후 함수 조건 초기화해서 한 페이지만 넘어가도록 설정
    window.addEventListener("touchend", e => {
        a_touch_x.length = 0;
        a_touch_y.length = 0;
    });
}

// 배경 창 블러처리 /////////////////////////////////////////////
let prev_container = el_orbit.children[0];
let cur_angle = 0;
let container_idx_old = 0;
function do_rotate(angle) {
    
    // pointer에 따라 회전시 시점 수정
    if(window.matchMedia(media_quary).matches) {
        el_orbit.style.cssText = `transform: translateX(-50%) translateZ(-600px) rotateX(-5deg) rotateY(${angle}deg)`;
    } else {
        el_orbit.style.cssText = `transform: translateX(-50%) translateZ(-600px) rotateX(-2deg) rotateY(${angle}deg)`;
    }

    // console.log(angle % 360);
    const direction = angle < cur_angle ? "left" : "right";
    const container_id = Math.abs(angle % 360);
    // let add_idx, remove_idx;
    let container_idx;
    
    switch(container_id) {
        case 72: 
            container_idx = angle > 0 ? 4 : 1;
            break;
        case 144: 
            container_idx = angle > 0 ? 3 : 2;
            break;
        case 216: 
            container_idx = angle > 0 ? 2 : 3;
            break;
        case 288: 
            container_idx = angle > 0 ? 1 : 4;
            break;
        default: 
            container_idx = 0;
    }

    el_orbit.children[container_idx].classList.remove("filter_blur"); 
    // document.querySelector(`menu${container_id}`).classList.add("active");
    
    el_orbit.addEventListener("transitionend", (e) => {
        // console.log("container_idx_old", container_idx_old);
        el_orbit.children[container_idx_old].classList.add("filter_blur");
        // document.querySelector(`menu${container_id}`).classList.remove("active");
        container_idx_old = container_idx;
    }, { once: true});

    cur_angle = angle;
}



/**
 * Debugging
 */
if(debugging.allow === true && window.matchMedia("(pointer: coarse)").matches) {
    debugging.el = document.createElement("div");
    debugging.el.style.cssText = `
            position: fixed;
            inset-block-end: 0;
            inset-inline: 0;
            height: 100px;
            background-color: black;
            color: yellow;
            z-index: 999999999;
            overflow-y: auto;
        `;
    document.body.append(debugging.el);
}



export {
    do_rotate
};