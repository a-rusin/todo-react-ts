import { nanoid } from "nanoid";
import { Todo, TodoPriorety } from "./../models/Todo";

export const todoMockUp: Todo[] = [
  {
    id: nanoid(),
    userId: "101",
    createdDate: Date.now().toString(),
    title: "Проверка email",
    description:
      "Необходимо просмотреть и ответить на важные электронные письма, прежде чем они станут неактуальными. Это поможет поддерживать эффективную коммуникацию с клиентами и коллегами.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "102",
    createdDate: Date.now().toString(),
    title: "Совещание с командой",
    description:
      "Еженедельное совещание с командой для обсуждения текущего статуса проектов, выявления проблем и определения планов на следующую неделю.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.medium, label: "Средний" },
    favourite: true,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "103",
    createdDate: Date.now().toString(),
    title: "Отчет о проекте",
    description:
      "Подготовить и отправить детализированный отчет по текущему проекту руководству, включающий достижения, препятствия и предложения по улучшениям.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.dangerous, label: "Высокий" },
    favourite: false,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "104",
    createdDate: Date.now().toString(),
    title: "Обновление сайта",
    description:
      "Обновить контент для корпоративного сайта, включая последние новости, изменения в продуктах и обновленные контактные данные.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.medium, label: "Средний" },
    favourite: true,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "105",
    createdDate: Date.now().toString(),
    title: "Просмотр аналитики",
    description:
      "Анализировать данные за прошлый месяц для выявления тенденций и подготовки к следующей стратегической сессии.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "106",
    createdDate: Date.now().toString(),
    title: "Подготовка к презентации",
    description:
      "Подготовить слайды и материалы для предстоящей презентации на конференции, уделив особое внимание последним достижениям и будущим планам.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.dangerous, label: "Высокий" },
    favourite: true,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "107",
    createdDate: Date.now().toString(),
    title: "Очистка рабочего стола",
    description:
      "Организовать файлы и папки на рабочем компьютере, удалив или архивировав старые данные для повышения общей эффективности работы.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "108",
    createdDate: Date.now().toString(),
    title: "Запуск рекламной кампании",
    description:
      "Настроить и запустить новую рекламную кампанию, тщательно проверив все настройки и согласовав ключевые сообщения.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.medium, label: "Средний" },
    favourite: true,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "109",
    createdDate: Date.now().toString(),
    title: "Социальные сети",
    description:
      "Подготовить и опубликовать контент для всех социальных сетей, уделив внимание актуальным трендам и высоким стандартам качества.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
    isDone: false,
  },
  {
    id: nanoid(),
    userId: "110",
    createdDate: Date.now().toString(),
    title: "Проверка безопасности",
    description:
      "Провести аудит безопасности системы, выявить и исправить уязвимости для обеспечения защиты данных.",
    dateDeadline: getRandomFutureDate(1, 7),
    priorety: { value: TodoPriorety.dangerous, label: "Высокий" },
    favourite: false,
    tags: null,
    isDone: false,
  },
];

function getRandomFutureDate(
  minDaysAhead: number,
  maxDaysAhead: number
): string {
  const currentDate = new Date();
  const currentMilliseconds = currentDate.getTime();

  const millisecondsInDay = 24 * 60 * 60 * 1000;

  const randomDaysAhead =
    Math.floor(Math.random() * (maxDaysAhead - minDaysAhead + 1)) +
    minDaysAhead;

  const randomMilliseconds =
    currentMilliseconds + randomDaysAhead * millisecondsInDay;

  return randomMilliseconds.toFixed();
}
