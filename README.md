# 기업 채용 서비스 onBoarding

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=plastic&logo=nestjs&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=plastic&logo=jest&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)

![Test Status](https://github.com/rojiwon0325/wanted_pre_onboarding-backend/actions/workflows/push_cov_report.yml/badge.svg)
![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/rojiwon0325/3a0a89382b72d637e952daf28d0946e3/raw/coverage_badge.json)

> 원티드 프리온보딩 백엔드 선발 과제입니다.

## 요구사항 분석

> 구현 진행 사항은 하단에 별도로 작성하였습니다.

- <em>회사</em>는 채용 공고를 등록합니다.

```Json
// 데이터 예시, 필드명 수정 가능
{
  "회사_id": 회사_id,
  "채용포지션": "백엔드 주니어 개발자",
  "채용보상금": 1000000,
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다.",
  "사용기술":"Python"
}
```

- <em>회사</em>는 채용 공고를 수정합니다.
  - 회사 id외에 모두 수정 가능

```Json
// 데이터 예시, 필드명 수정 가능
{
  "채용포지션": "백엔드 시니어 개발자",
  "채용보상금": 1500000,
  "채용내용":"원티드랩에서 백엔드 주니어 개발자를 채용합니다.",
  "사용기술":"Python"
}
```

- <em>회사</em>는 채용 공고를 삭제합니다.
  - DB에서 삭제됩니다.
- <em>사용자</em>는 채용공고 목록을 아래와 같이 불러올 수 있습니다.

```Json
[
  {
    "채용공고_id": 채용공고_id,
    "회사명":"원티드 랩",
    "국가": "한국",
    "지역":"서울",
    "채용포지션": "백엔드 시니어 개발자",
    "채용보상금": 1500000,
    "사용기술":"Python"
  },
  {
    "채용공고_id": 채용공고_id,
    "회사명":"네이버",
    "국가": "한국",
    "지역":"서울",
    "채용포지션": "백엔드 주니어 개발자",
    "채용보상금": 1000000,
    "사용기술":"Nest"
  }
]
```

- <em>사용자</em>는 채용공고 목록을 검색할 수 있습니다.
- <em>사용자</em>는 채용 상세 페이지를 아래와 같이 확인할 수 있습니다.
  - "채용내용"이 추가적으로 담겨있음.
  - 해당 회사가 올린 다른 채용공고가 추가적으로 포함됨

```Json
{
  "채용공고_id": 채용공고_id,
  "회사명":"네이버",
  "국가": "한국",
  "지역":"서울",
  "채용포지션": "백엔드 주니어 개발자",
  "채용보상금": 1000000,
  "사용기술":"Nest",
  "채용내용":"네이버에서 백엔드 주니어 개발자를 채용합니다.",
  "회사가 올린 다른 채용 공고": [채용공고_id, ...] // id list
}
```

- <em>사용자</em>는 채용 공고에 아래와 같이 지원합니다.
  - 1회만 지원 가능

```Json
{
  "채용공고_id": 채용공고_id,
  "사용자_id": 사용자_id
}
```

## 설계 모델

![설계 모델](https://user-images.githubusercontent.com/68629004/194767352-199fb8c5-b359-41c5-b07e-5e154ff7891f.jpg)

### 설계 모델 변경점

- 회사는 actor가 아니다.
  - 권한을 가진 사용자가 회사정보를 활용해 채용공고를 낸다.

## 요구사항 구현 진행 사항

### 채용 공고

| 내용                 | 구현 | API                                 | 기타                                       |
| -------------------- | ---- | ----------------------------------- | ------------------------------------------ |
| 새로운 채용공고 등록 | ✅   | POST /recruitment                   | 데이터는 body로 전달                       |
| 채용공고 상세 조회   | ✅   | GET /recruitment/:recruitment_id    | 회사가 올린 다른 채용공고 목록 포함함      |
| 채용공고 목록 검색   | ✅   | GET /recruitment?search=keyword     | 포지션, 내용, 기술 기준                    |
| 채용공고 수정        | ✅   | PATCH /recruitment/:recruitment_id  | 회사 id 수정 불가, 모든 데이터 body로 전달 |
| 채용공고 삭제        | ✅   | DELETE /recruitment/:recruitment_id |                                            |

### 채용 공고 지원

| 내용           | 구현 | API                                           | 기타                   |
| -------------- | ---- | --------------------------------------------- | ---------------------- |
| 채용 공고 지원 | ✅   | POST /apply-recruitment                       | 데이터는 body로 전달   |
| 채용 공고 조회 | ✅   | GET /apply-recruitment?user_id&recruitment_id | query로 조회 기준 전달 |
