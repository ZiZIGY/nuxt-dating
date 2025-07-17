<script setup lang="ts">
  const { locale, setLocale } = useI18n();

  // Доступные языки
  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  // Смена языка
  const changeLanguage = (code: 'ru' | 'en') => {
    setLocale(code);
  };
</script>

<template>
  <UiSelect
    :model-value="locale"
    @update:model-value="changeLanguage($event as 'ru' | 'en')"
  >
    <UiSelectTrigger class="min-w-[100px]">
      <UiSelectValue>
        <div class="flex items-center gap-2">
          <span>{{ languages.find((l) => l.code === locale)?.flag }}</span>
          <span>{{ languages.find((l) => l.code === locale)?.name }}</span>
        </div>
      </UiSelectValue>
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectItem
        v-for="lang in languages"
        :key="lang.code"
        :value="lang.code"
      >
        <div class="flex items-center gap-2">
          <span>{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
        </div>
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
