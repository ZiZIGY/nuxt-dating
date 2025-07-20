<script setup lang="ts">
  const { locale, setLocale, locales } = useI18n();

  const changeLanguage = (code: 'ru' | 'en') => setLocale(code);
</script>

<template>
  <UiSelect
    :model-value="locale"
    @update:model-value="(value) => changeLanguage(value as 'ru' | 'en')"
  >
    <UiSelectTrigger class="min-w-[100px]">
      <UiSelectValue>
        <div class="flex items-center gap-2">
          <span>{{ locales.find((l) => l.code === locale)?.flag }}</span>
          <span>{{ locales.find((l) => l.code === locale)?.name }}</span>
        </div>
      </UiSelectValue>
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectItem
        v-for="lang in locales"
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
