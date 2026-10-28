// import, export(portfolio.js)
import { PORTFOLIO } from "/src/portfolio.js?4";
import { do_rotate } from "/src/planet.js";


const el_project_list = document.getElementById("project_list");
// 객체들을 모아서 담아놓을 배열
const a_projects = [];
// id를 key로 가져올 배열
const a_projects_by_id = [];

const el_works_details_content = document.getElementById("works_details_content");
const el_btn_open_new = document.querySelector(".open_new");
const el_content_dialog = document.getElementById("content_dialog");


get_data();
// 포트폴리오 데이터들 가져오기
function get_data() {
    // PORTFOLIO객체에서 key가져오기
    // key는 forEach 줄 수 없음
    for(let key in PORTFOLIO) {
        // 가져온 key(프로젝트 데이터)에 forEach로 작업 목록 가져옴
        PORTFOLIO[key].forEach(project => {
            // 가져온 작업 목록을 a_projects에 담음
            a_projects.push(project);
            // project id를 a_projects_by_id 배열에 저장
            a_projects_by_id[project.id] = project;
        });
    }
    
    generate_list();
}

// works page image click event //////////
// works 리스트 생성하기
function generate_list() {
    // a_projects에 저장된 프로젝트 배열로 가져옴(모든 프로젝트에 반복 실행)
    a_projects.forEach(project => {
        // 프로젝트 넣을 div 생성
        const el_project = document.createElement("div");
        // div에 project id 추가
        el_project.dataset.id = project.id;
        // div에 content_name 추가
        el_project.dataset.content_name = project.content_name;
        // 썸네일 넣을 img 생성
        const el_thumbnail = new Image();
        // project에서 thumbnail 가져와서 el_thumbnail의 src로 넣음
        el_thumbnail.src = project.thumbnail;
        // div에 view_details함수 실행 클릭이벤트 등록
        el_project.addEventListener("click", view_details);
        // el_thumbnail을 el_project에 자식으로 추가
        el_project.append(el_thumbnail);
        // el_project를 el_project_list 자식으로 추가
        el_project_list.append(el_project);
    });
}

// works details page //////////
function view_details(e) {
    do_rotate(-216);
    // open_new버튼의 데이터를 현재 프로젝트의 데이터로 저장
    el_btn_open_new.dataset.id = e.currentTarget.dataset.id;
    // tpl_project_details를 복제(true하면 내부까지 복사)
    const project_details = document.getElementById("tpl_project_details").content.cloneNode(true); 
    // a_projects_by_id에서 현재 프로젝트의 id:subject를 찾아 복사한 project_details의 h1에 추가
    project_details.querySelector("h1").textContent = a_projects_by_id[e.currentTarget.dataset.id].subject;
    // thumbnail_2를 img로 추가
    project_details.querySelector("img").src = a_projects_by_id[e.currentTarget.dataset.id].thumbnail_2;
    // 상세 페이지 초기화(프로젝트 누를때마다 겹쳐서 쌓이지 않도록)
    el_works_details_content.innerHTML = "";
    // 복사한 project_details을 el_works_details_content에 자식으로 추가
    el_works_details_content.append(project_details);
    // 새창열기 클릭이벤트
    el_btn_open_new.addEventListener("click", e => {
        // 새창 내용(dialog content) 초기화
        el_content_dialog.children[1].innerHTML = "";
        // 새창에 img를 id:details로 찾아서 추가
        el_content_dialog.children[1].innerHTML = `<img src="${a_projects_by_id[e.currentTarget.dataset.id].details}" />`;
        // modal 창 띄우기
        el_content_dialog.showModal();
        // 닫기버튼 클릭이벤트 등록
        el_content_dialog.children[0].addEventListener("click", e => {
            // 부모요소(dialog) 닫기
            e.currentTarget.parentElement.close();
            // 한번만 실행
        }, { once: true });
        // 새창 열기 한번만 실행
    }, { once: true });

    // window.fetch(`/contents/${e.currentTarget.dataset.content_name}`)
    //     .then(response => response.text())
    //     .then(content => {
    //         el_works_details_content.innerHTML = content;
    //     });
}


// works 뒤로가기 버튼 //////////
const btn_arrow = document.querySelector(".arrow_back");
btn_arrow.addEventListener("click", back_to_works);

function back_to_works() {
    do_rotate(-144);
}