export function getWeekDates() {
  const today = new Date();

  // Ajustamos el día para que el lunes sea el inicio de la semana
  const dayOfWeek = today.getDay(); // 0 es domingo, 1 es lunes, etc.
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Calculamos el lunes (inicio de semana)

  const weekDates = [];

  // Iteramos desde el lunes hasta el domingo
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today.setDate(diff + i));
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0, por lo que sumamos 1
    const day = String(currentDate.getDate()).padStart(2, "0");

    weekDates.push(`${year}-${month}-${day}`);
  }
  console.log(weekDates);
  return weekDates;
}

export function createWeekDictionary() {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dates = getWeekDates();
  const weekDictionary = [];

  for (let i = 0; i < weekDays.length; i++) {
    weekDictionary[i] = [weekDays[i], dates[i]];
  }
  console.log(weekDictionary);
  return weekDictionary;
}
