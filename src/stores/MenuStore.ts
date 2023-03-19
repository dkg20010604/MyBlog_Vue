import { defineStore } from 'pinia'
export const MenuIndex = defineStore("MenuIndex", {
  state: () => {
    return {
      index: '',
      menuOption:'' as any
    }
  },
  actions: {
    SetMenu(menu: string) {
      this.index = menu;
    }
  }
})
