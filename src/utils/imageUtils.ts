/**
 * 이미지 배열을 image_order 필드 순서대로 정렬
 * @param images 이미지 배열
 * @returns image_order 순서대로 정렬된 이미지 배열
 */
export const sortImagesByOrder = <T extends { image_order?: number | null }>(images: T[]): T[] => {
    return [...images].sort((a, b) => {
        // 두 이미지 모두 image_order가 있는 경우
        if (a.image_order !== null && a.image_order !== undefined &&
            b.image_order !== null && b.image_order !== undefined) {
            return a.image_order - b.image_order;
        }

        // 한 이미지만 image_order가 있는 경우
        if (a.image_order !== null && a.image_order !== undefined) return -1;
        if (b.image_order !== null && b.image_order !== undefined) return 1;

        // 두 이미지 모두 image_order가 없는 경우 (원래 순서 유지)
        return 0;
    });
};