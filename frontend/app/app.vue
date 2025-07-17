<template>
  <div class="container">
    <h1>Регистрация в приложении знакомств</h1>

    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <div
      v-if="success"
      class="success"
    >
      Пользователь успешно зарегистрирован!
    </div>

    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          required
        />
      </div>

      <div class="form-group">
        <label for="nickname">Никнейм:</label>
        <input
          type="text"
          id="nickname"
          v-model="user.nickname"
          required
        />
      </div>

      <div class="form-group">
        <label for="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          v-model="user.firstName"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          v-model="user.lastName"
        />
      </div>

      <div class="form-group">
        <label for="dateOfBirth">Дата рождения:</label>
        <input
          type="date"
          id="dateOfBirth"
          v-model="user.dateOfBirth"
          required
        />
      </div>

      <div class="form-group">
        <label for="gender">Пол:</label>
        <select
          id="gender"
          v-model="user.gender"
          required
        >
          <option value="MALE">Мужской</option>
          <option value="FEMALE">Женский</option>
        </select>
      </div>

      <div class="form-group">
        <label for="bio">О себе:</label>
        <textarea
          id="bio"
          v-model="user.bio"
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="location">Местоположение:</label>
        <input
          type="text"
          id="location"
          v-model="user.location"
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Отправка...' : 'Зарегистрироваться' }}
      </button>
    </form>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';

  const user = reactive({
    nickname: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'MALE',
    bio: '',
    location: '',
  });

  const isLoading = ref(false);
  const error = ref(null);
  const success = ref(false);

  async function registerUser() {
    try {
      isLoading.value = true;
      error.value = null;

      // Форматирование даты в формат ISO для бэкенда
      const formattedUser = {
        ...user,
        dateOfBirth: new Date(user.dateOfBirth).toISOString(),
      };

      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedUser),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Ошибка при регистрации');
      }

      success.value = true;

      // Очищаем форму после успешной отправки
      Object.keys(user).forEach((key) => {
        if (key === 'gender') {
          user[key] = 'MALE';
        } else {
          user[key] = '';
        }
      });
    } catch (err) {
      console.error('Ошибка:', err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .error {
    color: #f44336;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #f44336;
    border-radius: 4px;
    background-color: #ffebee;
  }

  .success {
    color: #4caf50;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #4caf50;
    border-radius: 4px;
    background-color: #e8f5e9;
  }
</style>
