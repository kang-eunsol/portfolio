/*****************
 * 포트폴리오 데이터
 */
/* 상수 선언하고 리터럴로 배열 */
export  const PORTFOLIO = [];
    /* 기본 카테고리 */
    PORTFOLIO['design'] = [
        /* 배열안에 배열 */
        /* 첫번째 */
        {
            id: "market",/* (필수) 프로젝트 고유 id(식별값) */
            subject: "중소기업 협동조합 설립안내 리플렛",/* (필수) 프로젝트 이름 */
            summary: "중소기업 협동조합 설립안내 리플렛",/* (필수) 프로젝트 요약 */
            content_name: "work_1.html",/* (필수) 프로젝트 상세페이지 파일명 */
            thumbnail: "/media/market_cover.jpg",/* 목록에 들어갈 대표 이미지(경로) */
            thumbnail_2: "/media/market_detail1.jpg",/* 목록에 들어갈 대표 이미지(경로) */
            details: "/media/market_detail2.jpg"/* 프로젝트를 볼 수 있는 주소 */
        },
        /* 두번째 */
        {
            id: "119",
            subject: "소방현장 개인정보 가이드라인 리플렛",
            summary: "소방현장 개인정보 가이드라인 리플렛",
            content_name: "work_2.html",
            thumbnail: "/media/119_cover.jpg",
            thumbnail_2: "/media/119_detail1.jpg",
            details: "/media/119_detail2.jpg"
        },
        /* 세번째 */
        {
            id: "newsad",
            subject: "생활권 안심도로 신문 광고",
            summary: "생활권 안심도로 신문 광고",
            content_name: "work_3.html",
            thumbnail: "/media/newsppr_ad_thumbnail.jpg",
            thumbnail_2: "/media/road_detail1.png",
            details: "/media/road_detail2.jpg"
        }
    ];
    /* 디자인 카테고리 */
    PORTFOLIO['web'] = [
        {
            id: "",
            subject: "제목",
            summary: "짧은소개문구",
            content_name: "본문",
            thumbnail: "",
            details: ""
        }
    ];
