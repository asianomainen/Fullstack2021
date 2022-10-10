interface ExreciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  args: Array<number>,
  target: number
): ExreciseValues => {
  const periodLength = args.length;
  const trainingDays = args.filter((e) => e > 0).length;
  const exerciseHours = args.reduce((a, b) => a + b);
  const average = exerciseHours / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = 'Something went wrong';

  if (average === 0) {
    ratingDescription = 'Try again next week!';
    rating = 0;
  } else if (average < target / 2) {
    ratingDescription = 'You can do better!';
    rating = 1;
  } else if (average >= target / 2 && average < target) {
    ratingDescription = 'Not too bad, but you can still do better!';
    rating = 2;
  } else if (average >= target) {
    ratingDescription = 'Great job!';
    rating = 3;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
