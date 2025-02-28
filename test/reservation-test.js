import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 동시에 요청할 가상 유저 수
  duration: '10s', // 테스트 실행 시간
};
const validUserIds = [1, 2, 9, 10, 11]; // 실제 DB에 있는 user_id 목록

const API_URL = 'http://localhost:3000/tickets/reservation'; // 예약 API 엔드포인트

export default function () {
  const randomUserId =
    validUserIds[Math.floor(Math.random() * validUserIds.length)];

  const payload = JSON.stringify({
    schedule_id: 1, // 테스트할 스케줄 ID
    user_id: randomUserId, // 랜덤 유저 ID
    seat_id: 2, // 테스트할 좌석 ID
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(API_URL, payload, params);

  check(response, {
    'is status 201': (r) => r.status === 201, // 예약 성공
    'is status 400': (r) => r.status === 400, // 이미 예약된 좌석
  });

  sleep(1);
}
