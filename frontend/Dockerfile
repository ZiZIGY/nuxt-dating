FROM node:20-alpine

WORKDIR /app

# Копируем только package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем все остальные файлы
COPY . .

# Запуск в режиме разработки
EXPOSE 3000
CMD ["yarn", "dev", "--host", "0.0.0.0"]