# 🎟️ 영화관 조회 및 티켓 예약 서비스
## 📌 프로젝트 개요
이 프로젝트는 NestJS를 기반으로 한 실시간 좌석 예약 시스템입니다. 최신 트렌드에 맞춘 코드를 작성하며 동시성 제어 및 WebSocket 기반 실시간 좌석 업데이트를 구현하는 데 집중했습니다.

## 🚀 주요 목표
* 동시성 제어: 여러 사용자가 동시에 좌석을 예약할 때 충돌을 방지하고 원자성을 유지
* WebSocket을 활용한 실시간 좌석 상태 업데이트
* NestJS의 최신 트렌드를 반영한 코드 구조
* 운영진과의 실시간 소통을 위한 채팅 기능 
## 🛠️ 기술 스택
#### Backend: NestJS, Prisma, MySQL, Redis, Socket.io
#### Database: MySQL + Prisma ORM
#### Caching & Locking: Redis를 활용한 좌석 락(lock) 기능
#### Real-time: WebSocket (Socket.io) 기반 실시간 업데이트
## 🎯 주요 기능
* 좌석 예약 기능 (동시성 제어 포함)
* 예약된 좌석 실시간 업데이트
* 사용자 및 운영진 간 실시간 채팅 기능 (추가 예정)
* Prisma ORM을 활용한 데이터 관리
* Redis를 활용한 데이터 캐싱 및 락(lock) 기능 적용

## 🔥 향후 계획
배포 환경 최적화 (AWS 등 클라우드 서비스 적용)

