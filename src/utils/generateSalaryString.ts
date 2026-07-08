export function generateSalaryString(salaryType: string, salaryAmount: number) {
  const salaryInThousands = salaryAmount / 1000;
  const monthsInYear = 12;

  const roundToOneDecimal = (num: number) => Math.round(num * 10) / 10;

  const truncateIfDecimalIsZero = (num: number) => {
    const rounded = roundToOneDecimal(num);
    return rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
  };

  const needsShortening = (num: number) => num > 1;

  const monthlySalary =
    salaryType === 'Monthly' ? salaryInThousands : salaryInThousands / monthsInYear;
  const annualSalary =
    salaryType === 'Annual' ? salaryInThousands : salaryInThousands * monthsInYear;

  const monthlySalaryFormatted = needsShortening(monthlySalary)
    ? `${truncateIfDecimalIsZero(monthlySalary)}k`
    : roundToOneDecimal(monthlySalary) * 1000;
  const annualSalaryFormatted = needsShortening(annualSalary)
    ? `${truncateIfDecimalIsZero(annualSalary)}k`
    : roundToOneDecimal(monthlySalary) * 1000;

  return `$${annualSalaryFormatted} ($${monthlySalaryFormatted} / month)`;
}
