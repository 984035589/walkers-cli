export const templates = [
    { name: 'vue3', url: 'direct:https://github.com/984035589/vue3-seed#main' },
    { name: 'electron', url: 'direct:https://github.com/984035589/electron-vue3-seed.git#main' }
]

export function getTemplateByName(name: string) {
    return templates.find((e) => e.name === name)
}
