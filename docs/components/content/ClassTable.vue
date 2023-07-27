<script lang="ts" setup>
import type { Rule } from 'unocss'
import * as ruleGroups from '~/rules'

const props = defineProps<{
  name: string
}>()

const columns = ['Class', 'Properties']

const classNames = computed(() => {
  const rules = (ruleGroups as any)[props.name] as Rule[]

  return rules.map(rule => generateRuleClassNames(rule)).flat(1)
})
</script>

<template>
  <ProseTable class="class-table">
    <ProseThead>
      <ProseTr>
        <ProseTh v-for="(item, i) in columns" :key="i">
          {{ item }}
        </ProseTh>
      </ProseTr>
    </ProseThead>
    <ProseTbody>
      <ProseTr v-for="(item, i) in classNames" :key="i">
        <ProseTd>{{ item.name }}</ProseTd>
        <ProseTd>
          <div v-for="(prop, j) in item.properties" :key="j">
            {{ prop }}
          </div>
        </ProseTd>
      </ProseTr>
    </ProseTbody>
  </ProseTable>
</template>

<style lang="scss" scoped>
.class-table {
  max-height: 50dvh;
}
</style>
