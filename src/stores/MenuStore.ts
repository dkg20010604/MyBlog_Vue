import type { PageDataOfString, UserDTO } from '@/controller';
import { defineStore } from 'pinia'
export const MenuIndex = defineStore("MenuIndex", {
  state: () => {
    return {
      index: '',
      menuOption: '' as any,
      userinfo: '' as unknown as UserDTO,
      queryArticleString: reactive<PageDataOfString>({
        pageindex: 1,
        pageSize: 2,
        data: ['']
      }),
      queryUserString: reactive<PageDataOfString>({
        pageindex: 1,
        pageSize: 2,
        data: ['']
      })
    }
  },
  actions: {
    SetMenu(menu: string) {
      this.index = menu;
    }
  },
  getters: {

  }
})
