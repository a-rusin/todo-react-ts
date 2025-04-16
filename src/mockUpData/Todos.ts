import { nanoid } from "nanoid";
import { Todo, TodoPriorety } from "./../models/Todo";

export const todoMockUp: Todo[] = [
  {
    id: nanoid(),
    userId: "101",
    createdDate: "2025-04-05",
    title: "Проверка email",
    description:
      "Необходимо просмотреть и ответить на важные электронные письма, прежде чем они станут неактуальными. Это поможет поддерживать эффективную коммуникацию с клиентами и коллегами.",
    dateDeadline: "2025-04-06",
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "102",
    createdDate: "2025-04-10",
    title: "Совещание с командой",
    description:
      "Еженедельное совещание с командой для обсуждения текущего статуса проектов, выявления проблем и определения планов на следующую неделю.",
    dateDeadline: "2025-04-12",
    priorety: { value: TodoPriorety.medium, label: "Средний" },
    favourite: true,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "103",
    createdDate: "2025-04-15",
    title: "Отчет о проекте",
    description:
      "Подготовить и отправить детализированный отчет по текущему проекту руководству, включающий достижения, препятствия и предложения по улучшениям.",
    dateDeadline: "2025-04-20",
    priorety: { value: TodoPriorety.dangerous, label: "Высокий" },
    favourite: false,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "104",
    createdDate: "2025-04-01",
    title: "Обновление сайта",
    description:
      "Обновить контент для корпоративного сайта, включая последние новости, изменения в продуктах и обновленные контактные данные.",
    dateDeadline: "2025-04-05",
    priorety: { value: TodoPriorety.medium, label: "Средний" },
    favourite: true,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "105",
    createdDate: "2025-04-15",
    title: "Просмотр аналитики",
    description:
      "Анализировать данные за прошлый месяц для выявления тенденций и подготовки к следующей стратегической сессии.",
    dateDeadline: "2025-04-18",
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "106",
    createdDate: "2025-04-01",
    title: "Подготовка к презентации",
    description:
      "Подготовить слайды и материалы для предстоящей презентации на конференции, уделив особое внимание последним достижениям и будущим планам.",
    dateDeadline: "2025-04-05",
    priorety: { value: TodoPriorety.dangerous, label: "Высокий" },
    favourite: true,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "107",
    createdDate: "2025-04-10",
    title: "Очистка рабочего стола",
    description:
      "Организовать файлы и папки на рабочем компьютере, удалив или архивировав старые данные для повышения общей эффективности работы.",
    dateDeadline: "2025-04-15",
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "108",
    createdDate: "2025-04-20",
    title: "Запуск рекламной кампании",
    description:
      "Настроить и запустить новую рекламную кампанию, тщательно проверив все настройки и согласовав ключевые сообщения.",
    dateDeadline: "2025-04-25",
    priorety: { value: TodoPriorety.medium, label: "Средний" },
    favourite: true,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "109",
    createdDate: "2025-04-01",
    title: "Социальные сети",
    description:
      "Подготовить и опубликовать контент для всех социальных сетей, уделив внимание актуальным трендам и высоким стандартам качества.",
    dateDeadline: "2025-04-03",
    priorety: { value: TodoPriorety.lite, label: "Низкий" },
    favourite: false,
    tags: null,
  },
  {
    id: nanoid(),
    userId: "110",
    createdDate: "2025-04-10",
    title: "Проверка безопасности",
    description:
      "Провести аудит безопасности системы, выявить и исправить уязвимости для обеспечения защиты данных.",
    dateDeadline: "2025-04-15",
    priorety: { value: TodoPriorety.dangerous, label: "Высокий" },
    favourite: false,
    tags: null,
  },
];
