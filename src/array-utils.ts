export function up<T>(array: T[], moveIndex: number): T[] {
  if (moveIndex > 0 && moveIndex < array.length) {
    const copy = [...array];
    let temp = copy[moveIndex - 1];
    copy[moveIndex - 1] = copy[moveIndex];
    copy[moveIndex] = temp;
    return copy;
  }
  return array;
}

export function down<T>(array: T[], moveIndex: number): T[] {
  if (moveIndex > -1 && moveIndex < array.length - 1) {
    const copy = [...array];
    let temp = copy[moveIndex + 1];
    copy[moveIndex + 1] = copy[moveIndex];
    copy[moveIndex] = temp;
    return copy;
  }
  return array;
}
