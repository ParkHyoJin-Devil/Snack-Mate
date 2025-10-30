-- recipe_images 테이블에 image_order 필드 추가
ALTER TABLE recipe_images ADD COLUMN image_order INT NULL;

-- 기존 데이터에 대한 기본값 설정 - 각 step별로 1부터 순서대로 번호 부여
-- 이 작업은 애플리케이션에서 처리하거나 수동으로 할 수 있음
-- 예시: 특정 레시피의 경우
-- UPDATE recipe_images SET image_order = 1 WHERE recipe_id = 1 AND step_number = 1 AND id = (가장 작은 id);
-- UPDATE recipe_images SET image_order = 2 WHERE recipe_id = 1 AND step_number = 1 AND id = (두 번째로 작은 id);
-- ...