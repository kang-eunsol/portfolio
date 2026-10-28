/**
 * 캡차 이미지 새로고침
 */
const el_captcha_img = document.getElementById("captcha");
document.getElementById("re_captcha").onclick = () => {
    // 밀리세컨드 유닉스 타임 준비
    // 시스템 시간 가져와서 적용
    const cache_ver = new Date().getTime();
    //캡차 이미지의 경로를 재설정
    el_captcha_img.src = `https://popol.website/apis/captcha/captcha.php?${cache_ver}`;
};

/**
 * 양식 전송
 */
const el_form = document.getElementById("f_contact");
// 컨택트 처리 결과 사후 처리 작업을 위한 테스트 목적(테스트할때 "success/failure" 테스트 끝나면 (undefined))
const contact_result_test_file = "SUCCESS";
el_form.addEventListener("submit", e => {
    // 기본 전송 중지
    e.preventDefault();

    // 사후 처리 UI 작업 모드라면 서버에 전송하지 않고 UI 처리 작업(테스트 끝나면 false로 바꾸면 됨)
    // === true <- 안써도 됨
    if(contact_result_test_file !== undefined) {
        contact_result(contact_result_test_file);
        return;
    }

    // 양식 전송 준비(e.currentTarget = el_form)
    const el_form = e.currentTarget;
    const formdata = new FormData(el_form);
    // 전송
    // window = 현재 창에서 최상위 전역공간
    const response_promise = window.fetch("https://popol.website/apis/?module=contact", {
        method: "post",
        body: formdata,
        // 전송할 때 도메인과 전송 받는 도메인이 같아야 함. 도메인 달라서 생기는 보안문제를 해결하기 위한 정책 작성
        credentials: "include"
    });
    response_promise.then(response => response.text())
        .then(message => {
            if(message === "SUCCESS") {
                // 성공적으로 처리되었으므로 양식을 초기화
                el_form.reset();
                console.log("성공적으로 처리되었습니다.");
            } else {
                console.log("처리하지 못했습니다.");
            }
            contact_result(message);
        });
});

/**
 * 사후 처리 UI 작업
 */
// 실패했을 경우도 만들어야 됨
// 어떤 식으로 띄울지 작업하면 됨
const el_dialog = document.getElementById("content_dialog");

/* 닫기버튼 처리 */
el_dialog.children[0].onclick = e => el_dialog.close();

function contact_result(result) {
    /**
     * 성공했을때 파일명: contact_result_success.html
     * 실패했을때 파일명: contact_result_failure.html
     */
    const result_content_file = result.match(/SUCCESS|FAILURE/) ?
     `contact_result_${result.toLowerCase()}.html`:
     "contact_invalid.html";
    // fetch 요청하기
    window.fetch(`/contents/${result_content_file}`)
        .then(response => response.text())
        .then(content => {
            el_dialog.children[1].innerHTML = content;
            el_dialog.showModal();
        });
}