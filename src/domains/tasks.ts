export type TaskDTO = {
  id: string;
  title: string;
  description: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const taskBuilder = (dto: TaskDTO): Task => {
  const { id, description, title } = dto;

  return {
    id,
    title,
    description,
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
