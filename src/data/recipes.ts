// export const recipes: Record<
//     string,
//     {
//         step: string;
//         ingredients?: { name: string; amount: string }[];
//         tools?: string[]; // 도구 이름만 저장
//         images?: string | string[]; // 단계별 이미지 추가
//         author?: string; // 👈 특정 컷만 다른 제작자 표시
//         license?: string; // 👈 특정 컷만 다른 라이선스 표시
//     }[]
// > = {
//     "전자레인지 1분컷 초코칩쿠키": [
//         {
//             step: "1. 설탕, 우유, 버터를 넣고 잘 섞어준다.",
//             ingredients: [
//                 { name: "설탕", amount: "25g" },
//                 { name: "우유", amount: "10g" },
//                 { name: "버터", amount: "20g" },
//             ],
//             tools: ["볼", "주걱"], // 사용할 도구
//             images: [
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-00-00.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-00-01.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-00-02.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-00-03.png",
//             ],
//         },
//         {
//             step: "2. 밀가루를 넣고 1차로 반죽해준다.",
//             ingredients: [{ name: "밀가루", amount: "40g" }],
//             tools: ["볼", "주걱"],
//             images: [
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-01-00.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-01-01.png",
//             ],
//         },
//         {
//             step: "3. 반죽에 초코칩 넣고 섞어주면 반죽 끝!",
//             ingredients: [{ name: "초코칩", amount: "적당량" }],
//             tools: ["주걱"],
//             images: [
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-02-00.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-02-01.png",
//             ],
//         },
//         {
//             step: "4. 종이호일 위에 반죽을 펴준 뒤",
//             tools: ["오븐용 종이호일", "주걱"],
//             images: [
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-03-00.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-03-01.png",
//             ],
//         },
//         {
//             step: "5. 전자레인지 1분 돌리면 완성!",
//             tools: ["전자레인지"],
//             images: [
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-04-00.png",
//                 "http://localhost:3000/images/microwave-1min-chocochip-cookie/step-04-01.png",
//             ],
//         },
//     ],
//     "라이스페이퍼 김치전": [
//         {
//             step: "1. 김치와 베이컨을 손가락 2마디 사이즈로 잘라서 준비해준다",
//             ingredients: [
//                 { name: "김치", amount: "2큰술" },
//                 { name: "베이컨", amount: "2큰술" },
//             ],
//             tools: ["식도", "주방용 가위"],
//             images: [
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-00-00.png",
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-00-01.png",
//             ],
//             author: "요리사랑 cooking, 쮸곰이밥 Jjugomibab", // 👈 추가
//             license: "CC BY",
//         },
//         {
//             step: "2. 라이스페이퍼 위에 잘라둔 김치와 베이컨을 올린다.",
//             ingredients: [{ name: "라이스페이퍼", amount: "2장" }],
//             tools: ["숟가락"], // 사용할 도구
//             images: [
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-01-00.png",
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-01-01.png",
//             ],
//         },
//         {
//             step: "3. 피자치즈를 조금 뿌려주고",
//             ingredients: [{ name: "피자치즈", amount: "2큰술" }],
//             images: "http://localhost:3000/images/RicePaper-KimchiJeon/step-02.png",
//         },
//         {
//             step: "4. 그 위에 물에 적신 라이스페이퍼로 뚜껑을 덮어준다.",
//             images: "http://localhost:3000/images/RicePaper-KimchiJeon/step-03.png",
//         },
//         {
//             step: "5. 팬에 기름을 두르고 앞 뒤로 노릇해질때까지 구워주면 완성!",
//             ingredients: [{ name: "식용유", amount: "2큰술" }],
//             tools: ["후라이팬", "뒤집개"],
//             images: [
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-04-00.png",
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-04-01.png",
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-04-02.png",
//                 "http://localhost:3000/images/RicePaper-KimchiJeon/step-04-03.png",
//             ],
//         },
//     ],
//     "또띠아 크로와상": [
//         {
//             step: "1. 또띠아에 슬라이스 치즈를 올린다.",
//             ingredients: [
//                 { name: "또띠아", amount: "1장" },
//                 { name: "슬라이스치즈", amount: "1.5장" },
//             ],
//             images: [
//                 "http://localhost:3000/images/Tortilla-Croissant/step-00-00.png",
//                 "http://localhost:3000/images/Tortilla-Croissant/step-00-01.png",
//             ],
//         },
//         {
//             step: "2. 세모 모양으로 자른다.",
//             tools: ["식도"], // 사용할 도구
//             images: "http://localhost:3000/images/Tortilla-Croissant/step-01.png",
//         },
//         {
//             step: "3. 베이컨 올려 돌돌 말아주고 이쑤시개로 고정한다.",
//             ingredients: [{ name: "베이컨", amount: "0.5개" }],
//             tools: ["이쑤시개"],
//             images: [
//                 "http://localhost:3000/images/Tortilla-Croissant/step-02-00.png",
//                 "http://localhost:3000/images/Tortilla-Croissant/step-02-01.png",
//                 "http://localhost:3000/images/Tortilla-Croissant/step-02-02.png",
//             ],
//         },
//         {
//             step: "4. 계란 노른자 발라주고 깨 올려준다",
//             ingredients: [
//                 { name: "계란", amount: "1개" },
//                 { name: "검은깨", amount: "한꼬집" },
//             ],
//             images: [
//                 "http://localhost:3000/images/Tortilla-Croissant/step-03-00.png",
//                 "http://localhost:3000/images/Tortilla-Croissant/step-03-01.png",
//             ],
//         },
//         {
//             step: "5. 에어프라이어 180도 15분 돌리면 완성!",
//             tools: ["에어프라이어"],
//             images: [
//                 "http://localhost:3000/images/Tortilla-Croissant/step-04-00.png",
//                 "http://localhost:3000/images/Tortilla-Croissant/step-04-01.png",
//                 "http://localhost:3000/images/Tortilla-Croissant/step-04-02.png",
//             ],
//         },
//     ],
// };
